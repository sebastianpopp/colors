import './style.css';
import Alpine from 'alpinejs';
import Color from './Color';

Alpine.data('colors', () => ({
  query: '',
  color: null,

  init() {
    this.query = '';

    this.$nextTick(() => {
      this.$refs.query.focus();
      this.$refs.query.setSelectionRange(0, this.$refs.query.value.length);
    });

    Alpine.effect(() => {
      this.color = Color.fromString(this.query);

      this.updateFavicon();

      document.title = this.color ? `${this.color.toName()} - Colors` : 'Colors';

      if (this.query !== '' && this.color !== null) {
        window._paq = window._paq || [];
        _paq.push(['trackSiteSearch',
          this.query,
          false,
          this.color === null ? 0 : 1
        ]);
      }
    });
  },

  updateFavicon() {
    const favicon = document.querySelector('link[rel="icon"]');

    if (!favicon) {
      return;
    }

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="12" fill="${this.color ? this.color.toHex() : 'none'}" stroke="#e5e7eb" stroke-width="2" />
      </svg>
    `;

    favicon.href = `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;
  },

  copy() {
    const value = this.$el.innerText;

    navigator.clipboard.writeText(value);
    this.$el.setAttribute('tooltip', 'Copied!');
    setTimeout(() => this.$el.setAttribute('tooltip', 'Click to copy'), 2000);
  }
}));

Alpine.start();
