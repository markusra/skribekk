enum Color {
  BLACK = "black",
  BLUE = "blue",
  GREEN = "green",
  RED = "red",
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

let prevX: number | null = null;
let prevY: number | null = null;

let draw = false;

// Need this since we set width and height to 100 % with CSS
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Smooth lines
ctx.lineCap = "round";

ctx.lineWidth = 5;

window.addEventListener("mousedown", () => {
  draw = true;
});

window.addEventListener("mouseup", () => {
  draw = false;
});

window.addEventListener("mousemove", (e) => {
  const offsetX = canvas.getBoundingClientRect().left;
  const offsetY = canvas.getBoundingClientRect().top;

  if (prevX === null || prevY === null || !draw) {
    prevX = e.clientX - offsetX;
    prevY = e.clientY - offsetY;
    return;
  }

  let currentX = e.clientX - offsetX;
  let currentY = e.clientY - offsetY;

  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();

  prevX = currentX;
  prevY = currentY;
});

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function setColor(color: Color) {
  ctx.strokeStyle = color;
}
