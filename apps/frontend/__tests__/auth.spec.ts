import { describe, it, expect } from 'vitest';
import { useUserStore } from '../lib/state/user';

describe('auth (mock)', () => {
  it('login sets session', () => {
    const st = useUserStore.getState();
    expect(st.isAuthed).toBe(false);
    st.login('test@hedgr.app');
    expect(useUserStore.getState().isAuthed).toBe(true);
  });
});
