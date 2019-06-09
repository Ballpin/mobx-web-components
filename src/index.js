import "./styles.css";
import { observable, autorun } from "mobx";

class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "closed" });
  }

  @observable person = {
    firstName: "Matt",
    lastName: "Madison",
    age: 37,
    get fullName() {
      return this.firstName + " " + this.lastName;
    }
  };
  renderCount = 0;
  $destination = null;

  connectedCallback() {
    this.root.innerHTML = `
      <input id='nameInput' type='text' name='firstName' value='' placeholder='first name'/>
      <h1>Test</h1>
    `;
    this.$destination = this.root.querySelector("h1");
    this.init();
  }

  init() {
    autorun(() => {
      this.renderCount += 1;
      this.$destination.innerHTML =
        this.person.fullName + " render count: " + this.renderCount;
    });

    this.root.getElementById("nameInput").addEventListener("keyup", e => {
      this.person.firstName = e.target.value;
    });
  }
}

customElements.define("my-comp", MyComponent);

document.getElementById("app").innerHTML = `<my-comp></my-comp>
`;
