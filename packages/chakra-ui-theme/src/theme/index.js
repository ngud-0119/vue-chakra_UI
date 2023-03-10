import colors from './colors'
import typography from './typography'
import borders, { borderWidths } from './borders'
import opacity from './opacity'
import radii from './radii'
import shadows from './shadows'
import sizes, { baseSizes } from './sizes'
import zIndices from './z-indices'
import breakpoints from './breakpoints'

const space = baseSizes

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
  cssVarPrefix: 'chakra'
}

const theme = {
  breakpoints,
  zIndices,
  radii,
  opacity,
  borders,
  colors,
  ...typography,
  borderWidths,
  sizes,
  shadows,
  space,
  config
}

export default theme
