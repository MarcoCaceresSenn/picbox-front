import TagInput from './TagInput.vue'

describe('<TagInput />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(TagInput)
  })
})