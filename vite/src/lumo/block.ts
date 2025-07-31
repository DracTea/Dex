import { Context } from 'lumo';
import { walk } from './utils';
import directives from './directives';

class Block {
  private template: Element | DocumentFragment
  private isFragment: boolean
  private props: { [k: string]: any } = {}
  private controller?: any

  get el() {
    return (this.template as Element)
  }

  get contr() {
    return this.controller;
  }

  constructor(template: Element, ctx: Context, isRoot = false) {
    this.template = template;
    this.isFragment = template instanceof HTMLTemplateElement


    const attributes = template.getAttributeNames();
    attributes.forEach(attr => {
      this.props[attr] = template.getAttribute(attr);
    });

    if (attributes.includes('v-controller')) {
      ctx.initController(this.props, this.el).then((c) => {
        this.controller = c;

        console.log('Controller initialized:', this.el);
        walk(this.el, (el: Element) => {
          // console.log('walk el', el, el.getAttributeNames());
          if (el.hasAttribute('v-controller') && el !== this.el) {
            ctx.initBlock(el);
            return false;
          }

          const attributes = el.getAttributeNames();
          for (const attr of attributes) {
            if (!attr.startsWith('v-')) continue;
            const directiveName = attr.slice(2);
            const directive = directives[directiveName];
            if (!directive) continue;

            directive(el, el.getAttribute(attr), c, this, ctx);
          }
        });
      });
    }
  }

  async teardown() {
    if (this.controller) {
      if (typeof this.controller.disconnect === 'function') {
        this.controller.disconnect();
      }

      this.controller = undefined;
    }
  }

}

export default Block;