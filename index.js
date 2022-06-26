import { httpServer } from "./src/http_server/index.js";
import robot from "robotjs";
import { WebSocketServer } from "ws";
import { drawCircle } from "./src/utils/drawCircle.js";
import { drawSquare } from "./src/utils/drawSquare.js";
import { drawRectangle } from "./src/utils/drawRectangle.js";
import { getScreen } from "./src/utils/getScreen.js";

const HTTP_PORT = 3000;

console.log(`Start static http server on the http://localhost:${HTTP_PORT}`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({
  port: 8080,
});

wss.on("connection", (ws) => {
  ws.on("message", async (data) => {
    const [command, firstArg, secondArg] = data.toString().split(/\s/);
    const { x, y } = robot.getMousePos();
    console.log("command:", command);

    if (command === "mouse_position") {
      ws.send(`mouse_position ${x},${y}`);
    }
    if (command === "mouse_right") {
      const rightOffset = Number(firstArg);
      robot.moveMouse(x + rightOffset, y);
    }
    if (command === "mouse_left") {
      const leftOffset = Number(firstArg);
      robot.moveMouse(x - leftOffset, y);
    }
    if (command === "mouse_down") {
      const downOffset = Number(firstArg);
      robot.moveMouse(x, y + downOffset);
    }
    if (command === "mouse_up") {
      const upOffset = Number(firstArg);
      robot.moveMouse(x, y - upOffset);
    }
    if (command === "draw_circle") {
      const radius = firstArg;
      drawCircle(radius);
    }
    if (command === "draw_square") {
      const width = firstArg;
      drawSquare(width);
    }
    if (command === "draw_rectangle") {
      const width = firstArg;
      const height = secondArg;
      drawRectangle(width, height);
    }
    if (command === "prnt_scrn") {
      const [, screen] = (await getScreen()).split(",");
      ws.send(`prnt_scrn ${screen}`);
    }
  });
});
