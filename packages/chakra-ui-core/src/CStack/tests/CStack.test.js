import { CStack, CBox, CHeading, CText } from '../..'
import { render, getTagName, screen, userEvent } from '@/tests/test-utils'

const renderComponent = (props) => {
  const inlineAttrs = (props && props.inlineAttrs) || ''
  const base = {
    components: { CStack, CBox, CHeading, CText },
    template: `
    <CStack data-testid="stack" ${inlineAttrs}>
      <CBox p="5" data-testid="stack-child-1" shadow="md" border-width="1px">
        <CHeading font-size="xl">Plan Money</CHeading>
        <CText mt="4">The future can be even brighter but a goal without a plan is just a wish</CText>
      </CBox>
      <CBox p="5" data-testid="stack-child-2" shadow="md" border-width="1px">
        <CHeading font-size="xl">Save Money</CHeading>
        <CText mt="4">You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings on your own terms with our completely automated process</CText>
      </CBox>
    </CStack>`,
    ...props
  }
  return render(base)
}

describe('CStack', () => {
  it('should render correctly', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render empty children correctly', () => {
    const { asFragment } = renderComponent({
      template: '<c-stack></c-stack>'
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should default to vertical stack', () => {
    renderComponent()
    const stack = screen.getByTestId('stack')
    expect(stack).toHaveStyle('display: flex')
    expect(stack).toHaveStyle('flex-direction: column')
  })

  it('should not space last child', () => {
    renderComponent()
    const stack = screen.getByTestId('stack')
    expect(stack).not.toHaveStyle('margin-bottom: 0.5rem')
  })

  it('should should stack horizontally if isInline', () => {
    const inlineAttrs = 'is-inline'
    renderComponent({ inlineAttrs })
    const stack = screen.getByTestId('stack')
    expect(stack).toHaveStyle('display: flex')
    expect(stack).toHaveStyle('flex-direction: row')
  })

  it('should should stack native html elements', () => {
    const { asFragment } = renderComponent({
      template: `
        <CStack data-testid="stack">
          <CText mt="4">The future can be even brighter but a goal without a plan is just a wish</CText>
          <p data-testid="stacked-p">I am a happy paragraph element</p>
          <h3 data-testid="stacked-h3">I am a jolly heading element</h3>
          <CText mt="4">You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings on your own terms with our completely automated process</CText>
        </CStack>
      `
    })

    expect(asFragment()).toMatchSnapshot()
  })

  // Cannot use `it.each` because it cannot accept
  // component as interpolated variable
  it.each`
    as
    ${'section'}
    ${'nav'}}
  `(
    'should render CStack with element as $as',
    ({ as }) => {
      const inlineAttrs = `as="${as}"`
      const { asFragment } = renderComponent({ inlineAttrs })
      const stack = screen.getByTestId('stack')
      expect(getTagName(stack)).toEqual(as)
      expect(asFragment()).toMatchSnapshot()
    }
  )

  it('should preserve inherited event listeners', async () => {
    const handleClick = jest.fn()
    renderComponent({
      inlineAttrs: '@click="handleClick"',
      methods: {
        handleClick
      }
    })

    await userEvent.click(screen.getByTestId('stack'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should preserve inherited event listeners with custom `as` component', async () => {
    const handleSubmit = jest.fn((event) => {
      expect(event.target).toBe(screen.getByTestId('stack-as-form'))
    })
    renderComponent({
      template: `
        <CStack as="form" @submit.prevent="handleSubmit" data-testid="stack-as-form">
          <input value="some-value" name="some-key" />
          <button type="submit" value="submit" data-testid="form-submit-btn" />
        </CStack>
      `,
      methods: {
        handleSubmit
      }
    })

    await userEvent.click(screen.getByTestId('form-submit-btn'))
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
})
