/**
 * Typing animation state machine logic.
 */

function createTypingState(texts) {
  return {
    texts,
    textIndex: 0,
    charIndex: 0,
    isDeleting: false,
  };
}

function getDisplayText(state) {
  const currentText = state.texts[state.textIndex];
  return currentText.substring(0, state.charIndex);
}

function advanceTypingState(state) {
  const currentText = state.texts[state.textIndex];
  const newState = { ...state };

  if (state.isDeleting) {
    newState.charIndex = state.charIndex - 1;

    if (newState.charIndex === 0) {
      newState.isDeleting = false;
      newState.textIndex = (state.textIndex + 1) % state.texts.length;
    }
  } else {
    newState.charIndex = state.charIndex + 1;

    if (newState.charIndex === currentText.length) {
      newState.isDeleting = true;
    }
  }

  return newState;
}

function getTypingSpeed(state) {
  return state.isDeleting ? 50 : 100;
}

function shouldPauseBeforeDelete(state) {
  const currentText = state.texts[state.textIndex];
  return !state.isDeleting && state.charIndex === currentText.length;
}

module.exports = {
  createTypingState,
  getDisplayText,
  advanceTypingState,
  getTypingSpeed,
  shouldPauseBeforeDelete,
};
