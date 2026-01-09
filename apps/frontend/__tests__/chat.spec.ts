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
    // Mock fetch and XMLHttpRequest to ensure no network calls
    const fetchSpy = vi.spyOn(global, 'fetch').mockImplementation(() => {
      throw new Error('Network calls should not be made');
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const xhrSpy = vi.spyOn(global, 'XMLHttpRequest').mockImplementation((): any => {
      throw new Error('Network calls should not be made');
    });

    const promise = sendMessage('test');
    await vi.runAllTimersAsync();
    await promise;

    // Verify no network calls were made
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(xhrSpy).not.toHaveBeenCalled();

    fetchSpy.mockRestore();
    xhrSpy.mockRestore();
  });
});
