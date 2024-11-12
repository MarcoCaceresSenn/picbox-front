import ImageCard from './ImageCard.vue'

describe('<ImageCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ImageCard)
  })
})