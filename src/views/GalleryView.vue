<template>
    <div class="gallery-container p-6">
        <h1 class="text-3xl font-bold text-center mb-6">Galería de Imágenes</h1>

        <!-- Botón para redirigir a la vista de carga de imágenes -->
        <div class="text-center mb-6">
            <router-link to="/upload-image">
                <button class="bg-brown hover:bg-brownest text-white px-6 py-2 rounded-md transition-colors">
                    Crear Imagen
                </button>
            </router-link>
        </div>

        <!-- Lista de imágenes cargadas utilizando Tailwind Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <ImageCard v-for="image in images" :key="image.id" :imageUrl="image.url" :altText="image.title"
                :tags="image.tags" />
        </div>

        <!-- Mensaje mientras se cargan las imágenes -->
        <div v-if="loading" class="text-center">
            <p>Cargando imágenes...</p>
        </div>

        <!-- Mensaje de error si no se pueden cargar las imágenes -->
        <div v-if="error" class="text-center text-red-500">
            <p>Error al cargar imágenes. Intenta nuevamente.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ImageCard from '@/molecules/ImageCard.vue';

const images = ref([]);
const loading = ref(true);
const error = ref(false);

// Función para cargar las imágenes desde la API
const loadImages = async () => {
    try {
        const response = await axios.get('http://localhost:3000/images'); // URL de tu API
        images.value = response.data;
        loading.value = false;
        console.log('Imágenes cargadas:', images.value);
    } catch (err) {
        console.error('Error al cargar las imágenes:', err);
        error.value = true;
        loading.value = false;
    }
};

// Cargar las imágenes cuando el componente se monte
onMounted(() => {
    loadImages();
});
</script>

<style scoped>
.gallery-container {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
