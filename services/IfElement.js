class IfElement extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'value'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._originalContent = this.innerHTML.trim();
  }

  connectedCallback() {
    // Update display initially
    this.updateDisplay();

    // Listen for changes in radio button selection
    const radios = document.querySelectorAll(`input[name="${this.name}"]`);
    radios.forEach(radio => {
      radio.addEventListener('change', this.updateDisplay.bind(this));
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[name] = newValue;
    this.updateDisplay();
  }

  updateDisplay() {
    const selector = `input[name="${this.name}"][value="${this.value}"]`;
    const radio = document.querySelector(selector);
    
    if (radio && radio.checked) {
      this.shadowRoot.innerHTML = this._originalContent;
      this.style.display = 'block';
    } else {
      this.shadowRoot.innerHTML = '';
      this.style.display = 'none';
    }
  }
}

customElements.define('nk-if', IfElement);
export default IfElement;
