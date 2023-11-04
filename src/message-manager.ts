import {FixedSizeArray} from "./fixed-size-array";
import {Message} from "./message";


export class MessagesManager {
    private rooms: Map<string, FixedSizeArray<Message>>;
    private readonly maxSize: number;

    constructor(maxSize: number) {
        this.maxSize = maxSize;
        this.rooms = new Map();
    }

    public addMessage(message: Message): void {
        if (!this.rooms.has(message.room)) {
            this.rooms.set(message.room, new FixedSizeArray<Message>(this.maxSize));
        }
        const roomMessages = this.rooms.get(message.room)!;
        roomMessages.add(message);
    }


    public getAllMessages(): Record<string, Message[]> {
        const allMessages: Record<string, Message[]> = {};
        this.rooms.forEach((messages, room) => {
            allMessages[room] = messages.getItems();
        });
        return allMessages;
    }
}