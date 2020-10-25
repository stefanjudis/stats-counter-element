class StatsCounter extends HTMLElement {
  constructor() {
    super();

    this.statsUrl = this.getAttribute('stats-url');

    if (!this.statsUrl) {
      throw new Error('please define `stats-url` attribute');
    }
  }

  connectedCallback() {
    this.views = null;
    this.isLoaded = false;

    this.fetchData();
    this.render();
  }

  async fetchData() {
    const response = await window.fetch(
      `${this.statsUrl}?path=${window.location.pathname}`
    );
    const { views } = await response.json();
    this.views = views;
    this.isLoaded = true;
    this.render();
  }

  render() {
    const { isLoaded, views } = this;

    this.innerHTML = `
      <dl class="${isLoaded ? 'is-loaded' : ''}">
        <dt>Views</dt>
        <dd>${views === null ? '...' : views}</dd>
      </dl>
    `;
  }
}
// Register custome element
customElements.define('stats-counter', StatsCounter);
