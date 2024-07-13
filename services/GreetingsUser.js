class GreetingsUser extends HTMLElement {
  
    constructor() {
      super();
      this.name = 'Add user name';
    }
    
    // component attributes
    static get observedAttributes() {
      return ['name'];
    }
    
    // attribute change
    attributeChangedCallback(property, oldValue, newValue) {
  
      if (oldValue === newValue) return;
      this[ property ] = newValue;
      
    }
    
    // connect component
    connectedCallback() {
      this.textContent = `${ this.name }`;
    }
    
  }
  
  // register component
  customElements.define( 'nk-user', GreetingsUser );

  export default GreetingsUser;