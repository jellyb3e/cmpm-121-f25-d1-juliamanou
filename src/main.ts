import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter = 0;

document.body.innerHTML = `
  <h1>meese explosion factory.</h1>
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
  <button id="moots">🫎</button>
  <div>meese exploded: <span id="counter">0</span></div>
`;

// click handler
const button = document.getElementById("moots")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  counter++;
  counterElement.innerHTML = `${counter}`;
});
