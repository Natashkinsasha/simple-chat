"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const throng_1 = __importDefault(require("throng"));
const chat_server_1 = require("./chat-server");
(0, throng_1.default)({ worker: () => {
        new chat_server_1.ChatServer().init();
    }, count: 1 });
