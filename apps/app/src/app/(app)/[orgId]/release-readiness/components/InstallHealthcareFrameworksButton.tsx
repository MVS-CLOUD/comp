'use client';

import { apiClient } from '@/lib/api-client';
import { Button } from '@trycompai/design-system';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function InstallHealthcareFrameworksButton({
  organizationId,
}: {
  organizationId: string;
}) {
  const router = useRouter();
  const [isInstalling, setIsInstalling] = useState(false);

  const handleInstall = async () => {
    setIsInstalling(true);

    try {
      const response = await apiClient.post<{ frameworksAdded: number }>(
        '/v1/frameworks/healthcare/install',
        undefined,
        organizationId,
      );

      if (response.error) {
        toast.error(response.error);
        return;
      }

      toast.success(
        `Installed ${response.data?.frameworksAdded ?? 0} healthcare frameworks.`,
      );
      router.refresh();
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <Button onClick={handleInstall} loading={isInstalling}>
      Install healthcare frameworks
    </Button>
  );
}
