import Layout from './Layout.vue'

describe('<Layout />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(Layout)
  })
})