import Box from '../Box'
import { baseProps } from '../config/props'
import { forwardProps } from '../utils'

const Divider = {
  name: 'Divider',
  props: {
    ...baseProps,
    orientation: {
      type: String,
      default: 'horizontal'
    }
  },
  render (h) {
    const borderProps =
      this.orientation === 'vertical'
        ? { borderLeft: '0.0625rem solid', height: 'auto', mx: 2 }
        : { borderBottom: '0.0625rem solid', width: 'auto', my: 2 }

    return h(Box, {
      props: {
        ...forwardProps(this.$props),
        ...borderProps,
        as: 'hr',
        border: 0,
        opacity: 0.6,
        borderColor: 'inherit'
      },
      attrs: {
        'aria-orientation': this.orientation
      }
    })
  }
}

export default Divider
