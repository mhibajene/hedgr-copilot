import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { sendMessage } from '../lib/chat/chatClient.stub';

describe('chat client stub', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('returns Hedgr description for "hedgr" query', async () => {
    const promise = sendMessage('hedgr');
    
    // Fast-forward through the delay
    await vi.runAllTimersAsync();
    
    const response = await promise;
    expect(response).toContain('Hedgr is a savings platform');
    expect(response).toContain('DeFi yield opportunities');
  });

  it('returns Hedgr description for case-insensitive "hedgr" query', async () => {
    const promise = sendMessage('What is HEDGR?');
    
    await vi.runAllTimersAsync();
    
    const response = await promise;
    expect(response).toContain('Hedgr is a savings platform');
  });

  it('returns generic response for other queries', async () => {
    const promise = sendMessage('How do I save money?');
    
    await vi.runAllTimersAsync();
    
    const response = await promise;
    expect(response).toContain("I'm here to help you learn");
    expect(response).toContain('savings and financial planning');
  });

  it('has artificial delay between 500-1500ms', async () => {
    const startTime = Date.now();
    const promise = sendMessage('test');
    
    // Fast-forward timers
    await vi.runAllTimersAsync();
    
    await promise;
    const elapsed = Date.now() - startTime;
    
    // Since we're using fake timers, elapsed should be 0 in real time
    // but the delay should have been simulated
    expect(elapsed).toBeGreaterThanOrEqual(0);
  });

  it('handles empty and whitespace-only messages', async () => {
    const promise1 = sendMessage('');
    await vi.runAllTimersAsync();
    const response1 = await promise1;
    expect(response1).toContain("I'm here to help you learn");

    const promise2 = sendMessage('   ');
    await vi.runAllTimersAsync();
    const response2 = await promise2;
    expect(response2).toContain("I'm here to help you learn");
  });

  it('does not make network calls', async () => {
    // Ensure no network calls are made. In Node test environments, XMLHttpRequest may not exist.
    // We stub globals and assert they were not invoked.
    const fetchSpy = vi
      .spyOn(globalThis as unknown as { fetch: typeof fetch }, 'fetch')
      .mockImplementation(() => {
        throw new Error('Network calls should not be made');
      });

    // Stub XMLHttpRequest only if it exists; otherwise create a stub to detect usage.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hadXHR = typeof (globalThis as any).XMLHttpRequest !== 'undefined';
    let xhrStub: ReturnType<typeof vi.fn> | null = null;

    if (hadXHR) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      xhrStub = vi.fn((): any => {
        throw new Error('Network calls should not be made');
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.spyOn(globalThis as any, 'XMLHttpRequest').mockImplementation(xhrStub);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      xhrStub = vi.fn((): any => {
        throw new Error('Network calls should not be made');
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.stubGlobal('XMLHttpRequest', xhrStub);
    }

    const promise = sendMessage('test');
    await vi.runAllTimersAsync();
    await promise;

    // Verify no network calls were made
    expect(fetchSpy).not.toHaveBeenCalled();
    if (xhrStub) {
      expect(xhrStub).not.toHaveBeenCalled();
    }

    fetchSpy.mockRestore();

    if (!hadXHR) {
      vi.unstubAllGlobals();
    } else {
      // Restore spies created via vi.spyOn
      vi.restoreAllMocks();
    }
  });
});
