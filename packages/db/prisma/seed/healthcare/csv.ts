export type CsvRow = Record<string, string>;

export function parseCsv(content: string): CsvRow[] {
  const rows: string[][] = [];
  const currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let index = 0; index < content.length; index += 1) {
    const char = content[index];
    const nextChar = content[index + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      currentRow.push(currentField);
      currentField = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        index += 1;
      }

      currentRow.push(currentField);
      currentField = '';

      if (currentRow.some((field) => field.length > 0)) {
        rows.push([...currentRow]);
      }

      currentRow.length = 0;
      continue;
    }

    currentField += char;
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField);
    if (currentRow.some((field) => field.length > 0)) {
      rows.push([...currentRow]);
    }
  }

  if (rows.length === 0) {
    return [];
  }

  const [headerRow, ...dataRows] = rows;
  const headers = headerRow.map((header) => header.trim());

  return dataRows.map((row) =>
    headers.reduce<CsvRow>((record, header, index) => {
      record[header] = (row[index] ?? '').trim();
      return record;
    }, {}),
  );
}

export function splitRelationValues(value: string): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean);
}
