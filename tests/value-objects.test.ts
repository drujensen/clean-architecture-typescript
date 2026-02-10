import { Id, Email, Price } from '../src/domain/value-objects';

describe('Value Objects', () => {
  describe('Id', () => {
    it('should create unique IDs', () => {
      const id1 = Id.create();
      const id2 = Id.create();
      expect(id1).not.toBe(id2);
      expect(id1.getValue()).not.toBe(id2.getValue());
    });

    it('should create ID from string', () => {
      const value = '019c45d0-40d3-7ff7-9bae-bb0ca6d4f7d6';
      const id = Id.fromString(value);
      expect(id.getValue()).toBe(value);
    });

    it('should throw error for empty string', () => {
      expect(() => Id.fromString('')).toThrow('Id cannot be empty');
    });

    it('should implement equals correctly', () => {
      const id1 = Id.fromString('019c45d0-40d3-7ff7-9bae-bb0ca6d4f7d6');
      const id2 = Id.fromString('019c45d0-40d3-7ff7-9bae-bb0ca6d4f7d6');
      const id3 = Id.fromString('019c45d0-40d3-7ff7-9bae-bb0ca6d4f7d7');

      expect(id1.equals(id2)).toBe(true);
      expect(id1.equals(id3)).toBe(false);
    });
  });

  describe('Email', () => {
    it('should create email', () => {
      const email = Email.create('test@example.com');
      expect(email.getValue()).toBe('test@example.com');
    });

    it('should throw error for invalid email', () => {
      expect(() => Email.create('invalid-email')).toThrow('Invalid email');
      expect(() => Email.create('')).toThrow('Invalid email');
    });

    it('should implement equals correctly', () => {
      const email1 = Email.create('test@example.com');
      const email2 = Email.create('test@example.com');
      const email3 = Email.create('other@example.com');

      expect(email1.equals(email2)).toBe(true);
      expect(email1.equals(email3)).toBe(false);
    });
  });

  describe('Price', () => {
    it('should create price', () => {
      const price = Price.create(29.99);
      expect(price.getValue()).toBe(29.99);
    });

    it('should throw error for negative price', () => {
      expect(() => Price.create(-10)).toThrow('Price cannot be negative');
    });

    it('should implement equals correctly', () => {
      const price1 = Price.create(29.99);
      const price2 = Price.create(29.99);
      const price3 = Price.create(39.99);

      expect(price1.equals(price2)).toBe(true);
      expect(price1.equals(price3)).toBe(false);
    });
  });
});