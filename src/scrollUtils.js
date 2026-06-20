/**
 * Scroll-related utility functions.
 */

function calculateScrollProgress(scrollY, scrollHeight, clientHeight) {
  const windowHeight = scrollHeight - clientHeight;
  if (windowHeight <= 0) return 0;
  const scrolled = (scrollY / windowHeight) * 100;
  return Math.min(Math.max(scrolled, 0), 100);
}

function isNavbarScrolled(scrollY, threshold) {
  return scrollY > threshold;
}

function getCurrentSection(sections, scrollY, offset) {
  let current = '';
  for (const section of sections) {
    if (scrollY >= section.top - offset) {
      current = section.id;
    }
  }
  return current;
}

function isBackToTopVisible(scrollY, threshold) {
  return scrollY > threshold;
}

module.exports = {
  calculateScrollProgress,
  isNavbarScrolled,
  getCurrentSection,
  isBackToTopVisible,
};
