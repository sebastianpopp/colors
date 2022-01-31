import Alpine from 'alpinejs';
import ColorParser from './ColorParser';

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
    // this.query = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

    this.$nextTick(() => {
      this.$refs.query.focus();
      this.$refs.query.setSelectionRange(0, this.$refs.query.value.length);
    });

    Alpine.effect(() => {
      const colorParser = new ColorParser(this.query);

      this.color = colorParser.isColor()
        ? colorParser.getColor()
        : null;
    })
  },

  copy() {
    const value = this.$el.innerText;

    navigator.clipboard.writeText(value);

    this.$el.setAttribute('tooltip', 'Copied!');
    setTimeout(() => {
      this.$el.setAttribute('tooltip', 'Click to copy');
    }, 2000);
  }
}));

Alpine.start();
