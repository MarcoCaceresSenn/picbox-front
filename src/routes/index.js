import { createRouter, createWebHistory } from 'vue-router';


export const routes = [
    {
        name: 'Landing',
        path: '/',
        component: () => import('../views/LandingView.vue'),
    },
    {
        name: 'Gallery',
        path: '/gallery',
        component: () => import('../views/GalleryView.vue'),
    },
    {
        name: 'Upload',
        path: '/upload-image',
        component: () => import('../views/UploadImageView.vue'),
    },
    {
        name: 'ImageDetails',
        path: '/image-details/:id',
        component: () => import('../views/ImageDetailView.vue'),
    },
    {
        name: 'EditImage',
        path: '/edit-image/:id',
        component: () => import('../views/EditImageView.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;