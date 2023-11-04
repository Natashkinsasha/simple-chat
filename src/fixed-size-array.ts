export class FixedSizeArray<T> {
    private items: T[];
    private readonly maxSize: number;

    constructor(maxSize: number) {
        this.maxSize = maxSize;
        this.items = [];
    }

    public add(item: T): void {
        this.items.push(item);
        if (this.items.length > this.maxSize) {
            this.items.shift(); // Удалить первый элемент, если размер массива превышает maxSize
        }
    }

    public getItems(): T[] {
        return this.items;
    }
}