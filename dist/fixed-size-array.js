"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixedSizeArray = void 0;
class FixedSizeArray {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.items = [];
    }
    add(item) {
        this.items.push(item);
        if (this.items.length > this.maxSize) {
            this.items.shift(); // Удалить первый элемент, если размер массива превышает maxSize
        }
    }
    getItems() {
        return this.items;
    }
}
exports.FixedSizeArray = FixedSizeArray;
