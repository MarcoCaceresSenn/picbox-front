<template>
    <div class="min-h-screen mt-16 p-6 flex justify-center">
        <BackGalleryButton />

        <div class="bg-white p-10 rounded-lg w-full max-w-lg">
            <h2 class="text-3xl font-semibold text-center text-gray-900 mb-6">Editar Imagen</h2>

            <form @submit.prevent="updateImage" class="space-y-6">
                <div>
                    <label for="title" class="block text-lg font-medium text-gray-700">Título de la imagen</label>
                    <input v-model="image.title" type="text" id="title" placeholder="Ingresa el título"
                        class="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required />
                </div>

                <div>
                    <label for="tags" class="block text-lg font-medium text-gray-700">Tags (separados por coma)</label>
                    <input v-model="image.tags" type="text" id="tags" placeholder="Ej: Tag1, Tag2"
                        class="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required />
                </div>

                <!-- Botón para actualizar la imagen -->
                <div class="flex justify-center">
                    <button type="submit"
                        class="w-full py-3 px-6 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition-colors">
                        Actualizar Imagen
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import BackGalleryButton from '@/atoms/BackGalleryButton.vue';

const image = ref({ title: '', tags: '' });
const route = useRoute();
const router = useRouter();

// Cargar la imagen por ID cuando el componente se monta
const loadImage = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/images/${id}`);
        if (response.data) {
            image.value = response.data;
        } else {
            console.warn('No se encontró la imagen con el ID:', id);
        }
    } catch (err) {
        console.error('Error al obtener la imagen:', err);
    }
};

onMounted(() => {
    const id = route.params.id;
    loadImage(id);
});

// Función para actualizar la imagen
const updateImage = async () => {
    const id = route.params.id;
    try {
        const updatedImage = {
            title: image.value.title,
            tags: image.value.tags.split(',').map(tag => tag.trim()), // Dividir tags separados por coma
            // enviar los datos que se mantienen iguales
            url: image.value.url,
            format: image.value.format,
            resolution: image.value.resolution,
        };
        await axios.put(`http://localhost:3000/images/${id}`, updatedImage);
        console.log('Imagen actualizada exitosamente');
        router.push({ name: 'Gallery' }); // Redirigir después de actualizar
    } catch (err) {
        console.error('Error al actualizar la imagen:', err);
        alert('Hubo un error al intentar actualizar la imagen');
    }

};
</script>

<style scoped>
/* Aquí van los estilos específicos para este componente */
</style>
