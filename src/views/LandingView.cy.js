import LandingView from './LandingView.vue'

describe('<LandingView />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(LandingView)
  })
})