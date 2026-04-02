const canvas = document.getElementById("aboutUsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const w = canvas.width;
const h = canvas.height;

ctx.strokeStyle = "#1C1C1C"; // color
ctx.lineWidth = 2;        // thickness

// Coordinates (adjust these to match your exact design)
const A = { x: w, y: 0 };        // top-right corner
const B = { x: w * 0.65, y: h * 0.03 };
const C = { x: w * 0.65, y: h * 0.3 };
const D = { x: w, y: h * 0.35 };        // bottom-right corner

ctx.beginPath();
ctx.moveTo(A.x, A.y);
ctx.lineTo(B.x, B.y);
ctx.lineTo(C.x, C.y);
ctx.lineTo(D.x, D.y);
ctx.stroke();

// Line Two
const offset = w*0.1;
const A2 = { x: A.x + offset, y: A.y };
const B2 = { x: B.x + offset, y: B.y };
const C2 = { x: C.x + offset, y: C.y };
const D2 = { x: D.x + offset, y: D.y };

ctx.beginPath();
ctx.moveTo(A2.x, A2.y);
ctx.lineTo(B2.x, B2.y);
ctx.lineTo(C2.x, C2.y);
ctx.lineTo(D2.x, D2.y);
ctx.stroke();

//Line Two
const A3 = { x: 0, y : 0};
const B3 = { x: w * 0.3, y: h * 0.03};
const C3 = { x: w * 0.3, y: h * 0.29};
const D3 = { x: 0, y: w * 0.84};

ctx.beginPath();
ctx.moveTo(A3.x, A3.y);
ctx.lineTo(B3.x, B3.y);
ctx.lineTo(C3.x, C3.y);
ctx.lineTo(D3.x, D3.y);
ctx.stroke();

