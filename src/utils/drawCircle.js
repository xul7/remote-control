import robot from "robotjs";

export const drawCircle = (radius) => {
  const mousePos = robot.getMousePos();
  let isMousePressed = false;

  for (let i = 0; i <= Math.PI * 2; i += 0.01 * Math.PI) {
    // Convert polar coordinates to cartesian
    const x = mousePos.x + radius * Math.cos(i);
    const y = mousePos.y + radius * Math.sin(i);

    robot.dragMouse(x, y);

    if (!isMousePressed) {
      robot.mouseToggle("down");
      isMousePressed = true;
    }
  }
  robot.mouseToggle("up");
};
