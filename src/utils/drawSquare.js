import robot from "robotjs";

export const drawSquare = (width) => {
  let mousePos = robot.getMousePos();

  robot.mouseToggle("down");
  for (let i = 0; i < width; i += 1) {
    const x = mousePos.x + i;
    const y = mousePos.y;
    robot.dragMouse(x, y);
  }

  mousePos = robot.getMousePos();

  for (let i = 0; i < width; i += 1) {
    const x = mousePos.x;
    const y = mousePos.y + i;
    robot.dragMouse(x, y);
  }

  mousePos = robot.getMousePos();

  for (let i = 0; i < width; i += 1) {
    const x = mousePos.x - i;
    const y = mousePos.y;
    robot.dragMouse(x, y);
  }

  mousePos = robot.getMousePos();

  for (let i = 0; i < width; i += 1) {
    const x = mousePos.x;
    const y = mousePos.y - i;
    robot.dragMouse(x, y);
  }
  robot.mouseToggle("up");
};
