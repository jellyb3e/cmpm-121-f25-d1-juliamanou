import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter: number = 0;
let lastTime: number = 0;
const numAuto: number = 1; // 0 autoclicks to start

document.body.innerHTML = `
  <h1>meese explosion factory.</h1>
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
  <button id="moots">🫎</button>
  <div><span id="counter">0</span> meese obliterated</div>
`;
// consider: blown to smithereens

// click handler
const button = document.getElementById("moots")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  click();
});

// FUNCTION CALLS
requestAnimationFrame(step);

// FUNCTION DECLARATIONS

function click(amount: number = 1) {
  counter += amount;
  counterElement.innerHTML = `${Math.trunc(counter)}`;
}

function step(timestamp: number) {
  // calculate time since last step
  const timeElapsed: number = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  // increment counter based on time elapsed and auto-clicks per second
  click(timeElapsed * numAuto);

  // repeat steps indefinitely
  requestAnimationFrame(step);
}
