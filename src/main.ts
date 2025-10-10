import "./style.css";

let counter: number = 0; // click counter
let lastTime: number = 0; // used for auto-click calculation
let autoClicks: number = 0; // 0 autoclicks to start

let costA: number = 10; // cost to upgrade autoclicker a
let costB: number = 100; // cost to upgrade autoclicker b
let costC: number = 1000; // cost to upgrade autoclicker c

const upsA: number = 0.1; // units per second
const upsB: number = 2;
const upsC: number = 50;

let purchasedA: number = 0;
let purchasedB: number = 0;
let purchasedC: number = 0;

// auto-moose-obliterator
document.body.innerHTML = `
  <h1>meese explosion factory.</h1>
  <button id="moots">🫎</button>
  <div class="content-text"><span id="counter">0</span> meese blown to smithereens</div>
  <div class="label-text">obliter-rate-ion: <span id="growthRate">0</span> meese/sec</div>
  <br>
  <button id="buyButtonA" disabled>upgradeA (+0.1 meese/sec)</button>
  <div class="label-text">cost: <span id="upgradeCostA">10</span> doubloons</div>
  <div class="label-text">purchased: <span id="purchasedA">0</span> units</div>
  <br>
  <button id="buyButtonB" disabled>upgradeB (+2.0 meese/sec)</button>
  <div class="label-text">cost: <span id="upgradeCostB">100</span> doubloons</div>
  <div class="label-text">purchased: <span id="purchasedB">0</span> units</div>
  <br>
  <button id="buyButtonC" disabled>upgradeC (+50.0 meese/sec)</button>
  <div class="label-text">cost: <span id="upgradeCostC">1000</span> doubloons</div>
  <div class="label-text">purchased: <span id="purchasedB">0</span> units</div>
`;

// click handler
const button = document.getElementById("moots")!;
const counterElement = document.getElementById("counter")!;

// buy buttons
const buyButtonA = document.getElementById("buyButtonA")!;
const buyButtonB = document.getElementById("buyButtonB")!;
const buyButtonC = document.getElementById("buyButtonC")!;

// buy buttons
const purchasedAElement = document.getElementById("purchasedA")!;
const purchasedBElement = document.getElementById("purchasedB")!;
const purchasedCElement = document.getElementById("purchasedC")!;

// associated upgrade costs
const costElementA = document.getElementById("upgradeCostA")!;
const costElementB = document.getElementById("upgradeCostB")!;
const costElementC = document.getElementById("upgradeCostC")!;

const growthElement = document.getElementById("growthRate")!;

button.addEventListener("click", () => {
  click();
});
buyButtonA.addEventListener("click", () => {
  buyUpgrade(costA, upsA);
  purchasedA++;
  purchasedAElement.innerHTML = `${purchasedA}`;
  costA *= 1.15;
  costElementA.innerHTML = costA.toFixed(0);
});
buyButtonB.addEventListener("click", () => {
  buyUpgrade(costB, upsB);
  purchasedB++;
  purchasedBElement.innerHTML = `${purchasedB}`;
  costB *= 1.15;
  costElementB.innerHTML = costB.toFixed(0);
});
buyButtonC.addEventListener("click", () => {
  buyUpgrade(costC, upsC);
  purchasedC++;
  purchasedCElement.innerHTML = `${purchasedC}`;
  costC *= 1.15;
  costElementC.innerHTML = costC.toFixed(0);
});

// FUNCTION CALLS
requestAnimationFrame(step);

// FUNCTION DECLARATIONS

function click(amount: number = 1) {
  counter += amount;
  counterElement.innerHTML = counter.toFixed(0);
  checkUpgrade(costA, buyButtonA);
  checkUpgrade(costB, buyButtonB);
  checkUpgrade(costC, buyButtonC);
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

function checkUpgrade(cost: number, buttonElement: HTMLElement) {
  if (counter >= cost) {
    buttonElement.removeAttribute("disabled");
  } else if (!buttonElement.hasAttribute("disabled")) {
    buttonElement.setAttribute("disabled", "true");
  }
}

function buyUpgrade(
  cost: number,
  unitsPerSec: number,
) {
  counter -= cost;
  autoClicks += unitsPerSec;
  counterElement.innerHTML = counter.toFixed(0);
  growthElement.innerHTML = autoClicks.toFixed(1);
}
