/**
 * Hey! Welcome to @chakra-ui/vue Menu
 *
 * The `CModal` is a dialog window overlaid on either the primary window or another dialog
 *  window. Contents behind a modal dialog are **inert** meaning that users cannot
 * interact with content behind the dialog.
 *
 * @see Docs     https://vue.chakra-ui.com/modal
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CModal/CModal.js
 * @see A11y     https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CModal/accessibility.md
 */

import { hideOthers } from 'aria-hidden'
import { FocusTrap } from 'focus-trap-vue'
import isFunction from 'lodash-es/isFunction'
import { useId, canUseDOM, getElById, isVueComponent, getElement, getFocusables, cleanChildren, forwardProps, wrapEvent } from '../utils'
import { baseProps } from '../config'
import styleProps from '../config/props'

import { CFade } from '../CTransition'
import CPortal from '../CPortal'
import CBox from '../CBox'
import CPseudoBox from '../CPseudoBox'
import CCloseButton from '../CCloseButton'
import props from './utils/modal.props'

/**
 * CModal component
 *
 * The wrapper for `CModal` components. It provides context and state for the modal.
 *
 * @extends CPortal
 * @see Docs https://vue.chakra-ui.com/modal
 */
const CModal = {
  name: 'CModal',
  props,
  data () {
    return {
      addAriaLabelledby: false,
      addAriaDescribedby: false,
      modalNode: undefined,
      contentNode: undefined
    }
  },
  provide () {
    return {
      $ModalContext: () => this.ModalContext
    }
  },
  computed: {
    _id () {
      return this.id || useId(4)
    },
    contentId () {
      return this.formatIds(this._id).content
    },
    headerId () {
      return this.formatIds(this._id).header
    },
    bodyId () {
      return this.formatIds(this._id).body
    },
    modalId () {
      return `modal-${this._id}`
    },
    portalTarget () {
      return `#modal-portal-${this._id}`
    },
    ModalContext () {
      return {
        isOpen: this.isOpen,
        initialFocusRef: this.initialFocusRef,
        onClose: this.onClose,
        blockScrollOnMount: this.blockScrollOnMount,
        closeOnEsc: this.closeOnEsc,
        closeOnOverlayClick: this.closeOnOverlayClick,
        returnFocusOnClose: this.returnFocusOnClose,
        contentNode: this.contentNode,
        scrollBehavior: this.scrollBehavior,
        isCentered: this.isCentered,
        size: this.size,
        headerId: this.headerId,
        bodyId: this.bodyId,
        contentId: this.contentId,
        addAriaLabelledby: this.addAriaLabelledby,
        addAriaDescribedby: this.addAriaDescribedby
      }
    }
  },
  mounted () {
    if (typeof this.addAriaLabels === 'object') {
      this.addAriaLabelledby = this.addAriaLabels.header
      this.addAriaDescribedby = this.addAriaLabels.body
    }

    if (typeof this.addAriaLabels === 'boolean') {
      this.addAriaLabelledby = this.addAriaLabels
      this.addAriaDescribedby = this.addAriaLabels
    }

    this.$nextTick(() => {
      this.modalNode = getElById(this.modalId)
    })

    /**
     * Escape key press event handler for modal
     * @param {Event} event Keyboard Event
     */
    const handler = (event) => {
      if (event.key === 'Escape' && this.closeOnEsc) {
        this.onClose(event, 'pressedEscape')
      }
    }

    this.$watch(vm => [vm.isOpen, vm.blockScrollOnMount], () => {
      if (this.isOpen && !this.closeOnOverlayClick) {
        canUseDOM && document.addEventListener('keydown', handler)
      } else {
        document.addEventListener('keydown', handler)
      }
    })

    this.$watch('isOpen', () => {
      if (!this.isOpen) {
        document.removeEventListener('keydown', handler)
      }
    })

    let undoAriaHidden = null
    this.$watch(vm => [vm.isOpen, vm.useInert], () => {
      const mountNode = this.mountNode
      if (this.isOpen && canUseDOM) {
        if (this.useInert) {
          undoAriaHidden = hideOthers(mountNode)
        }
        this.contentNode = getElById(this.contentId)
      } else if (this.useInert && undoAriaHidden != null) {
        undoAriaHidden()
      }
    })
  },
  methods: {
    /**
     * Handles focus trap activation
     */
    activateFocusLock () {
      setTimeout(() => {
        if (this.initialFocusRef) {
          const initialFocusRef = isFunction(this.initialFocusRef)
            ? this.getNode(this.initialFocusRef())
            : this.getNode(this.initialFocusRef)

          if (initialFocusRef) {
            initialFocusRef.focus()
          }
        } else {
          const contentNode = getElById(this.contentId)
          if (contentNode) {
            const focusables = getFocusables(contentNode)
            if (focusables.length === 0) {
              contentNode.focus()
            } else {
              const [el] = focusables
              el && el.focus()
            }
          }
        }
      })
    },

    /**
     * Handles focus trap deactivation
     */
    deactivateFocusLock () {
      setTimeout(() => {
        if (this.finalFocusRef) {
          const finalFocusRef = isFunction(this.finalFocusRef)
            ? this.getNode(this.finalFocusRef())
            : this.getNode(this.finalFocusRef)

          if (finalFocusRef) {
            canUseDOM && finalFocusRef.focus()
          } else {
            console.warn(`[ChakraUI Modal]: Unable to locate final focus node "${this.finalFocusRef}".`)
          }
        }
      })
    },

    /**
     * Gets the HTML element for a component or selector
     * @param {Object|String} element Element or selector
     */
    getNode (element) {
      if (typeof element === 'object') {
        const isVue = isVueComponent(element)
        return isVue ? element.$el : element
      } else if (typeof element === 'string') {
        return getElement(element)
      }
      return null
    }
  },
  render (h) {
    const children = cleanChildren(this.$slots.default)

    return h(CPortal, {
      props: {
        append: true,
        target: this.portalTarget,
        disabled: false,
        slim: true,
        unmountOnDestroy: true,
        targetSlim: true
      },
      attrs: {
        'data-chakra-component': 'CModal'
      }
    }, [
      h(FocusTrap, {
        props: {
          returnFocusOnDeactivate: this.returnFocusOnClose && !this.finalFocusRef,
          active: this.isOpen
        },
        on: {
          activate: this.activateFocusLock,
          deactivate: this.deactivateFocusLock
        }
      }, [
        h(CPseudoBox, {
          props: {
            position: 'relative'
          },
          directives: [{
            name: 'scroll-lock',
            value: this.isOpen && this.blockScrollOnMount
          }]
        }, [
          h(CFade, {
            props: {
              enterEasing: 'easeInCubic',
              leaveEasing: 'easeOutCubic'
            }
          }, this.isOpen && [h('div', {
            style: {
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }
          }, children)])
        ])
      ])
    ])
  }
}

