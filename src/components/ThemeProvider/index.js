/**
 * @type {Object}
 */
const ThemeProvider = {
  name: 'ThemeProvider',
  props: {
    theme: {
      type: Object,
      default: () => null
    },
    colorMode: {
      type: String,
      default: 'light'
    }
  },
  provide () {
    return {
      $theme: () => this.theme,
      $colorMode: this.colorMode
    }
  },
  render: function () {
    return this.$slots.default
  }
}

export default ThemeProvider
