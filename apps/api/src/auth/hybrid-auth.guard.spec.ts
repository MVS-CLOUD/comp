import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { db } from '@trycompai/db';
import { auth } from './auth.server';
import { HybridAuthGuard } from './hybrid-auth.guard';

jest.mock(
  '@trycompai/db',
  () => ({
    db: {
      member: {
        findFirst: jest.fn(),
      },
    },
  }),
  { virtual: true },
);

jest.mock(
  '@comp/auth',
  () => ({
    statement: {},
  }),
  { virtual: true },
);

jest.mock('./auth.server', () => ({
  auth: {
    api: {
      getSession: jest.fn(),
    },
  },
}));

describe('HybridAuthGuard', () => {
  const mockApiKeyService = {
    extractApiKey: jest.fn(),
    validateApiKey: jest.fn(),
  };

  const mockReflector = {
    getAllAndOverride: jest.fn().mockReturnValue(false),
  } as unknown as Reflector;

  const mockedGetSession = jest.mocked(auth.api.getSession);
  const mockedFindMember = jest.mocked(db.member.findFirst);

  function createContext(request: Record<string, unknown>): ExecutionContext {
    return {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as unknown as ExecutionContext;
  }

  beforeEach(() => {
    jest.clearAllMocks();
    mockReflector.getAllAndOverride = jest.fn().mockReturnValue(false);
  });

  it('uses x-organization-id for session auth when provided', async () => {
    mockedGetSession.mockResolvedValue({
      user: {
        id: 'usr_1',
        email: 'ryan@mvscloud.com',
      },
      session: {
        id: 'sess_1',
        activeOrganizationId: null,
      },
    } as never);

    mockedFindMember.mockResolvedValue({
      id: 'mem_1',
      role: 'owner',
      department: null,
      user: {
        isPlatformAdmin: true,
      },
    } as never);

    const request = {
      headers: {
        cookie: 'better-auth.session_token=test',
        'x-organization-id': 'org_from_header',
      },
    } as Record<string, unknown>;

    const guard = new HybridAuthGuard(
      mockApiKeyService as never,
      mockReflector,
    );

    const result = await guard.canActivate(createContext(request));

    expect(result).toBe(true);
    expect(mockedFindMember).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          organizationId: 'org_from_header',
          userId: 'usr_1',
        }),
      }),
    );
    expect(request.organizationId).toBe('org_from_header');
  });
});
