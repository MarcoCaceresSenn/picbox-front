<template>
    <main class="flex flex-col lg:flex-row min-h-screen">
        <div class="w-full lg:w-1/2 order-1 lg:order-1 p-2">
            <BackgroundLanding />
        </div>

        <div class="w-full lg:w-1/2 order-2 lg:order-2 flex items-center justify-center p-5 lg:p-0 bg-white">
            <AutenticationForm />
        </div>
    </main>
</template>

<script setup>
import BackgroundLanding from '@/atoms/BackgroundLanding.vue';
import AutenticationForm from '@/organisms/AutenticationForm.vue';

</script>
