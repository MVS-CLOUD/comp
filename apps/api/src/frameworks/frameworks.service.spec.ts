import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { FrameworksService } from './frameworks.service';

jest.mock('@trycompai/db', () => ({
  db: {
    frameworkInstance: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
    frameworkEditorFramework: {
      findMany: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));

jest.mock('./frameworks-scores.helper', () => ({
  getOverviewScores: jest.fn(),
  getCurrentMember: jest.fn(),
  computeFrameworkComplianceScore: jest.fn(),
}));

jest.mock('./frameworks-upsert.helper', () => ({
  upsertOrgFrameworkStructure: jest.fn(),
}));

import { db } from '@trycompai/db';
import {
  getOverviewScores,
  getCurrentMember,
} from './frameworks-scores.helper';
import { upsertOrgFrameworkStructure } from './frameworks-upsert.helper';

const mockDb = db as jest.Mocked<typeof db>;

describe('FrameworksService', () => {
  let service: FrameworksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FrameworksService],
    }).compile();

    service = module.get<FrameworksService>(FrameworksService);

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return framework instances with framework relation', async () => {
      const mockInstances = [
        {
          id: 'fi1',
          organizationId: 'org_1',
          frameworkId: 'f1',
          framework: { id: 'f1', name: 'ISO 27001' },
        },
      ];
      (mockDb.frameworkInstance.findMany as jest.Mock).mockResolvedValue(
        mockInstances,
      );

      const result = await service.findAll('org_1');

      expect(result).toEqual(mockInstances);
      expect(mockDb.frameworkInstance.findMany).toHaveBeenCalledWith({
        where: { organizationId: 'org_1' },
        include: { framework: true },
      });
    });

    it('should return empty array when no instances exist', async () => {
      (mockDb.frameworkInstance.findMany as jest.Mock).mockResolvedValue([]);

      const result = await service.findAll('org_1');

      expect(result).toEqual([]);
    });
  });

  describe('delete', () => {
    it('should delete framework instance and return success', async () => {
      (mockDb.frameworkInstance.findUnique as jest.Mock).mockResolvedValue({
        id: 'fi1',
        organizationId: 'org_1',
      });
      (mockDb.frameworkInstance.delete as jest.Mock).mockResolvedValue({});

      const result = await service.delete('fi1', 'org_1');

      expect(result).toEqual({ success: true });
      expect(mockDb.frameworkInstance.findUnique).toHaveBeenCalledWith({
        where: { id: 'fi1', organizationId: 'org_1' },
      });
      expect(mockDb.frameworkInstance.delete).toHaveBeenCalledWith({
        where: { id: 'fi1' },
      });
    });

    it('should throw NotFoundException when instance not found', async () => {
      (mockDb.frameworkInstance.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.delete('missing', 'org_1')).rejects.toThrow(
        NotFoundException,
      );
      expect(mockDb.frameworkInstance.delete).not.toHaveBeenCalled();
    });
  });

  describe('getScores', () => {
    it('should call getOverviewScores and getCurrentMember when userId is provided', async () => {
      const mockScores = { policies: 10, tasks: 5 };
      const mockMember = { id: 'mem_1', userId: 'user_1' };

      (getOverviewScores as jest.Mock).mockResolvedValue(mockScores);
      (getCurrentMember as jest.Mock).mockResolvedValue(mockMember);

      const result = await service.getScores('org_1', 'user_1');

      expect(getOverviewScores).toHaveBeenCalledWith('org_1');
      expect(getCurrentMember).toHaveBeenCalledWith('org_1', 'user_1');
      expect(result).toEqual({
        ...mockScores,
        currentMember: mockMember,
      });
    });

    it('should call getOverviewScores but NOT getCurrentMember when userId is undefined', async () => {
      const mockScores = { policies: 10, tasks: 5 };

      (getOverviewScores as jest.Mock).mockResolvedValue(mockScores);

      const result = await service.getScores('org_1');

      expect(getOverviewScores).toHaveBeenCalledWith('org_1');
      expect(getCurrentMember).not.toHaveBeenCalled();
      expect(result).toEqual({
        ...mockScores,
        currentMember: null,
      });
    });
  });

  describe('findHealthcareLibrary', () => {
    it('returns the visible healthcare frameworks ordered by name', async () => {
      const mockFrameworks = [
        { id: 'frk_hc_hipaa_security', name: 'HIPAA Security Rule' },
        { id: 'frk_hc_onc_2026_core', name: 'ONC 2026 Core' },
      ];

      (mockDb.frameworkEditorFramework.findMany as jest.Mock).mockResolvedValue(
        mockFrameworks,
      );

      const result = await service.findHealthcareLibrary();

      expect(result).toEqual(mockFrameworks);
      expect(mockDb.frameworkEditorFramework.findMany).toHaveBeenCalledWith({
        where: {
          id: {
            in: expect.arrayContaining([
              'frk_hc_onc_2026_core',
              'frk_hc_onc_conditions',
              'frk_hc_hipaa_security',
              'frk_hc_smart_runtime',
              'frk_hc_dosespot',
              'frk_hc_internal_release',
            ]),
          },
          visible: true,
        },
        orderBy: { name: 'asc' },
        include: { requirements: true },
      });
    });
  });

  describe('installHealthcareFrameworks', () => {
    it('adds all healthcare frameworks to the organization', async () => {
      const mockFrameworks = [
        { id: 'frk_hc_onc_2026_core', requirements: [{ id: 'req-1' }] },
        { id: 'frk_hc_onc_conditions', requirements: [{ id: 'req-2' }] },
        { id: 'frk_hc_hipaa_security', requirements: [{ id: 'req-2' }] },
        { id: 'frk_hc_smart_runtime', requirements: [{ id: 'req-3' }] },
        { id: 'frk_hc_dosespot', requirements: [{ id: 'req-4' }] },
        { id: 'frk_hc_internal_release', requirements: [{ id: 'req-5' }] },
      ];
      const mockTx = {
        frameworkEditorFramework: {
          findMany: jest.fn().mockResolvedValue(mockFrameworks),
        },
      };

      const mockTransaction = jest
        .fn()
        .mockImplementation(
          async (callback: (tx: typeof mockTx) => Promise<unknown>) =>
            callback(mockTx),
        );

      (mockDb.$transaction as unknown as jest.Mock).mockImplementation(
        mockTransaction,
      );

      const result = await service.installHealthcareFrameworks('org_1');

      expect(result).toEqual({ success: true, frameworksAdded: 6 });
      expect(upsertOrgFrameworkStructure).toHaveBeenCalledWith({
        organizationId: 'org_1',
        targetFrameworkEditorIds: [
          'frk_hc_onc_2026_core',
          'frk_hc_onc_conditions',
          'frk_hc_hipaa_security',
          'frk_hc_smart_runtime',
          'frk_hc_dosespot',
          'frk_hc_internal_release',
        ],
        frameworkEditorFrameworks: mockFrameworks,
        tx: mockTx,
      });
    });
  });
});
