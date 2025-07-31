
class Controller {
  private $el: Element;
  private $args: { [key: string]: any };

  constructor(el: Element, args: { [key: string]: any }) {
    this.$el = el;
    this.$args = args;
  }
}

export default Controller;