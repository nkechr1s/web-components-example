class ForEachElement extends HTMLElement {
    static get observedAttributes() {
      return ['items', 'template'];
    }
    
    constructor() {
      super();
  
      this.attachShadow({ mode: 'open' });
      const template = document.getElementById(this.getAttribute('template'));
      this.templateContent = template.content;
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
        const instance = this.templateContent.cloneNode(true);
        instance.querySelector('[data-nk-for-each-index]').innerText = index + 1;
        
        // Example: set text content for item
        instance.querySelector('[data-nk-for-each-item]').innerText = item.text;
  
        this.shadowRoot.appendChild(instance);
      });
    }
  }
  
  customElements.define('nk-for-each', ForEachElement);
  
  export default ForEachElement;
  