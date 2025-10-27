/*
Credits:
Song: Mildred's Waltz - Binkley (royalty-free music) https://www.epidemicsound.com/music/tracks/a06bb301-8bc1-4628-829a-db7b27feb10d/
Moose Image: https://yukonwildlife.ca/2020-09-misunderstood-moose/
Moose Sound: https://averagehunter.com/wild-game-downloads/moose/
Title Font: 
*  Copyright © Typygrapher Mediengestaltung, 2000. All rights reserved. Logger font 1991 by D. Rakowski. Foreign characters added by Dieter Steffmann, Kreuztal
*  https://www.1001fonts.com/logger-font.html
Upgrade Border Inspiration: https://github.com/slashleyonline/d1/blob/main/src/style.css
Title Font Inspiration: https://github.com/Noah2271/cmpm-121-incremental-nbilledo
*/

import gameMusic from "./gameMusic.mp3";
import buttonImg from "./moose.png";
import clickSoundImport from "./mooseSound.mp3";
import "./style.css";
import backgroundImg from "./wood-paneling.png";

// Game State Variables

const clickSound: HTMLAudioElement = new Audio(clickSoundImport);

let clicks: number = 0; // click counter
let lastTime: number = 0; // used for auto-click calculation
let autoClicks: number = 0; // 0 autoclicks to start

interface Item {
  name: string;
  cost: number;
  rate: number;
  units: number;
  costUnit: string;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "buy auto-moose-obliterator",
    cost: 10,
    rate: 0.1,
    units: 0,
    costUnit: "moose ankles",
    description:
      "state-of-the-art moose obliterator exterminates 1 moose every 10 seconds!",
  },
  {
    name: "invest in the moose meat industry",
    cost: 100,
    rate: 2,
    units: 0,
    costUnit: "moose shoulders",
    description: "people will really eat anything these days",
  },
  {
    name: "conduct scientific experiments on meese",
    cost: 1000,
    rate: 50,
    units: 0,
    costUnit: "moose elbows",
    description: "they say meese are the closest relative to humans",
  },
  {
    name: "send meese to outer space",
    cost: 50000,
    rate: 100,
    units: 0,
    costUnit: "moose nostrils",
    description: "outer space: the final moose-tier",
  },
  {
    name: "research moose spaghettification",
    cost: 1000000,
    rate: 500,
    units: 0,
    costUnit: "moose tails",
    description: "come get your moose spaghetti!",
  },
];

// DOM Elements
renderHtml();

// click handler
const button = document.getElementById("clicker")!;
const counter = document.getElementById("counter")!;
const rate = document.getElementById("rate")!;

// Event Listeners
button.addEventListener("click", () => {
  clickSound.play();
  click();
});

// FUNCTION CALLS
registerButtonClick();
requestAnimationFrame(step);

// FUNCTION DECLARATIONS

function click(amount: number = 1) {
  clicks += amount;
  counter.innerHTML = clicks.toFixed(0);
  checkUpgrades();
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

// Upgrade Logic
function checkUpgrades() {
  availableItems.forEach((item) => {
    const buyButton = document.getElementById(item.name);
    if (buyButton) {
      if (clicks >= item.cost) {
        buyButton.removeAttribute("disabled");
      } else if (!buyButton?.hasAttribute("disabled")) {
        buyButton.setAttribute("disabled", "true");
      }
    }
  });
}

function buyUpgrade(cost: number, unitsPerSec: number) {
  clickSound.play();
  clicks -= cost;
  autoClicks += unitsPerSec;
  counter.innerHTML = clicks.toFixed(0);
  rate.innerHTML = autoClicks.toFixed(1);
}

function createUpgradeButtons() {
  let htmlContent: string = "";
  availableItems.forEach((item) => {
    htmlContent +=
      `<button title="${item.description}" id="${item.name}" class="upgrade-button" disabled>${item.name} (+${
        item.rate.toFixed(1)
      } meese/sec)</button>`;
    htmlContent +=
      `<div class="label-text">cost: <span id="${item.name}-cost">${item.cost}</span> ${item.costUnit}</div>`;
    htmlContent +=
      `<div class="label-text">purchased: <span id="${item.name}-units">${item.units}</span> units</div>`;
    htmlContent += `<br>`;
  });
  return htmlContent;
}

function registerButtonClick() {
  availableItems.forEach((item) => {
    const buyButton = document.getElementById(item.name);
    if (buyButton) {
      buyButton.addEventListener("click", () => {
        const unitLabel = document.getElementById(item.name + "-units");
        const costLabel = document.getElementById(item.name + "-cost");
        buyUpgrade(item.cost, item.rate);
        item.units++;
        item.cost *= 1.15;
        if (unitLabel && costLabel) {
          unitLabel.innerHTML = `${item.units}`;
          costLabel.innerHTML = item.cost.toFixed(0);
        }
      });
    }
  });
}

function renderHtml() {
  document.body.style.backgroundImage = `url(${backgroundImg})`;
  document.body.style.backgroundSize = "cover";
  document.body.innerHTML = `
    <audio autoplay loop>
      <source src= "${gameMusic}" type="audio/mp3">
    </audio>
    <h1>meese explosion factory.</h1>
    <div class="row">
      <div class="column">
        <button id="clicker"><img src="${buttonImg}" class="main-button"></button>
        <div>click moose to explode it.</div>
        <br>
        <div class="content-text"><span id="counter">0</span> meese blown to smithereens</div>
        <div class="label-text">obliter-rate-ion: <span id="rate">0</span> meese/sec</div>
      </div>
      <div class="column">
        ${createUpgradeButtons()}
      </div>
    </div>
  `;
}
