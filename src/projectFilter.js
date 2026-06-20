/**
 * Project filtering and modal logic.
 */

const projectDetails = {
  1: {
    title: 'E-Commerce Platform',
    description: 'A comprehensive online shopping platform featuring product catalogs, shopping cart, secure payment integration, user authentication, and an admin dashboard for inventory management.',
    features: ['User Authentication', 'Product Catalog', 'Shopping Cart', 'Payment Integration', 'Order Tracking', 'Admin Dashboard'],
    technologies: ['React', 'Node.js', 'Express', 'MySQL', 'Stripe API', 'JWT'],
    demo: '#',
    github: '#',
  },
  2: {
    title: 'Social Media Dashboard',
    description: 'A powerful analytics dashboard that aggregates data from multiple social media platforms.',
    features: ['Multi-platform Integration', 'Real-time Analytics', 'Data Visualization', 'Engagement Tracking', 'Custom Reports', 'Responsive Design'],
    technologies: ['JavaScript', 'Chart.js', 'Firebase', 'REST APIs', 'HTML/CSS'],
    demo: '#',
    github: '#',
  },
  3: {
    title: 'Task Management App',
    description: 'A mobile-first task management application with intuitive drag-and-drop interface.',
    features: ['Task Organization', 'Categories & Tags', 'Reminders', 'Progress Tracking', 'Offline Support', 'Cloud Sync'],
    technologies: ['React Native', 'SQLite', 'AsyncStorage', 'Push Notifications'],
    demo: '#',
    github: '#',
  },
  4: {
    title: 'Portfolio Website Builder',
    description: 'An intuitive drag-and-drop website builder.',
    features: ['Drag & Drop Editor', 'Customizable Templates', 'Real-time Preview', 'Export Code', 'Responsive Design', 'Asset Management'],
    technologies: ['JavaScript', 'HTML/CSS', 'LocalStorage', 'Canvas API'],
    demo: '#',
    github: '#',
  },
  5: {
    title: 'AI Chatbot Assistant',
    description: 'An intelligent chatbot powered by natural language processing.',
    features: ['Natural Language Processing', 'Learning Algorithm', 'Multi-language Support', 'Context Awareness', 'Analytics Dashboard', 'Custom Training'],
    technologies: ['Python', 'TensorFlow', 'Flask', 'NLTK', 'MongoDB'],
    demo: '#',
    github: '#',
  },
  6: {
    title: 'Data Visualization Tool',
    description: 'A sophisticated data visualization application.',
    features: ['Interactive Charts', 'Multiple Data Sources', 'Custom Visualizations', 'Export Options', 'Real-time Updates', 'Collaboration Tools'],
    technologies: ['Python', 'D3.js', 'Pandas', 'NumPy', 'Flask'],
    demo: '#',
    github: '#',
  },
};

function filterProjects(cards, filter) {
  return cards.map(card => ({
    ...card,
    visible: filter === 'all' || card.category === filter,
  }));
}

function getProjectDetails(projectId) {
  return projectDetails[projectId] || null;
}

function generateModalHTML(project) {
  if (!project) return '';

  const featuresList = project.features.map(f => `<li>${f}</li>`).join('');
  const techTags = project.technologies.map(t => `<span class="tag">${t}</span>`).join('');

  return `<h2>${project.title}</h2><p>${project.description}</p><ul>${featuresList}</ul><div>${techTags}</div>`;
}

module.exports = {
  projectDetails,
  filterProjects,
  getProjectDetails,
  generateModalHTML,
};
