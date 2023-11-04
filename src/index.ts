import throng from 'throng';
import { ChatServer } from './chat-server';


throng({worker: ()=>{
    new ChatServer().init();
}, count: 1})