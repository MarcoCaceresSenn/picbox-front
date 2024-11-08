<template>
    <div v-if="image" class="min-h-screen mt-16 p-6 flex justify-center">
        <BackGalleryButton />

        <div class="flex gap-5 w-full max-w-screen-md overflow-hidden shadow-lg bg-white p-5 rounded-lg">
            <!-- Imagen a la izquierda -->
            <div class="w-full sm:w-2/3 max-h-96 overflow-hidden rounded-lg">
                <img :src="image.url" :alt="image.title" class="object-cover w-full h-full rounded-lg shadow-md" />
            </div>

            <!-- Información a la derecha -->
            <div class="w-full sm:w-1/3 overflow-auto">
                <h1 class="text-3xl font-semibold truncate">{{ image.title }}</h1>
                <p class="text-lg truncate">Formato: {{ image.format }}</p>
                <p class="text-lg truncate">Resolución: {{ image.resolution }}</p>

                <!-- Mostrar los tags -->
                <p class="text-lg truncate">Tags:
                    <span v-if="Array.isArray(image.tags) && image.tags.length > 0">
                        {{ image.tags.join(', ') }}
                    </span>
                    <span v-else>No hay tags</span>
                </p>

                <p class="text-lg truncate">URL: <a :href="image.url" class="text-blue-500" target="_blank">Ver
                        imagen</a></p>

                <!-- Botones -->
                <div class="mt-4 space-y-2">
                    <button @click="deleteImage"
                        class="w-full py-2 px-6 bg-red-500 text-white text-lg font-semibold rounded-md hover:bg-red-600 transition-colors">
                        Eliminar Imagen
                    </button>
                    <!-- Botón para editar la imagen -->
                    <button @click="editImage"
                        class="w-full py-2 px-6 bg-yellow-500 text-white text-lg font-semibold rounded-md hover:bg-yellow-600 transition-colors">
                        Editar Imagen
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Si la imagen aún no se ha cargado, mostramos un mensaje -->
    <div v-else class="text-center">Cargando imagen...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import BackGalleryButton from '@/atoms/BackGalleryButton.vue';

const image = ref(null);
const route = useRoute();
const router = useRouter();

const loadImage = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/images/${id}`);
        if (response.data) {
            console.log('Tags de la imagen cargada:', response.data.tags);
            if (typeof response.data.tags === 'string') {
                response.data.tags = response.data.tags.split(',').map(tag => tag.trim());
            }
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

const deleteImage = async () => {
    const id = route.params.id;
    try {
        await axios.delete(`http://localhost:3000/images/${id}`);
        console.log('Imagen eliminada exitosamente');
        router.push({ name: 'Gallery' });
    } catch (err) {
        console.error('Error al eliminar la imagen:', err);
        alert('Hubo un error al intentar eliminar la imagen');
    }
};

// Redirigir a la vista de edición
const editImage = () => {
    const id = route.params.id;
    router.push({ name: 'EditImage', params: { id } });
};
</script>

<style scoped>
/* Aquí van los estilos específicos para este componente */
</style>
