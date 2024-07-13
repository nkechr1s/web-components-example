class IfElement extends HTMLElement {
    static get observedAttributes() {
      return ['name', 'value'];
    }
    
    constructor() {
      super();
  
      this.attachShadow({mode: 'open'});
      const template = document.getElementById('nk-if');
      const clone = template.content.cloneNode(true);
      this.shadowRoot.appendChild(clone);    
    }
    
    connectedCallback() {
      document.addEventListener('change', () => {
        const selector = `[name="${this.name}"][value="${this.value}"]:checked`;
        const el = document.querySelector(selector);
        this.style.display = el ? "block" : null;
      });
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[name] = newValue;
        
    }
  }
  
  customElements.define('nk-if', IfElement);

  export default IfElement;