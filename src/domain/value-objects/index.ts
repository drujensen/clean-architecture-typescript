export interface ValueObject {
  equals(other: ValueObject): boolean;
}

export * from './Id';
export { Id as ProductId } from './Id';
export { Id as UserId } from './Id';
export * from './Email';
export * from './Price';