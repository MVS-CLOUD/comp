import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { HybridAuthGuard } from '../auth/hybrid-auth.guard';
import { PermissionGuard } from '../auth/permission.guard';

jest.mock('../auth/auth.server', () => ({
  auth: { api: { getSession: jest.fn() } },
}));

jest.mock('../auth/hybrid-auth.guard', () => ({
  HybridAuthGuard: class HybridAuthGuard {},
}));

jest.mock('../auth/permission.guard', () => ({
  PermissionGuard: class PermissionGuard {},
}));

jest.mock('./frameworks.service', () => ({
  FrameworksService: class FrameworksService {},
}));

describe('FrameworksController', () => {
  let FrameworksControllerClass: typeof import('./frameworks.controller').FrameworksController;
  let FrameworksServiceClass: typeof import('./frameworks.service').FrameworksService;
  let controller: import('./frameworks.controller').FrameworksController;
  let service: jest.Mocked<import('./frameworks.service').FrameworksService>;

  const mockService = {
    findAll: jest.fn(),
    delete: jest.fn(),
    findHealthcareLibrary: jest.fn(),
    installHealthcareFrameworks: jest.fn(),
  };

  const mockGuard = { canActivate: jest.fn().mockReturnValue(true) };

  beforeEach(async () => {
    ({ FrameworksController: FrameworksControllerClass } = require('./frameworks.controller'));
    ({ FrameworksService: FrameworksServiceClass } = require('./frameworks.service'));

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrameworksControllerClass],
      providers: [{ provide: FrameworksServiceClass, useValue: mockService }],
    })
      .overrideGuard(HybridAuthGuard)
      .useValue(mockGuard)
      .overrideGuard(PermissionGuard)
      .useValue(mockGuard)
      .compile();

    controller = module.get(FrameworksControllerClass);
    service = module.get(FrameworksServiceClass);

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return framework instances with count', async () => {
      const mockData = [
        { id: 'fi1', frameworkId: 'f1', framework: { id: 'f1', name: 'ISO 27001' } },
        { id: 'fi2', frameworkId: 'f2', framework: { id: 'f2', name: 'SOC 2' } },
      ];
      mockService.findAll.mockResolvedValue(mockData);

      const result = await controller.findAll('org_1');

      expect(result).toEqual({ data: mockData, count: 2 });
      expect(service.findAll).toHaveBeenCalledWith('org_1', {
        includeControls: false,
        includeScores: false,
      });
    });

    it('should return empty list when no frameworks', async () => {
      mockService.findAll.mockResolvedValue([]);

      const result = await controller.findAll('org_1');

      expect(result).toEqual({ data: [], count: 0 });
    });
  });

  describe('delete', () => {
    it('should delegate to service and return result', async () => {
      mockService.delete.mockResolvedValue({ success: true });

      const result = await controller.delete('org_1', 'fi1');

      expect(result).toEqual({ success: true });
      expect(service.delete).toHaveBeenCalledWith('fi1', 'org_1');
    });

    it('should propagate NotFoundException from service', async () => {
      mockService.delete.mockRejectedValue(
        new NotFoundException('Framework instance not found'),
      );

      await expect(controller.delete('org_1', 'missing')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findHealthcareLibrary', () => {
    it('returns the healthcare framework library with count', async () => {
      const mockFrameworks = [
        { id: 'frk_hc_onc_2026_core', name: 'ONC 2026 Core' },
        { id: 'frk_hc_hipaa_security', name: 'HIPAA Security Rule' },
      ];
      mockService.findHealthcareLibrary.mockResolvedValue(mockFrameworks);

      const result = await controller.findHealthcareLibrary();

      expect(result).toEqual({ data: mockFrameworks, count: 2 });
    });
  });

  describe('installHealthcareFrameworks', () => {
    it('delegates healthcare framework installation to the service', async () => {
      mockService.installHealthcareFrameworks.mockResolvedValue({
        success: true,
        frameworksAdded: 6,
      });

      const result = await controller.installHealthcareFrameworks('org_1');

      expect(result).toEqual({
        success: true,
        frameworksAdded: 6,
      });
      expect(mockService.installHealthcareFrameworks).toHaveBeenCalledWith(
        'org_1',
      );
    });
  });
});
