export const roundShadow = (b: number, c: string = "#fff") => {
  return `${b}px ${b}px ${c}, ${b}px -${b}px ${c}, -${b}px ${b}px ${c}, -${b}px -${b}px ${c}`;
};

// Params:
// - x: number, fraction of the original transform origin x, relative to the image width
// - y: number, fraction of the original transform origin y, relative to the image height
// - aspectRatio: number, the aspect ratio of the image
// Returns:
// - number[2], the actual transform origin x and y relative to the screen
export const calculateTransformOrigin = (x: number, y: number, aspectRatio: number) => {
  const imageAspectRatio = aspectRatio;
  const screenAspectRatio = Math.max(window.innerHeight / window.innerWidth, 16 / 9);

  if (screenAspectRatio > imageAspectRatio) {
    // Screen is taller than the image, so the edge of the image will touch the top and bottom of the screen
    const widthRatio = imageAspectRatio / screenAspectRatio;
    const originX = (x - (1 - widthRatio) / 2) / widthRatio;
    return [originX, y];
  } else {
    // Screen is wider than the image, so the edge of the image will touch the left and right of the screen
    const heightRatio = screenAspectRatio / imageAspectRatio;
    const originY = (y - (1 - heightRatio) / 2) / heightRatio;
    return [x, originY];
  }
};
