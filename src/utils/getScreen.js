import Jimp from "jimp";
import robot from "robotjs";

export const getScreen = async () => {
  const { x, y } = robot.getMousePos();
  const size = 100;

  const { image, width, height } = robot.screen.capture(
    x - size,
    y - size,
    size * 2,
    size * 2
  );

  const jimp = new Jimp({ data: image, width, height });

  const base64Image = await jimp.getBase64Async(Jimp.MIME_PNG);

  return base64Image;
};
