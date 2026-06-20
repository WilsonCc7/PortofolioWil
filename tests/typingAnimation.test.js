const {
  createTypingState,
  getDisplayText,
  advanceTypingState,
  getTypingSpeed,
  shouldPauseBeforeDelete,
} = require('../src/typingAnimation');

describe('typingAnimation', () => {
  const texts = ['Hello', 'World'];

  describe('createTypingState', () => {
    it('initializes state with correct defaults', () => {
      const state = createTypingState(texts);
      expect(state.texts).toEqual(texts);
      expect(state.textIndex).toBe(0);
      expect(state.charIndex).toBe(0);
      expect(state.isDeleting).toBe(false);
    });

    it('stores the provided texts array', () => {
      const customTexts = ['A', 'B', 'C'];
      const state = createTypingState(customTexts);
      expect(state.texts).toEqual(customTexts);
    });
  });

  describe('getDisplayText', () => {
    it('returns empty string when charIndex is 0', () => {
      const state = createTypingState(texts);
      expect(getDisplayText(state)).toBe('');
    });

    it('returns partial text based on charIndex', () => {
      const state = { ...createTypingState(texts), charIndex: 3 };
      expect(getDisplayText(state)).toBe('Hel');
    });

    it('returns full text when charIndex equals text length', () => {
      const state = { ...createTypingState(texts), charIndex: 5 };
      expect(getDisplayText(state)).toBe('Hello');
    });

    it('returns text from correct textIndex', () => {
      const state = { ...createTypingState(texts), textIndex: 1, charIndex: 3 };
      expect(getDisplayText(state)).toBe('Wor');
    });
  });

  describe('advanceTypingState', () => {
    it('increments charIndex when typing forward', () => {
      const state = createTypingState(texts);
      const next = advanceTypingState(state);
      expect(next.charIndex).toBe(1);
      expect(next.isDeleting).toBe(false);
    });

    it('sets isDeleting to true when reaching end of text', () => {
      const state = { ...createTypingState(texts), charIndex: 4 };
      const next = advanceTypingState(state);
      expect(next.charIndex).toBe(5);
      expect(next.isDeleting).toBe(true);
    });

    it('decrements charIndex when deleting', () => {
      const state = { ...createTypingState(texts), charIndex: 3, isDeleting: true };
      const next = advanceTypingState(state);
      expect(next.charIndex).toBe(2);
      expect(next.isDeleting).toBe(true);
    });

    it('moves to next text when deletion completes', () => {
      const state = { ...createTypingState(texts), charIndex: 1, isDeleting: true };
      const next = advanceTypingState(state);
      expect(next.charIndex).toBe(0);
      expect(next.isDeleting).toBe(false);
      expect(next.textIndex).toBe(1);
    });

    it('wraps around to first text after last text', () => {
      const state = { ...createTypingState(texts), textIndex: 1, charIndex: 1, isDeleting: true };
      const next = advanceTypingState(state);
      expect(next.textIndex).toBe(0);
      expect(next.charIndex).toBe(0);
      expect(next.isDeleting).toBe(false);
    });

    it('does not mutate original state', () => {
      const state = createTypingState(texts);
      const original = { ...state };
      advanceTypingState(state);
      expect(state).toEqual(original);
    });
  });

  describe('getTypingSpeed', () => {
    it('returns 100 when typing forward', () => {
      const state = { ...createTypingState(texts), isDeleting: false };
      expect(getTypingSpeed(state)).toBe(100);
    });

    it('returns 50 when deleting', () => {
      const state = { ...createTypingState(texts), isDeleting: true };
      expect(getTypingSpeed(state)).toBe(50);
    });
  });

  describe('shouldPauseBeforeDelete', () => {
    it('returns true when at end of text and not deleting', () => {
      const state = { ...createTypingState(texts), charIndex: 5, isDeleting: false };
      expect(shouldPauseBeforeDelete(state)).toBe(true);
    });

    it('returns false when not at end of text', () => {
      const state = { ...createTypingState(texts), charIndex: 3, isDeleting: false };
      expect(shouldPauseBeforeDelete(state)).toBe(false);
    });

    it('returns false when deleting even if at text length', () => {
      const state = { ...createTypingState(texts), charIndex: 5, isDeleting: true };
      expect(shouldPauseBeforeDelete(state)).toBe(false);
    });
  });

  describe('full typing cycle', () => {
    it('types through first word completely', () => {
      let state = createTypingState(['Hi']);
      // Type H
      state = advanceTypingState(state);
      expect(getDisplayText(state)).toBe('H');
      // Type i
      state = advanceTypingState(state);
      expect(getDisplayText(state)).toBe('Hi');
      expect(state.isDeleting).toBe(true);
      // Delete i
      state = advanceTypingState(state);
      expect(getDisplayText(state)).toBe('H');
      // Delete H
      state = advanceTypingState(state);
      expect(getDisplayText(state)).toBe('');
      expect(state.textIndex).toBe(0); // wraps with single text
    });
  });
});
