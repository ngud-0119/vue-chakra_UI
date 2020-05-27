/**
 * Hey! Welcome to @chakra-ui/vue Badge
 *
 * The Badge component is used to highlight an item's status for quick recognition.
 *
 * @see Docs     https://vue.chakra-ui.com/badge
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CBadge/CBadge.js
 */

import { forwardProps } from '../utils'
import { baseProps } from '../config/props'
import CBox from '../CBox'
import useBadgeStyles from './utils/badge.styles'

/**
 * CBadge component
 *
 * Used to highlight an item's status for quick recognition.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/badge
 */
const CBadge = {
  name: 'CBadge',
  inject: ['$chakraTheme', '$chakraColorMode'],
  props: {
    variant: {
      type: String,
      default: 'subtle'
    },
    variantColor: {
      type: String,
      default: 'gray'
    },
    ...baseProps
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    }
  },
  render (h) {
    const badgeStyleProps = useBadgeStyles({
      theme: this.$chakraTheme(),
      colorMode: this.colorMode,
      color: this.variantColor,
      variant: this.variant
    })

    return h(CBox, {
      props: {
        d: 'inline-block',
        textTransform: 'uppercase',
        fontSize: 'xs',
        fontFamily: 'body',
        px: 1,
        rounded: 'sm',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        ...badgeStyleProps,
        ...forwardProps(this.$props)
      },
      attrs: {
        'data-chakra-component': 'CBadge'
      }
    }, this.$slots.default)
  }
}

export default CBadge
