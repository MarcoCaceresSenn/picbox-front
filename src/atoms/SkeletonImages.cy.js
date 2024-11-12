import SkeletonImages from './SkeletonImages.vue'

describe('<SkeletonImages />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(SkeletonImages)
  })
})