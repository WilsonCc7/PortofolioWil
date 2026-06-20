/**
 * Contact form validation logic.
 */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateName(name) {
  if (name.length < 2) {
    return 'Name must be at least 2 characters';
  }
  return null;
}

function validateEmail(email) {
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
}

function validateSubject(subject) {
  if (subject.length < 3) {
    return 'Subject must be at least 3 characters';
  }
  return null;
}

function validateMessage(message) {
  if (message.length < 10) {
    return 'Message must be at least 10 characters';
  }
  return null;
}

function validateContactForm({ name, email, subject, message }) {
  const errors = {};

  const nameError = validateName(name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const subjectError = validateSubject(subject);
  if (subjectError) errors.subject = subjectError;

  const messageError = validateMessage(message);
  if (messageError) errors.message = messageError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

module.exports = {
  validateName,
  validateEmail,
  validateSubject,
  validateMessage,
  validateContactForm,
};
