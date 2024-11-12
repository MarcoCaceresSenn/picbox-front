import { mount } from '@cypress/vue'
import ImageDetailView from './ImageDetailView.vue'
import { createRouter, createWebHistory } from 'vue-router'

describe('<ImageDetailView />', () => {
  it('renders and loads image data correctly', () => {
    // Simular la llamada a la API para cargar los datos de la imagen
    cy.intercept('GET', 'http://localhost:3000/images/1', {
      statusCode: 200,
      body: {
        id: 1,
        url: 'https://example.com/image.jpg',
        title: 'Test Image',
        format: 'JPEG',
        resolution: '1920x1080',
        tags: ['tag1', 'tag2']
      }
    }).as('getImage')

    // Configurar el enrutador de Vue para el test
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/images/:id',
          name: 'ImageDetail',
          component: ImageDetailView
        },
      ]
    })

    // Montar el componente de Vue con el enrutador simulado
    mount(ImageDetailView, {
      global: {
        plugins: [router]
      },
      props: {
        // Puedes pasar props si es necesario
      }
    })

    // Navegar a la ruta de detalle de la imagen con el id 1
    router.push('/images/1')
    cy.wait('@getImage') // Esperar la llamada interceptada

    // Verificar que la imagen se renderizó correctamente
    cy.get('img').should('have.attr', 'src', 'https://example.com/image.jpg')
    cy.get('h1').should('contain', 'Test Image')
    cy.get('p').should('contain', 'Formato: JPEG')
    cy.get('p').should('contain', 'Resolución: 1920x1080')
    cy.get('p').should('contain', 'Tags: tag1, tag2')

    // Verificar los botones
    cy.contains('Eliminar Imagen')
    cy.contains('Editar Imagen')
  })
})
