import Jimp from "jimp";
import { httpServer } from "./src/http_server/index.js";
import robot from "robotjs";
import { WebSocketServer } from "ws";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({
  port: 8080,
});

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    const [command, argument] = data.toString().split(/\s/);
    const { x, y } = robot.getMousePos();
    console.log("command:", command);

    if (command === "mouse_position") {
      ws.send(`mouse_position ${x},${y}`);
    }
    if (command === "mouse_right") {
      const rightOffset = Number(argument);
      robot.moveMouse(x + rightOffset, y);
    }
    if (command === "mouse_left") {
      const leftOffset = Number(argument);
      robot.moveMouse(x - leftOffset, y);
    }
    if (command === "mouse_down") {
      const downOffset = Number(argument);
      robot.moveMouse(x, y + downOffset);
    }
    if (command === "mouse_up") {
      const upOffset = Number(argument);
      robot.moveMouse(x, y - upOffset);
    }
  });
});
