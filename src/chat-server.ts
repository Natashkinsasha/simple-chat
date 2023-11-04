import express from "express";
import cors from "cors";
import * as http from "http";
import { Server } from "socket.io";
import {Message} from "./message";
import {MessagesManager} from "./message-manager";
import bodyParser from "body-parser";

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
    app.post('/messages', (req, res)=>{
      try{
        this.messageManager.addMessage(req.body);
        io.emit("message", req.body);
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
    app.use(cors());
    app.use(bodyParser.json())
    return app;
  }

  private createServer(app: express.Application){
    return http.createServer(app);
  }

  private createIO(server: http.Server) {
    return new Server(server);
  }


}
