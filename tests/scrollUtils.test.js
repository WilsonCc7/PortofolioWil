const {
  calculateScrollProgress,
  isNavbarScrolled,
  getCurrentSection,
  isBackToTopVisible,
} = require('../src/scrollUtils');

describe('scrollUtils', () => {
  describe('calculateScrollProgress', () => {
    it('returns 0 when at top of page', () => {
      expect(calculateScrollProgress(0, 2000, 800)).toBe(0);
    });

    it('returns 100 when at bottom of page', () => {
      expect(calculateScrollProgress(1200, 2000, 800)).toBe(100);
    });

    it('returns 50 when halfway scrolled', () => {
      expect(calculateScrollProgress(600, 2000, 800)).toBe(50);
    });

    it('returns 0 when page has no scrollable content', () => {
      expect(calculateScrollProgress(0, 800, 800)).toBe(0);
    });

    it('returns 0 when scrollHeight is less than clientHeight', () => {
      expect(calculateScrollProgress(0, 500, 800)).toBe(0);
    });

    it('clamps result to 100 maximum', () => {
      expect(calculateScrollProgress(2000, 2000, 800)).toBe(100);
    });

    it('clamps result to 0 minimum', () => {
      expect(calculateScrollProgress(-100, 2000, 800)).toBe(0);
    });

    it('calculates correct percentage for arbitrary scroll', () => {
      // scrollY=300, scrollHeight=2000, clientHeight=800 => 300/1200 * 100 = 25
      expect(calculateScrollProgress(300, 2000, 800)).toBe(25);
    });
  });

  describe('isNavbarScrolled', () => {
    it('returns false when scrollY is 0', () => {
      expect(isNavbarScrolled(0, 100)).toBe(false);
    });

    it('returns false when scrollY equals threshold', () => {
      expect(isNavbarScrolled(100, 100)).toBe(false);
    });

    it('returns true when scrollY exceeds threshold', () => {
      expect(isNavbarScrolled(101, 100)).toBe(true);
    });

    it('works with custom threshold', () => {
      expect(isNavbarScrolled(50, 50)).toBe(false);
      expect(isNavbarScrolled(51, 50)).toBe(true);
    });
  });

  describe('getCurrentSection', () => {
    const sections = [
      { id: 'home', top: 0 },
      { id: 'about', top: 500 },
      { id: 'projects', top: 1000 },
      { id: 'contact', top: 1500 },
    ];

    it('returns empty string when no sections are passed threshold', () => {
      expect(getCurrentSection([], 100, 200)).toBe('');
    });

    it('returns first section when scrollY is at top', () => {
      expect(getCurrentSection(sections, 200, 200)).toBe('home');
    });

    it('returns about section when scrolled past it', () => {
      expect(getCurrentSection(sections, 400, 200)).toBe('about');
    });

    it('returns projects section when scrolled past it', () => {
      expect(getCurrentSection(sections, 900, 200)).toBe('projects');
    });

    it('returns contact section when scrolled to bottom', () => {
      expect(getCurrentSection(sections, 1400, 200)).toBe('contact');
    });

    it('uses offset to determine activation point', () => {
      // scrollY=250, offset=200. section at 500: 250 >= 500-200=300? No
      expect(getCurrentSection(sections, 250, 200)).toBe('home');
      // scrollY=300, offset=200. section at 500: 300 >= 300? Yes
      expect(getCurrentSection(sections, 300, 200)).toBe('about');
    });
  });

  describe('isBackToTopVisible', () => {
    it('returns false when scrollY is 0', () => {
      expect(isBackToTopVisible(0, 500)).toBe(false);
    });

    it('returns false when scrollY equals threshold', () => {
      expect(isBackToTopVisible(500, 500)).toBe(false);
    });

    it('returns true when scrollY exceeds threshold', () => {
      expect(isBackToTopVisible(501, 500)).toBe(true);
    });

    it('works with different thresholds', () => {
      expect(isBackToTopVisible(200, 100)).toBe(true);
      expect(isBackToTopVisible(50, 100)).toBe(false);
    });
  });
});