/**
 * CModalOverlay component
 *
 * The background overlay for the `CModal` component
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/modal
 */
const CModalOverlay = {
  name: 'CModalOverlay',
  props: baseProps,
  attrs: {
    'data-chakra-component': 'CModalOverlay'
  },
  render (h) {
    return h(CBox, {
      props: {
        pos: 'fixed',
        bg: 'rgba(0,0,0,0.4)',
        left: '0',
        top: '0',
        w: '100vw',
        h: '100vh',
        zIndex: 'overlay',
        ...forwardProps(this.$props)
      }
    })
  }
}

/**
 * CModalContent component
 *
 * The container for the CModal content
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/modal
 */
const CModalContent = {
  name: 'CModalContent',
  inheritAttrs: false,
  inject: ['$ModalContext', '$chakraColorMode'],
  props: {
    ...baseProps,
    noStyles: Boolean,
    zIndex: {
      type: String,
      default: 'modal'
    }
  },
  data () {
    return {
      colorModeStyles: {
        light: {
          bg: 'white',
          shadow: '0 7px 14px 0 rgba(0,0,0, 0.1), 0 3px 6px 0 rgba(0, 0, 0, .07)'
        },
        dark: {
          bg: 'gray.700',
          shadow: 'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px',
          color: 'whiteAlpha.900'
        }
      },
      wrapperStyle: {},
      contentStyle: {}
    }
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    context () {
      return this.$ModalContext()
    },
    boxStyleProps () {
      return this.colorModeStyles[this.colorMode]
    }
  },
  created () {
    const { isCentered, scrollBehavior } = this.context

    let wrapperStyle = {}
    let contentStyle = {}

    if (isCentered) {
      wrapperStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    } else {
      contentStyle = {
        top: '3.75rem',
        mx: 'auto'
      }
    }

    if (scrollBehavior === 'inside') {
      wrapperStyle = {
        ...wrapperStyle,
        maxHeight: 'calc(100vh - 7.5rem)',
        overflow: 'hidden',
        top: '3.75rem'
      }

      contentStyle = {
        ...contentStyle,
        height: '100%',
        top: 0
      }
    }

    if (scrollBehavior === 'outside') {
      wrapperStyle = {
        ...wrapperStyle,
        overflowY: 'auto',
        overflowX: 'hidden'
      }

      contentStyle = {
        ...contentStyle,
        my: '3.75rem',
        top: 0
      }
    }

    if (this.noStyles) {
      wrapperStyle = {}
      contentStyle = {}
    }

    this.wrapperStyle = wrapperStyle
    this.contentStyle = contentStyle
  },
  render (h) {
    const {
      onClose,
      bodyId,
      headerId,
      contentId,
      size,
      closeOnEsc,
      addAriaLabelledby,
      addAriaDescribedby,
      closeOnOverlayClick
    } = this.context

    return h(CBox, {
      props: {
        ...forwardProps(this.$props),
        ...this.wrapperStyle,
        pos: 'fixed',
        left: '0',
        top: '0',
        w: '100%',
        h: '100%',
        zIndex: this.zIndex || 'modal'
      },
      nativeOn: {
        click: (event) => {
          event.stopPropagation()
          if (closeOnOverlayClick) {
            onClose && onClose(event, 'clickedOverlay')
            this.$emit('clickedOverlay', event)
          }
        },
        keydown: (event) => {
          if (event.key === 'Escape') {
            event.stopPropagation()
            if (closeOnEsc) {
              onClose(event, 'pressedEscape')
            }
          }
        }
      },
      attrs: {
        'data-chakra-component': 'CModalContent'
      }
    }, [
      h(CBox, {
        props: {
          as: 'section',
          outline: 0,
          maxWidth: size,
          w: '100%',
          pos: 'relative',
          d: 'flex',
          flexDir: 'column',
          zIndex: this.zIndex,
          fontFamily: 'body',
          ...this.boxStyleProps,
          ...this.contentStyle,
          ...forwardProps(this.$props)
        },
        attrs: {
          role: 'dialog',
          'aria-modal': 'true',
          tabIndex: -1,
          id: contentId,
          ...(addAriaDescribedby && { 'aria-describedby': bodyId }),
          ...(addAriaLabelledby && { 'aria-labelledby': headerId }),
          ...this.$attrs
        },
        nativeOn: {
          click: wrapEvent(e => this.$emit('click', e), event => event.stopPropagation())
        }
      }, this.$slots.default)
    ])
  }
}

