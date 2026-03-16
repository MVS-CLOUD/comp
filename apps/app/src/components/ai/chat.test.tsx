import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
  mockApiClient,
  mockDefaultChatTransport,
  mockUseActiveOrganization,
  mockUseChat,
  mockUseParams,
  mockUseSession,
} = vi.hoisted(() => ({
  mockApiClient: {
    get: vi.fn(),
    call: vi.fn(),
    delete: vi.fn(),
  },
  mockDefaultChatTransport: vi.fn((config) => config),
  mockUseActiveOrganization: vi.fn(),
  mockUseChat: vi.fn(),
  mockUseParams: vi.fn(),
  mockUseSession: vi.fn(),
}));

vi.mock('@/env.mjs', () => ({
  env: {
    NEXT_PUBLIC_API_URL: 'https://api.example.com',
  },
}));

vi.mock('@/utils/auth-client', () => ({
  useSession: mockUseSession,
  useActiveOrganization: mockUseActiveOrganization,
}));

vi.mock('@/lib/api-client', () => ({
  apiClient: mockApiClient,
}));

vi.mock('next/navigation', () => ({
  useParams: mockUseParams,
}));

vi.mock('@ai-sdk/react', () => ({
  useChat: mockUseChat,
}));

vi.mock('ai', () => ({
  DefaultChatTransport: mockDefaultChatTransport,
  isToolUIPart: () => false,
  lastAssistantMessageIsCompleteWithToolCalls: () => false,
}));

vi.mock('@trycompai/design-system', () => ({
  Button: ({
    children,
    onClick,
    disabled,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  }) => (
    <button disabled={disabled} onClick={onClick} type="button">
      {children}
    </button>
  ),
}));

vi.mock('@comp/ui/button', () => ({
  Button: ({
    children,
    onClick,
    disabled,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  }) => (
    <button disabled={disabled} onClick={onClick} type="button">
      {children}
    </button>
  ),
}));

vi.mock('@comp/ui/avatar', () => ({
  Avatar: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  AvatarFallback: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  AvatarImage: () => null,
}));

vi.mock('@/components/ai-elements/conversation', () => ({
  Conversation: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ConversationContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ConversationEmptyState: ({ title }: { title: string }) => <div>{title}</div>,
  ConversationScrollButton: () => null,
}));

vi.mock('@/components/ai-elements/message', () => ({
  Message: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  MessageContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  MessageResponse: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('@/components/ai-elements/reasoning', () => ({
  Reasoning: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ReasoningContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ReasoningTrigger: () => null,
}));

vi.mock('@/components/ai-elements/tool', () => ({
  Tool: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ToolHeader: () => null,
  ToolContent: () => null,
}));

vi.mock('../logo-spinner', () => ({
  LogoSpinner: () => <div>spinner</div>,
}));

import Chat from './chat';

describe('Chat', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseSession.mockReturnValue({
      data: {
        user: {
          id: 'user_1',
          name: 'Ryan Tester',
        },
      },
    });
    mockUseActiveOrganization.mockReturnValue({
      data: { id: 'org_active' },
    });
    mockUseParams.mockReturnValue({ orgId: 'org_route' });
    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: vi.fn(),
      error: null,
      status: 'idle',
      stop: vi.fn(),
      setMessages: vi.fn(),
    });
    mockApiClient.get.mockResolvedValue({
      data: { messages: [] },
      status: 200,
    });
    mockApiClient.call.mockResolvedValue({ status: 200 });
    mockApiClient.delete.mockResolvedValue({ status: 200 });
  });

  it('loads assistant history using the route organization id', async () => {
    render(<Chat />);

    await waitFor(() => {
      expect(mockApiClient.get).toHaveBeenCalledWith('/v1/assistant-chat/history', 'org_route');
    });
  });

  it('configures the chat transport with the organization header', () => {
    render(<Chat />);

    expect(mockDefaultChatTransport).toHaveBeenCalledTimes(1);
    const transportConfig = mockDefaultChatTransport.mock.calls[0][0] as {
      api: string;
      credentials: string;
      headers: () => Record<string, string>;
    };

    expect(transportConfig.api).toBe('https://api.example.com/v1/assistant-chat/completions');
    expect(transportConfig.credentials).toBe('include');
    expect(transportConfig.headers()).toEqual({
      'X-Organization-Id': 'org_route',
    });
  });

  it('renders a hydration-safe empty-state greeting', () => {
    render(<Chat />);

    expect(screen.getByText('Hi there, how can I help you today?')).toBeInTheDocument();
  });
});
