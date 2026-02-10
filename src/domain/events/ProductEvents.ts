export class ProductCreatedEvent {
  constructor(
    public readonly productId: string,
    public readonly name: string,
    public readonly price: number,
    public readonly categoryId: string,
    public readonly timestamp: Date
  ) {}
}

export class ProductUpdatedEvent {
  constructor(
    public readonly productId: string,
    public readonly name: string,
    public readonly price: number,
    public readonly categoryId: string,
    public readonly timestamp: Date
  ) {}
}