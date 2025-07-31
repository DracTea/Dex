import { findControllers } from "./utils";
import { Block } from 'lumo';

type CleanupCallbacks = {
  el: Element | DocumentFragment;
  fn: () => void
};


class Context {
  private controllers: { [key: string]: any } = {};
  private blocks: Block[] = [];
  private observer: MutationObserver;
  // private cleanupCallbacks: CleanupCallbacks[] = []

  constructor(root: HTMLDivElement) {
    this.controllers = import.meta.glob('../controller/**/*.controller.ts', { eager: false, import: 'default' });

    const callback = () => {
      console.log("Mutation observed");

      let remove: number[] = [];
      this.blocks.forEach((blk, indx) => {
        if (blk.el && !root.contains(blk.el)) {
          blk.teardown();
          remove.push(indx);
        }
      });

      this.blocks = this.blocks.filter((_, indx) => !remove.includes(indx));

      const cnt = findControllers(root);
      for (const el of cnt) {
        let registered = this.blocks.find(blk => blk.el === el);
        if (registered) continue;
        this.initBlock(el);
      }
    };

    this.observer = new MutationObserver(callback);
    this.observer.observe(root, { characterData: true, childList: true, subtree: true });

  }

  async initBlock(el: Element) {
    this.blocks.push(new Block(el, this, true));
  }

  async initController(args: { [key: string]: any }, el: Element) {
    const fn = this.controllers[`../controller/${args['v-controller']}.controller.ts`] || null;
    if (!fn) {
      console.warn(`Controller not found for ${args['v-controller']}`);
      return null;
    }


    const c = await fn();
    const controller = new c(el, args);

    controller.constructor.named = args['v-controller'];
    if (typeof controller.connect === 'function') {
      controller.connect();
    }

    // this.observer.observe(el, { characterData: true, childList: true, subtree: true });
    // this.cleanupCallbacks.push({ el: el, fn: () => controller.disconnect && controller.disconnect() });
    return controller;
  }
}

export default Context;