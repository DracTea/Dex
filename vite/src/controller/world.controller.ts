import { Controller } from "lumo";

export default class extends Controller {
  static targets = ["name", "output"]

  connect() {
    console.log("World controller connected");
  }

  disconnect() {
    console.log("World controller disconnected");
  }

  greet() {
    // this.outputTarget.textContent =
    //   `Hello, ${this.nameTarget.value}!`
  }
}