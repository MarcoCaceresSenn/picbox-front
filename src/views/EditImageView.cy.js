import EditImageView from './EditImageView.vue'

describe('<EditImageView />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(EditImageView)
  })
})