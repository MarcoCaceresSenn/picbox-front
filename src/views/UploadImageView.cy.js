import UploadImageView from './UploadImageView.vue'

describe('<UploadImageView />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(UploadImageView)
  })
})