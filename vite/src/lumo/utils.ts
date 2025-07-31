function walk(el: Element, callback: (el: Element) => boolean | void) {
  if (callback(el) === false) return;

  let node = el.firstElementChild;
  while (node) {
    walk(node, callback);
    node = node.nextElementSibling;
  }
}

function findControllers(element: HTMLDivElement) {
  const roots = [...element.querySelectorAll(`[v-controller]`)].filter(
    (root) => !root.matches(`[v-controller] [v-controller]`)
  )

  return roots;
}

export { walk, findControllers }