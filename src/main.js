import './style.css';
import Alpine from 'alpinejs';
import ColorParser from './ColorParser';

function updateFavicon(color) {
  const favicon = document.querySelector('link[rel="icon"]');

  if (!favicon) {
    return;
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="12" fill="${color ? color.toHex() : 'none'}" stroke="#e5e7eb" stroke-width="2" />
    </svg>
  `;

  favicon.href = `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;
}

Alpine.data('colors', () => ({
  query: '',
  color: null,

  init() {
    const colors = [
      '#051e3e',
      '#251e3e',
      '#451e3e',
      '#651e3e',
      '#851e3e',
      '#fe4a49',
      '#2ab7ca',
      '#fed766',
      '#e6e6ea',
      '#f4f4f8',
    ];
    this.query = colors[Math.floor(Math.random() * colors.length)];

    this.$nextTick(() => {
      this.$refs.query.focus();
      this.$refs.query.setSelectionRange(0, this.$refs.query.value.length);
    });

    Alpine.effect(() => {
      const colorParser = new ColorParser(this.query);

      this.color = colorParser.isColor()
        ? colorParser.getColor()
        : null;

      updateFavicon(this.color);

      if (this.query !== '' && !colors.includes(this.query)) {
        window._paq = window._paq || [];
        _paq.push(['trackSiteSearch',
          this.query,
          false,
          this.color === null ? 0 : 1
        ]);
      }
    });
  },

  copy() {
    const value = this.$el.innerText;

    navigator.clipboard.writeText(value);
    this.$el.setAttribute('tooltip', 'Copied!');
    setTimeout(() => this.$el.setAttribute('tooltip', 'Click to copy'), 2000);
  }
}));

Alpine.start();
