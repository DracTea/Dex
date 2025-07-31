import { setupLumo } from './lumo'
import './style.css'

setupLumo(document.querySelector<HTMLDivElement>('#app')!)

const removeEl = document.querySelector<HTMLButtonElement>('#remove');
removeEl!.addEventListener('click', () => {
  const hello = document.querySelector('[v-controller="hello"]');
  if (hello) hello.remove();
});

const addEl = document.querySelector<HTMLButtonElement>('#add');
addEl!.addEventListener('click', () => {
  const world = document.createElement('div');
  world.setAttribute('v-controller', 'world');
  world.innerHTML = `
      <input data-world-target="name" type="text">
      <button data-action="click->world#greet">Greet</button>
      <span data-world-target="output"></span>
  `;
  document.querySelector('#app')!.appendChild(world);
});