/**
 * CModalHeader component
 *
 * The header that labels the modal dialog
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/modal
 */
const CModalHeader = {
  name: 'CModalHeader',
  inject: ['$ModalContext'],
  props: baseProps,
  computed: {
    context () {
      return this.$ModalContext()
    }
  },
  render (h) {
    const { headerId } = this.context

    return h(CBox, {
      props: {
        as: 'header',
        px: 6,
        py: 4,
        position: 'relative',
        fontSize: 'xl',
        fontWeight: 'semibold',
        ...forwardProps(this.$props)
      },
      attrs: {
        id: headerId,
        'data-chakra-component': 'CModalHeader'
      }
    }, this.$slots.default)
  }
}

/**
 * CModalFooter component
 *
 * The footer that houses the modal actions
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/modal
 */
const CModalFooter = {
  name: 'CModalFooter',
  props: baseProps,
  render (h) {
    return h(CBox, {
      props: {
        as: 'footer',
        display: 'flex',
        px: 6,
        py: 4,
        justifyContent: 'flex-end',
        ...forwardProps(this.$props)
      },
      attrs: {
        'data-chakra-component': 'CModalFooter'
      }
    }, this.$slots.default)
  }
}

/**
 * CModalBody component
 *
 * The wrapper that houses the modal's main content
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/modal
 */
const CModalBody = {
  name: 'CModalBody',
  props: baseProps,
  inject: ['$ModalContext'],
  computed: {
    context () {
      return this.$ModalContext()
    }
  },
  render (h) {
    const { bodyId, scrollBehavior } = this.context

    let style = {}
    if (scrollBehavior === 'inside') {
      style = { overflowY: 'auto' }
    }

    return h(CBox, {
      props: {
        px: 6,
        py: 2,
        flex: 1,
        ...style,
        ...forwardProps(this.$props)
      },
      attrs: {
        id: bodyId,
        'data-chakra-component': 'CModalBody'
      }
    }, this.$slots.default)
  }
}

/**
 * CCloseButton component
 *
 * The button that closes the modal.
 *
 * @extends CCloseButton
 * @see Docs https://vue.chakra-ui.com/modal
 */
const CModalCloseButton = {
  name: 'CModalCloseButton',
  props: styleProps,
  inject: ['$ModalContext'],
  computed: {
    context () {
      return this.$ModalContext()
    }
  },
  render (h) {
    const { onClose } = this.context
    return h(CCloseButton, {
      props: {
        position: 'absolute',
        top: '8px',
        right: '12px',
        ...forwardProps(this.$props)
      },
      attrs: {
        'x-close-button': '',
        'data-chakra-component': 'CModalCloseButton'
      },
      on: {
        click: (e) => {
          wrapEvent(onClose, event => this.$emit('click', event))(e)
        }
      }
    })
  }
}

export {
  CModal,
  CModalOverlay,
  CModalContent,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CModalCloseButton
}
