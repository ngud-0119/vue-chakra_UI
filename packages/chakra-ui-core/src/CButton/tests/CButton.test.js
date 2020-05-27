import { CButton } from '../..'
import { render } from '@/tests/test-utils'

const renderComponent = (props) => {
  const base = {
    components: {
      CButton
    },
    template: '<CButton>Works</CButton>',
    ...props
  }
  return render(base)
}

it('should render correctly', () => {
  const { asFragment } = renderComponent()
  expect(asFragment()).toMatchSnapshot()
})

it('should display children', () => {
  const { getByText } = renderComponent({ template: '<CButton><span>Works</span></CButton>' })
  expect(getByText('Works')).toBeInTheDocument()
})

it('should display button with left icon', () => {
  const { container, asFragment } = renderComponent({ template: '<CButton leftIcon="email">Email</CButton>' })
  expect(container.querySelector('button > svg')).toBeInTheDocument()
  expect(asFragment()).toMatchSnapshot()
})

it('should display button with right icon', () => {
  const { container, asFragment } = renderComponent({ template: '<CButton rightIcon="email">Email</CButton>' })
  expect(container.querySelector('button > svg')).toBeInTheDocument()
  expect(asFragment()).toMatchSnapshot()
})

it('should display spinner and hide text', () => {
  const { getByTestId, container } = renderComponent({ template: '<CButton isLoading data-testid="btn">CButton</CButton>' })
  const button = getByTestId('btn')

  expect(button).toHaveAttribute('disabled')
  expect(button).toHaveAttribute('aria-disabled', 'true')

  const spinner = container.querySelector('[data-chakra-component=CSpinner]')
  expect(spinner).toBeInTheDocument()
  expect(button).toHaveStyle('opacity: 0.4')
})

it('should display spinner with text', () => {
  const { getByText, container } = renderComponent({ template: '<CButton isLoading loadingText="Submitting" data-testid="Spinner">Button</CButton>' })

  expect(getByText('Submitting')).toBeInTheDocument()
  const spinner = container.querySelector('[data-chakra-component=CSpinner]')
  expect(spinner).toBeInTheDocument()
})

it('should display a disabled button', () => {
  const { getByText } = renderComponent({ template: '<CButton isDisabled>Button</CButton>' })

  expect(getByText('Button')).toHaveAttribute('disabled')
})
