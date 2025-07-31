import type Block from "../block";
import type Context from "../context";


const action = (el: HTMLDivElement, value: string, controller: any, parentEl: Block, ctx: Context) => {
  const [event, actions] = value.split('->');
  const action = actions.split('#');

  const callback = () => {
    if (parentEl.contr[action[1]]) {
      parentEl.contr[action[1]]();
    }
  }

  el.addEventListener(event, callback);
  // el.removeEventListener(event, callback);
}

export default action;