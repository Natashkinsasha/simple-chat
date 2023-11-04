"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesManager = void 0;
const fixed_size_array_1 = require("./fixed-size-array");
class MessagesManager {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.rooms = new Map();
    }
    addMessage(message) {
        if (!this.rooms.has(message.room)) {
            this.rooms.set(message.room, new fixed_size_array_1.FixedSizeArray(this.maxSize));
        }
        const roomMessages = this.rooms.get(message.room);
        roomMessages.add(message);
    }
    getAllMessages() {
        const allMessages = {};
        this.rooms.forEach((messages, room) => {
            allMessages[room] = messages.getItems();
        });
        return allMessages;
    }
}
exports.MessagesManager = MessagesManager;
