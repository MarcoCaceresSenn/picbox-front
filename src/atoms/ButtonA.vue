<template>
    <router-link :to="link"
        class="bg-brown font-medium rounded-xl text-sm px-12 py-3 text-center text-white hover:bg-brownest hover:text-white transition-colors duration-300 cursor-pointer">
        <slot></slot>
    </router-link>
</template>

<script setup>
defineProps({
    link: {
        type: String,
        required: true,
    },
});
</script>
