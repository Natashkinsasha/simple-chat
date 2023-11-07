

export type ClientMessage = {
    from: string;
    message: string;
    room: string;
}

export type Message = {
    id: string,
    date: string,
    from: string;
    message: string;
    room: string;
}