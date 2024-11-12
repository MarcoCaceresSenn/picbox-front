import Logo from './Logo.vue'

describe('<Logo />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(Logo)
  })
})