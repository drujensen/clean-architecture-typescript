export interface ValueObject {
  equals(other: ValueObject): boolean;
}

export * from './ProductId';
export * from './UserId';
export * from './Email';
export * from './Price';