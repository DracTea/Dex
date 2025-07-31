import { Controller } from "lumo";

export default class extends Controller {
  static targets = ["name", "output"]

  connect() {
    console.log("Hello controller connected");
  }

  disconnect() {
    console.log("Hello controller disconnected");
  }

  greet() {
    console.log("Greet method called", this.$el);
    // this.outputTarget.textContent =
    //   `Hello, ${this.nameTarget.value}!`
  }
}