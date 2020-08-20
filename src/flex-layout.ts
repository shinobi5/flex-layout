const getItem = (list: string, item: number = 0, char: string = ',') => 
  list && list.trim().split(char)[item];

class FlexLayout extends HTMLElement {
  static get observedAttributes() { 
    return [
      'breakpoints',
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }

  breakpointStyles() {
    const bpList = this.breakpoints ? this.breakpoints.trim().split(',') : [];
    const bps = bpList.map((bp: string, i: number) => (`
      @media screen and (min-width: ${bp}) {
        :host {}
      }
      `
    ));

    return bps.join('');
  }

  get breakpoints() {
    return this.getAttribute('breakpoints');
  }

  set breakpoints(newValue) {
    this.setAttribute('breakpoints', newValue);
  }

  render() {
    const template = `
      <style>
        :host {
          display: flex;
        }      
        ${this.breakpoints ? this.breakpointStyles() : ''}
      </style>
      <slot></slot>
    `;

    this.shadowRoot.innerHTML = template;
  }

  attributeChangedCallback(_: string, oldValue: string, newValue: string) {
    if(oldValue !== newValue) {
      this.render();
    }
  }
}

customElements.define('flex-layout', FlexLayout);