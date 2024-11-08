<template>
    <div class="upload-container p-6">
        <h2 class="text-2xl font-semibold text-center mb-4">Subir Imagen</h2>

        <!-- Formulario para cargar la imagen -->
        <form @submit.prevent="uploadImage" class="space-y-4">
            <input type="file" accept="image/*" ref="fileInput" @change="onFileChange"
                class="w-full border p-2 rounded-md" required />

            <!-- Mostrar el nombre de la imagen seleccionada -->
            <p v-if="imageName" class="text-center">Imagen seleccionada: {{ imageName }}</p>

            <!-- Campo para ingresar los tags -->
            <div>
                <label for="tags" class="block text-sm font-medium">Tags</label>
                <input v-model="tags" type="text" id="tags" placeholder="Ingresa los tags separados por comas"
                    class="w-full border p-2 rounded-md" />
            </div>

            <!-- Botón para subir -->
            <div class="flex justify-center">
                <button type="submit" :disabled="loading"
                    class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
                    {{ loading ? 'Cargando...' : 'Subir Imagen' }}
                </button>
            </div>
        </form>

        <!-- Mensaje de error -->
        <p v-if="error" class="text-center text-red-500 mt-4">Error al cargar la imagen. Intenta nuevamente.</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const imageName = ref('');
const file = ref(null);
const loading = ref(false);
const error = ref(false);
const tags = ref(''); // Almacenaremos los tags como un string separado por comas
const router = useRouter();

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
    if (!file.value) return;

    loading.value = true;
    error.value = false;

    // Crear FormData para enviar el archivo y los tags
    const formData = new FormData();
    formData.append('file', file.value);
    formData.append('title', imageName.value);
    formData.append('tags', tags.value); // Usamos los tags ingresados por el usuario

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
        imageName.value = ''; // Limpiar el nombre de la imagen
        tags.value = ''; // Limpiar los tags

        // Redirigir de vuelta a la galería después de subir la imagen
        router.push({ name: 'Gallery' });
    } catch (err) {
        console.error('Error al subir la imagen:', err);
        error.value = true;
        loading.value = false;
    }
};
</script>

<style scoped>
.upload-container {
    max-width: 500px;
    margin: 0 auto;
    background-color: #f9fafb;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
