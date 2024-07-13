class ForEachElement extends HTMLElement {
  static get observedAttributes() {
    return ["items"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._items = [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === "items") {
      this._items = JSON.parse(newValue || "[]");
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = "";

    const template = this.querySelector("template");
    if (!template) {
      console.error("Template not found inside <nk-for-each> element.");
      return;
    }

    const templateContent = template.innerHTML;
    const templateFragment = document.createElement("template");
    templateFragment.innerHTML = templateContent;

    const loopElements =
      templateFragment.content.querySelectorAll("[nk-for-each]");
    loopElements.forEach((loopElement) => {
      const loopExp = loopElement.getAttribute("nk-for-each");
      const [itemName, itemsName] = loopExp.split(" in ").map((s) => s.trim());

      const items = this._items;

      items.forEach((item, index) => {
        const clone = document.importNode(loopElement, true);
        this.bindData(clone, itemName, item);
        this.shadowRoot.appendChild(clone);
      });
    });
  }

  bindData(node, itemName, item) {
    const walker = document.createTreeWalker(
      node,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    while (walker.nextNode()) {
      const textNode = walker.currentNode;
      textNode.nodeValue = textNode.nodeValue.replace(
        new RegExp(`{{\\s*${itemName}\\.(\\w+)\\s*}}`, "g"),
        (_, prop) => item[prop]
      );
    }
  }
}

customElements.define("nk-for-each", ForEachElement);

export default ForEachElement;
