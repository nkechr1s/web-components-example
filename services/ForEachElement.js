class ForEachElement extends HTMLElement {
  static get observedAttributes() {
    return ['items', 'template'];
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    const template = document.getElementById(this.getAttribute('template'));
    this.templateContent = template.innerHTML;
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this.render();
  }

  render() {
    const items = JSON.parse(this.getAttribute('items') || '[]');
    
    // Clear previous content
    this.shadowRoot.innerHTML = '';

    items.forEach((item, index) => {
      // Create a new instance of the template
      let instanceHTML = this.templateContent;

      // Replace placeholders with actual values
      instanceHTML = instanceHTML.replace(/{{index}}/g, index + 1);
      instanceHTML = instanceHTML.replace(/{{item\.(.*?)}}/g, (_, prop) => item[prop]);

      // Create a new DOM element from the instanceHTML
      const instance = document.createElement('div');
      instance.innerHTML = instanceHTML;

      // Append the new element to the shadow DOM
      this.shadowRoot.appendChild(instance);
    });
  }
}

customElements.define('nk-for-each', ForEachElement);

export default ForEachElement;
