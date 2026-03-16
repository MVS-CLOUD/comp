import { UnauthorizedException } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { db } from '@trycompai/db';
import { auth } from './auth.server';
import { HybridAuthGuard } from './hybrid-auth.guard';

jest.mock('./auth.server', () => ({
  auth: { api: { getSession: jest.fn() } },
}));

jest.mock('./api-key.service', () => ({
  ApiKeyService: class ApiKeyService {},
}));

jest.mock('@trycompai/db', () => ({
  db: {
    member: {
      findFirst: jest.fn(),
    },
  },
}));

describe('HybridAuthGuard', () => {
  const mockApiKeyService = {
    extractApiKey: jest.fn(),
    validateApiKey: jest.fn(),
  };
  const mockReflector = {
    getAllAndOverride: jest.fn(),
  } as unknown as Reflector;

  const getSessionMock = jest.mocked(auth.api.getSession);
  const findMemberMock = jest.mocked(db.member.findFirst);

  const createRequest = (headers: Record<string, string> = {}) =>
    ({
      headers,
      organizationId: '',
    }) as Record<string, unknown>;

  const createContext = (request: Record<string, unknown>) =>
    ({
      getHandler: () => undefined,
      getClass: () => undefined,
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    }) as never;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(mockReflector.getAllAndOverride).mockReturnValue(false);
  });

  it('uses the x-organization-id header when the session has no active organization', async () => {
    const guard = new HybridAuthGuard(
      mockApiKeyService as never,
      mockReflector,
    );
    const request = createRequest({
      cookie: 'session=abc',
      'x-organization-id': 'org_route',
    });

    getSessionMock.mockResolvedValue({
      user: { id: 'user_1', email: 'user@example.com' },
      session: { activeOrganizationId: null },
    } as never);
    findMemberMock.mockResolvedValue({
      id: 'member_1',
      role: 'owner',
      department: 'none',
      user: { isPlatformAdmin: false },
    } as never);

    await expect(guard.canActivate(createContext(request))).resolves.toBe(true);

    expect(findMemberMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          userId: 'user_1',
          organizationId: 'org_route',
          deactivated: false,
        }),
      }),
    );
    expect(request.organizationId).toBe('org_route');
    expect(request.userRoles).toEqual(['owner']);
  });

  it('prefers the x-organization-id header over a stale active organization in the session', async () => {
    const guard = new HybridAuthGuard(
      mockApiKeyService as never,
      mockReflector,
    );
    const request = createRequest({
      cookie: 'session=abc',
      'x-organization-id': 'org_requested',
    });

    getSessionMock.mockResolvedValue({
      user: { id: 'user_1', email: 'user@example.com' },
      session: { activeOrganizationId: 'org_previous' },
    } as never);
    findMemberMock.mockResolvedValue({
      id: 'member_1',
      role: 'admin,auditor',
      department: 'none',
      user: { isPlatformAdmin: true },
    } as never);

    await expect(guard.canActivate(createContext(request))).resolves.toBe(true);

    expect(findMemberMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          userId: 'user_1',
          organizationId: 'org_requested',
        }),
      }),
    );
    expect(request.organizationId).toBe('org_requested');
    expect(request.userRoles).toEqual(['admin', 'auditor']);
    expect(request.isPlatformAdmin).toBe(true);
  });

  it('throws when neither the session nor the request header provides an active organization', async () => {
    const guard = new HybridAuthGuard(
      mockApiKeyService as never,
      mockReflector,
    );

    getSessionMock.mockResolvedValue({
      user: { id: 'user_1', email: 'user@example.com' },
      session: { activeOrganizationId: null },
    } as never);

    await expect(
      guard.canActivate(
        createContext(createRequest({ cookie: 'session=abc' })),
      ),
    ).rejects.toThrow(
      new UnauthorizedException(
        'No active organization. Please select an organization.',
      ),
    );
  });
});
