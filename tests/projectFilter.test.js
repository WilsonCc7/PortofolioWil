const {
  projectDetails,
  filterProjects,
  getProjectDetails,
  generateModalHTML,
} = require('../src/projectFilter');

describe('projectFilter', () => {
  describe('filterProjects', () => {
    const cards = [
      { id: 1, category: 'web' },
      { id: 2, category: 'mobile' },
      { id: 3, category: 'web' },
      { id: 4, category: 'design' },
    ];

    it('shows all cards when filter is "all"', () => {
      const result = filterProjects(cards, 'all');
      expect(result.every(c => c.visible)).toBe(true);
    });

    it('filters by "web" category', () => {
      const result = filterProjects(cards, 'web');
      expect(result[0].visible).toBe(true);
      expect(result[1].visible).toBe(false);
      expect(result[2].visible).toBe(true);
      expect(result[3].visible).toBe(false);
    });

    it('filters by "mobile" category', () => {
      const result = filterProjects(cards, 'mobile');
      expect(result[0].visible).toBe(false);
      expect(result[1].visible).toBe(true);
      expect(result[2].visible).toBe(false);
      expect(result[3].visible).toBe(false);
    });

    it('hides all when filter matches no category', () => {
      const result = filterProjects(cards, 'nonexistent');
      expect(result.every(c => !c.visible)).toBe(true);
    });

    it('returns empty array for empty cards', () => {
      const result = filterProjects([], 'web');
      expect(result).toEqual([]);
    });

    it('does not mutate original cards', () => {
      const original = [...cards];
      filterProjects(cards, 'web');
      expect(cards).toEqual(original);
    });
  });

  describe('getProjectDetails', () => {
    it('returns project 1 details', () => {
      const project = getProjectDetails(1);
      expect(project.title).toBe('E-Commerce Platform');
      expect(project.features).toHaveLength(6);
      expect(project.technologies).toContain('React');
    });

    it('returns project 6 details', () => {
      const project = getProjectDetails(6);
      expect(project.title).toBe('Data Visualization Tool');
      expect(project.technologies).toContain('D3.js');
    });

    it('returns null for non-existent project', () => {
      expect(getProjectDetails(99)).toBeNull();
    });

    it('returns null for undefined projectId', () => {
      expect(getProjectDetails(undefined)).toBeNull();
    });

    it('returns all required fields', () => {
      const project = getProjectDetails(1);
      expect(project).toHaveProperty('title');
      expect(project).toHaveProperty('description');
      expect(project).toHaveProperty('features');
      expect(project).toHaveProperty('technologies');
      expect(project).toHaveProperty('demo');
      expect(project).toHaveProperty('github');
    });
  });

  describe('generateModalHTML', () => {
    it('returns empty string for null project', () => {
      expect(generateModalHTML(null)).toBe('');
    });

    it('returns empty string for undefined project', () => {
      expect(generateModalHTML(undefined)).toBe('');
    });

    it('includes project title in output', () => {
      const project = getProjectDetails(1);
      const html = generateModalHTML(project);
      expect(html).toContain('E-Commerce Platform');
    });

    it('includes project description', () => {
      const project = getProjectDetails(1);
      const html = generateModalHTML(project);
      expect(html).toContain('comprehensive online shopping platform');
    });

    it('includes all features as list items', () => {
      const project = getProjectDetails(1);
      const html = generateModalHTML(project);
      project.features.forEach(feature => {
        expect(html).toContain(`<li>${feature}</li>`);
      });
    });

    it('includes all technologies as tags', () => {
      const project = getProjectDetails(1);
      const html = generateModalHTML(project);
      project.technologies.forEach(tech => {
        expect(html).toContain(`<span class="tag">${tech}</span>`);
      });
    });

    it('generates valid HTML structure', () => {
      const project = getProjectDetails(2);
      const html = generateModalHTML(project);
      expect(html).toContain('<h2>');
      expect(html).toContain('</h2>');
      expect(html).toContain('<ul>');
      expect(html).toContain('</ul>');
    });
  });

  describe('projectDetails data', () => {
    it('has 6 projects defined', () => {
      expect(Object.keys(projectDetails)).toHaveLength(6);
    });

    it('all projects have required fields', () => {
      Object.values(projectDetails).forEach(project => {
        expect(project.title).toBeDefined();
        expect(project.description).toBeDefined();
        expect(Array.isArray(project.features)).toBe(true);
        expect(Array.isArray(project.technologies)).toBe(true);
        expect(project.demo).toBeDefined();
        expect(project.github).toBeDefined();
      });
    });

    it('all projects have non-empty features', () => {
      Object.values(projectDetails).forEach(project => {
        expect(project.features.length).toBeGreaterThan(0);
      });
    });

    it('all projects have non-empty technologies', () => {
      Object.values(projectDetails).forEach(project => {
        expect(project.technologies.length).toBeGreaterThan(0);
      });
    });
  });
});
