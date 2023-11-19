import express from "express";
import cors from "cors";
import * as http from "http";
import { Server } from "socket.io";
import {MessagesManager} from "./message-manager";
import bodyParser from "body-parser";
import BadWordsNext from "bad-words-next";
import xss from "xss";

const en = require('bad-words-next/data/en.json');
const ru = require('bad-words-next/data/ru.json');



export class ChatServer {

  private readonly messageManager = new MessagesManager(100)

  public init(){
    const app = this.createApp();
    const server = this.createServer(app);
    const io = this.createIO(server);
    const port = process.env.PORT ?? 8080;
    server.listen(port, () => {
      console.log("Running server on port %s", port);
    });
    app.get('/messages', (req, res)=>{
      return res.send(this.messageManager.getAllMessages())
    })

    const badwords = new BadWordsNext({ data: en });
    badwords.add(ru);
    app.post('/messages', (req, res)=>{
      try{
        const message = xss(badwords.filter(req.body.message), {});
        const object = this.messageManager.addMessage({...req.body, message});
        io.emit("message", object);
      } catch (err){
        console.log('error', err);
        return res.status(400).end();
      }
      return res.end();
    })
    io.on("connect", (socket) => {
      console.log("Connected client on port %s.", port);
      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }


  private createApp() {
    const app = express();
    app.use(bodyParser.json())
    app.use(cors());
    return app;
  }

  private createServer(app: express.Application){
    return http.createServer(app);
  }

  private createIO(server: http.Server) {
    return new Server(server);
  }


}
