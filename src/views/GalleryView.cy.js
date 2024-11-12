import GalleryView from './GalleryView.vue'

describe('<GalleryView />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(GalleryView)
  })
})