import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter: number = 0;

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

setInterval(click, 1000);

function click() {
  counter++;
  counterElement.innerHTML = `${counter}`;
}
