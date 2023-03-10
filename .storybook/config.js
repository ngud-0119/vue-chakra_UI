import { configure, addDecorator, addParameters } from '@storybook/vue';
import Vue from 'vue'
import VueLive from 'vue-live'
import Lorem from 'vue-lorem-ipsum'
import Chakra, { mode } from '../packages/chakra-ui-core/src'
import Canvas from './components/Canvas.vue'
import storyBookTheme from './theme'

import {
  feAnchor,
  fePlus,
  feShoppingBag,
  feCalendar,
  feShoppingCart,
  feChevronLeft,
  feStar,
  feUserMinus,
  feCheckCircle,
  feSettings,
  feLock,
  feEye,
  feSearch,
  feEyeOff,
  feGithub,
  feAirplay,
  feCloudRain,
  feUploadCloud,
  feMap,
  feSend,
  feServer
} from 'feather-icons-paths'

Vue.use(Chakra, {
  extendTheme: {
    baseStyles: {
      // CButton: ({ colorMode, theme }) => ({
      //   bg: mode('tomato', 'hotpink'),
      //   borderRadius: "lg",
      //   shadow: 'xl'
      // })
    }
  },
  icons: {
    iconSet: {
      feAnchor,
      fePlus,
      feShoppingBag,
      feCalendar,
      feShoppingCart,
      feChevronLeft,
      feStar,
      feUserMinus,
      feCheckCircle,
      feSettings,
      feLock,
      feEye,
      feSearch,
      feEyeOff,
      feGithub,
      feAirplay,
      feCloudRain,
      feUploadCloud,
      feMap,
      feSend,
      feServer
    },
    extend: {
      discord: {
        path: `<path fill="currentColor" d="M297.216 243.2c0 15.616-11.52 28.416-26.112 28.416-14.336 0-26.112-12.8-26.112-28.416s11.52-28.416 26.112-28.416c14.592 0 26.112 12.8 26.112 28.416zm-119.552-28.416c-14.592 0-26.112 12.8-26.112 28.416s11.776 28.416 26.112 28.416c14.592 0 26.112-12.8 26.112-28.416.256-15.616-11.52-28.416-26.112-28.416zM448 52.736V512c-64.494-56.994-43.868-38.128-118.784-107.776l13.568 47.36H52.48C23.552 451.584 0 428.032 0 398.848V52.736C0 23.552 23.552 0 52.48 0h343.04C424.448 0 448 23.552 448 52.736zm-72.96 242.688c0-82.432-36.864-149.248-36.864-149.248-36.864-27.648-71.936-26.88-71.936-26.88l-3.584 4.096c43.52 13.312 63.744 32.512 63.744 32.512-60.811-33.329-132.244-33.335-191.232-7.424-9.472 4.352-15.104 7.424-15.104 7.424s21.248-20.224 67.328-33.536l-2.56-3.072s-35.072-.768-71.936 26.88c0 0-36.864 66.816-36.864 149.248 0 0 21.504 37.12 78.08 38.912 0 0 9.472-11.52 17.152-21.248-32.512-9.728-44.8-30.208-44.8-30.208 3.766 2.636 9.976 6.053 10.496 6.4 43.21 24.198 104.588 32.126 159.744 8.96 8.96-3.328 18.944-8.192 29.44-15.104 0 0-12.8 20.992-46.336 30.464 7.68 9.728 16.896 20.736 16.896 20.736 56.576-1.792 78.336-38.912 78.336-38.912z" fa-key="3" fill="currentColor"></path>`,
        viewBox: '0 0 496 512'
      }
    },
  }
})

addParameters({
  options: {
   theme: storyBookTheme,
   storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
 }
})

addDecorator(() => ({
  template: `
    <Canvas>
      <story/>
    </Canvas>
  `,
  components: { Canvas }
}));

// For playground
Vue.use(VueLive)

Vue.component('Lorem', Lorem)

function loadStories() {
  const req = require.context('../packages/chakra-ui-core/src', true, /\.stories\.(js|mdx)$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
