<template>
    <div class="flex justify-center">
        <BackGalleryButton />
        <div class="bg-white p-10 rounded-lg">
            <h2 class="text-3xl font-semibold text-center text-gray-900 mb-6">Subir Imagen</h2>

            <!-- Formulario para cargar la imagen -->
            <form @submit.prevent="uploadImage" class="space-y-6">
                <!-- Campo de título de la imagen -->
                <div>
                    <label for="title" class="block text-lg font-medium text-gray-700">Título de la imagen</label>
                    <input v-model="title" type="text" id="title" placeholder="Ingresa el título"
                        class="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required />
                </div>

                <!-- Campo de selección de archivo -->
                <div class="">
                    <label for="file" class="text-lg font-medium text-gray-700">Selecciona una imagen</label>
                    <input type="file" accept="image/*" ref="fileInput" @change="onFileChange"
                        class="w-full text-sm p-2 text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:text-sm file:font-medium file:bg-blue-50 hover:file:bg-blue-100"
                        required />
                </div>

                <!-- Mostrar el nombre de la imagen seleccionada -->
                <p v-if="imageName" class="text-center text-gray-500">Imagen seleccionada: {{ imageName }}</p>

                <!-- Campo para ingresar los tags -->
                <div>
                    <label for="tags" class="block text-lg font-medium text-gray-700">Tags (separados por comas)</label>
                    <input v-model="tags" type="text" id="tags" placeholder="Ingresa los tags, separados por comas"
                        class="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <!-- Botón de subir imagen -->
                <div class="flex justify-center">
                    <button type="submit" :disabled="loading"
                        class="w-full py-3 px-6 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50">
                        {{ loading ? 'Subiendo...' : 'Subir Imagen' }}
                    </button>
                </div>
            </form>

            <!-- Mensaje de error -->
            <p v-if="error" class="text-center text-red-500 mt-4">Error al cargar la imagen. Intenta nuevamente.</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import BackGalleryButton from '@/atoms/BackGalleryButton.vue';

const title = ref('');
const imageName = ref('');
const file = ref(null);
const loading = ref(false);
const error = ref(false);
const tags = ref(''); // Aquí almacenamos los tags como un string
const router = useRouter();

// ID del usuario hardcodeado
const userId = 1;

// Maneja el cambio de archivo seleccionado
const onFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        imageName.value = selectedFile.name;
        file.value = selectedFile;
    }
};

// Función para enviar la imagen al backend
const uploadImage = async () => {
    if (!file.value || !title.value || !tags.value) return;

    loading.value = true;
    error.value = false;

    // Crear FormData para enviar el archivo y los tags
    const formData = new FormData();
    formData.append('file', file.value);
    formData.append('title', title.value);
    formData.append('tags', tags.value); // Enviar los tags como una cadena separada por comas
    formData.append('user_id', userId); // Mandar el user_id hardcodeado

    try {
        // Hacer la solicitud POST a tu API
        const response = await axios.post('http://localhost:3000/images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Procesa la respuesta
        console.log('Imagen subida con éxito:', response.data);
        loading.value = false;
        title.value = ''; // Limpiar el título de la imagen
        tags.value = ''; // Limpiar los tags ingresados

        // Redirigir de vuelta a la galería después de subir la imagen
        router.push({ name: 'Gallery' });
    } catch (err) {
        console.error('Error al subir la imagen:', err);
        error.value = true;
        loading.value = false;
    }
};
</script>
