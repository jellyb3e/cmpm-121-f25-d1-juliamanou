import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter: number = 0; // click counter
let lastTime: number = 0; // used for auto-click calculation
let autoClicks: number = 0; // 0 autoclicks to start
let upgradeCost: number = 10; // cost to upgrade autoclicker

document.body.innerHTML = `
  <h1>meese explosion factory.</h1>
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
  <button id="moots">🫎</button>
  <div><span id="counter">0</span> meese blown to smithereens</div>
  <br>
  <button id="buyButton" disabled>buy auto-moose-obliterator</button>
  <div>cost: <span id="upgradeCost">10</span> doubloons</div>
`;

// click handler
const button = document.getElementById("moots")!;
const counterElement = document.getElementById("counter")!;
const buyButton = document.getElementById("buyButton")!;
const costElement = document.getElementById("upgradeCost")!;

button.addEventListener("click", () => {
  click();
});
buyButton.addEventListener("click", () => {
  buyUpgrade();
});

// FUNCTION CALLS
requestAnimationFrame(step);

// FUNCTION DECLARATIONS

function click(amount: number = 1) {
  counter += amount;
  counterElement.innerHTML = `${Math.trunc(counter)}`;
  checkUpgrade();
}

function step(timestamp: number) {
  // calculate time since last step
  const timeElapsed: number = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  // increment counter based on time elapsed and auto-clicks per second
  click(timeElapsed * autoClicks);

  // repeat steps indefinitely
  requestAnimationFrame(step);
}

function checkUpgrade() {
  if (counter >= upgradeCost) {
    buyButton.removeAttribute("disabled");
  } else if (!buyButton.hasAttribute("disabled")) {
    buyButton.setAttribute("disabled", "true");
  }
}

function buyUpgrade() {
  counter -= upgradeCost;
  upgradeCost *= 2;
  autoClicks++;
  costElement.innerHTML = `${upgradeCost}`;
  counterElement.innerHTML = `${Math.trunc(counter)}`;
}
