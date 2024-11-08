<template>
    <div class="relative w-full h-full rounded-xl overflow-hidden"> <!-- Añadimos 'rounded-xl' -->
        <img class="absolute top-0 left-0 w-full h-full object-cover" :src="imageUrl" alt="Fondo de Login" />
        <slot></slot> <!-- Esto renderiza cualquier contenido que se pase dentro del componente -->
    </div>
</template>

<script setup>
import { ref } from 'vue';

const imageUrl = ref(require('@/assets/images/fondoLogin.jpg'));  // Ajusta la ruta si es necesario
</script>
