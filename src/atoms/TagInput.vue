        <!-- NO FUNCIONA DE MOMENTO -->






<template>
    <div class="flex flex-wrap gap-2">
        <!-- Mostrar los tags predefinidos como botones -->
        <div v-for="(tag, index) in defaultTags" :key="index" class="flex">
            <button @click="toggleTag(tag)"
                :class="{ 'bg-black text-white': selectedTags.includes(tag), 'bg-gray-300 text-black': !selectedTags.includes(tag) }"
                class="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:bg-black hover:text-white">
                {{ tag }}
            </button>
        </div>

        <!-- Input para agregar nuevos tags -->
        <div class="flex items-center mt-4">
            <input v-model="newTag" @keydown.enter="addTag" type="text" placeholder="Agrega un tag"
                class="border border-gray-300 p-2 rounded-md text-gray-700 w-32" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// Tags predefinidos que el usuario puede seleccionar
const defaultTags = ['anime', 'nature', 'abstract'];
const newTag = ref(''); // Valor del nuevo tag que se agrega
const selectedTags = ref([]); // Array de tags seleccionados por el usuario

// Función para alternar la selección de un tag
const toggleTag = (tag) => {
    if (selectedTags.value.includes(tag)) {
        // Si el tag ya está seleccionado, lo deseleccionamos
        selectedTags.value = selectedTags.value.filter(t => t !== tag);
    } else {
        // Si no está seleccionado, lo agregamos a los seleccionados
        selectedTags.value.push(tag);
    }
};

// Agregar un tag al presionar Enter
const addTag = () => {
    const trimmedTag = newTag.value.trim();
    if (trimmedTag && !selectedTags.value.includes(trimmedTag)) {
        selectedTags.value.push(trimmedTag); // Agregar el nuevo tag al array de seleccionados
    }
    newTag.value = ''; // Limpiar el campo de entrada
};

// Este watch se asegura de que `selectedTags` esté sincronizado con el valor que se pasa como v-model
watch(selectedTags, (newVal) => {
    emit('update:selectedTags', newVal);
});
</script>

<style scoped>
button {
    cursor: pointer;
}

button:hover {
    transform: scale(1.05);
}
</style>
