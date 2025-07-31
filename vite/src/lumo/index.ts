import Controller from './controller';
import Context from './context';
import Block from './block';
import { findControllers } from './utils';

function setupLumo(element: HTMLDivElement) {
  let rootBlocks = [];
  let ctx = new Context(element);

  const roots = findControllers(element);
  rootBlocks = roots.map((el) => ctx.initBlock(el));
}

export { setupLumo, Controller, Context, Block }