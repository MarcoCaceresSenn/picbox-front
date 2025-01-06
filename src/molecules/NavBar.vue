<template>
    <nav class="fixed top-0 left-0 w-full bg-white shadow-lg shadow-black-500/50 z-50">
        <div class="flex flex-wrap items-center justify-between p-2">
            <!-- Logo -->
            <router-link to="/" class="flex items-center">
                <Logo class="px-8" />
            </router-link>

            <button @click="toggleMenu"
                class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="navbar" aria-expanded="false">
            </button>

            <!-- Enlaces de navegación -->
            <div :class="['w-full md:flex md:w-auto', isOpen ? 'block' : 'hidden']" id="navbar">
                <div class="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 px-8">
                    <!-- Si el usuario está logueado, mostrar su nombre y el botón de logout -->
                    <template v-if="user">
                        <span class="text-black">{{ user.name }}</span>
                        <button @click="handleLogout"
                            class="text-black bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2 text-center">
                            Logout
                        </button>
                    </template>

                    <!-- Enlace para crear cuenta, solo visible si el usuario no está logueado -->
                    <template v-else>
                        <router-link to="/register" type="button"
                            class="text-black bg-white hover:bg-bggray border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
                            Crear cuenta
                        </router-link>
                    </template>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import Logo from '@/atoms/Logo.vue';

const isOpen = ref(false);
const router = useRouter();

// Inyectar el usuario y la función para actualizar el usuario
const user = inject('user');
const setUser = inject('setUser');

// Comprobar la ruta actual
const toggleMenu = () => {
    isOpen.value = !isOpen.value;
};

// Función para manejar el logout
const handleLogout = () => {
    // Eliminar el token de localStorage
    localStorage.removeItem('authToken');
    // Limpiar el estado del usuario
    setUser(null);
    // Redirigir al usuario a la página principal
    router.push('/');
};
</script>
