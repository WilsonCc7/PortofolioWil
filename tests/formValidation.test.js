const {
  validateName,
  validateEmail,
  validateSubject,
  validateMessage,
  validateContactForm,
} = require('../src/formValidation');

describe('formValidation', () => {
  describe('validateName', () => {
    it('returns error when name is empty', () => {
      expect(validateName('')).toBe('Name must be at least 2 characters');
    });

    it('returns error when name is 1 character', () => {
      expect(validateName('A')).toBe('Name must be at least 2 characters');
    });

    it('returns null for valid name with 2 characters', () => {
      expect(validateName('Jo')).toBeNull();
    });

    it('returns null for longer valid name', () => {
      expect(validateName('Wilson')).toBeNull();
    });
  });

  describe('validateEmail', () => {
    it('returns error for empty string', () => {
      expect(validateEmail('')).toBe('Please enter a valid email address');
    });

    it('returns error for string without @', () => {
      expect(validateEmail('userexample.com')).toBe('Please enter a valid email address');
    });

    it('returns error for string without domain', () => {
      expect(validateEmail('user@')).toBe('Please enter a valid email address');
    });

    it('returns error for string without TLD', () => {
      expect(validateEmail('user@example')).toBe('Please enter a valid email address');
    });

    it('returns error for email with spaces', () => {
      expect(validateEmail('user @example.com')).toBe('Please enter a valid email address');
    });

    it('returns null for valid email', () => {
      expect(validateEmail('user@example.com')).toBeNull();
    });

    it('returns null for email with subdomain', () => {
      expect(validateEmail('user@mail.example.com')).toBeNull();
    });

    it('returns null for email with plus sign', () => {
      expect(validateEmail('user+tag@example.com')).toBeNull();
    });
  });

  describe('validateSubject', () => {
    it('returns error when subject is empty', () => {
      expect(validateSubject('')).toBe('Subject must be at least 3 characters');
    });

    it('returns error when subject is 2 characters', () => {
      expect(validateSubject('Hi')).toBe('Subject must be at least 3 characters');
    });

    it('returns null for valid subject with 3 characters', () => {
      expect(validateSubject('Hey')).toBeNull();
    });

    it('returns null for longer subject', () => {
      expect(validateSubject('Hello there')).toBeNull();
    });
  });

  describe('validateMessage', () => {
    it('returns error when message is empty', () => {
      expect(validateMessage('')).toBe('Message must be at least 10 characters');
    });

    it('returns error when message is 9 characters', () => {
      expect(validateMessage('Short msg')).toBe('Message must be at least 10 characters');
    });

    it('returns null for valid message with exactly 10 characters', () => {
      expect(validateMessage('Hello Wils')).toBeNull();
    });

    it('returns null for longer message', () => {
      expect(validateMessage('This is a longer message for testing purposes')).toBeNull();
    });
  });

  describe('validateContactForm', () => {
    it('returns isValid true when all fields are valid', () => {
      const result = validateContactForm({
        name: 'Wilson',
        email: 'wilson@example.com',
        subject: 'Hello',
        message: 'This is a valid message',
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('returns isValid false with all errors when all fields are invalid', () => {
      const result = validateContactForm({
        name: '',
        email: 'invalid',
        subject: 'Hi',
        message: 'Short',
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBeDefined();
      expect(result.errors.email).toBeDefined();
      expect(result.errors.subject).toBeDefined();
      expect(result.errors.message).toBeDefined();
    });

    it('returns only the failing field error', () => {
      const result = validateContactForm({
        name: 'Wilson',
        email: 'bad-email',
        subject: 'Hello',
        message: 'This is a valid message',
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBeDefined();
      expect(result.errors.name).toBeUndefined();
      expect(result.errors.subject).toBeUndefined();
      expect(result.errors.message).toBeUndefined();
    });

    it('handles edge case of exactly minimum length values', () => {
      const result = validateContactForm({
        name: 'Jo',
        email: 'a@b.co',
        subject: 'Hey',
        message: 'Ten chars!',
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });
  });
});
