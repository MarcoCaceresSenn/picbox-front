import ImageDetailView from './ImageDetailView.vue'

describe('<ImageDetailView />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ImageDetailView)
  })
})