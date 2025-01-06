<template>
    <div>
        <!-- Si el 'link' está definido, usar router-link -->
        <router-link v-if="link" :to="link"
            class="bg-brown font-medium rounded-xl text-sm px-12 py-3 text-center text-white hover:bg-brownest hover:text-white transition-colors duration-300 cursor-pointer">
            <slot></slot>
        </router-link>

        <!-- Si no hay 'link', usar el botón normal -->
        <button v-else @click="handleClick"
            class="bg-brown font-medium rounded-xl text-sm px-12 py-3 text-center text-white hover:bg-brownest hover:text-white transition-colors duration-300 cursor-pointer">
            <slot></slot>
        </button>
    </div>
</template>

<script setup>
defineProps({
    link: {
        type: String,
        required: false,
    },
});

const handleClick = () => {
    console.log("Botón presionado");
};
</script>
