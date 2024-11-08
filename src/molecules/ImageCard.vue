<template>
    <div class="relative group">
        <!-- Imagen -->
        <img :src="imageUrl" :alt="altText"
            class="w-full h-45 object-cover rounded-lg shadow-md transition-all duration-300 transform group-hover:scale-105 group-hover:opacity-80" />

        <!-- Card con detalles (Título y Tags) que se muestra al pasar el mouse -->
        <div
            class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-300">
            <div class="text-center px-4">
                <h3 class="text-lg font-semibold">{{ altText }}</h3>
                <p v-if="tags" class="text-sm mt-2">Tags: {{ tags }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    imageUrl: {
        type: String,
        required: true,
    },
    altText: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        default: '',  // Asegúrate de que los tags sean una cadena de texto
    },
});
</script>
