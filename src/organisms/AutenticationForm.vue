<template>
    <main class="flex w-full items-center justify-center min-h-screen p-5">
        <div class="w-full max-w-sm mx-auto">
            <div class="flex justify-center mb-6">
                <TitleA>Iniciar Sesión</TitleA>
            </div>
            <form @submit.prevent="handleLogin">
                <InputField v-model="username" label="Usuario" id="username" type="text" />
                <InputField v-model="password" label="Contraseña" id="password" type="password" />
                <div class="flex justify-center mt-6">
                    <ButtonA type="submit">Ingresar</ButtonA>
                </div>
            </form>

            <div v-if="errorMessage" class="mt-4 p-3 bg-red-500 text-white rounded-lg">
                {{ errorMessage }}
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/services/AuthService.js';
import InputField from '@/molecules/InputField.vue';
import TitleA from '@/atoms/TitleA.vue';
import ButtonA from '@/atoms/ButtonA.vue';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const setUser = inject('setUser');

const handleLogin = async () => {
    try {
        errorMessage.value = ''; // Limpiar cualquier mensaje de error
        const response = await login(username.value, password.value); // Suponiendo que login es una función que retorna los datos del usuario

        console.log('Login exitoso:', response);

        if (response && response.user && response.user.id) {
            // Almacenar el token de usuario (puedes guardar el token si lo tienes en tu respuesta, aquí guardamos el id como ejemplo)
            localStorage.setItem('authToken', response.user.id);

            // Actualizar el estado global del usuario
            setUser(response.user); // Este método actualiza el estado global del usuario

            // Redirigir al usuario a la página de la galería
            router.push({ name: 'Gallery' });
        } else {
            // Si el login no fue exitoso
            errorMessage.value = 'Error en el login. No se encontró un usuario válido.';
            setTimeout(() => {
                errorMessage.value = ''; // Limpiar el mensaje después de 5 segundos
            }, 5000);
        }
    } catch (error) {
        // Manejo de errores
        errorMessage.value = 'Credenciales inválidas o error al hacer login. Intenta de nuevo.';
        setTimeout(() => {
            errorMessage.value = ''; // Limpiar el mensaje después de 5 segundos
        }, 5000);
    }
};
</script>

<style scoped>
.bg-red-500 {
    background-color: #f44336;
}

.text-white {
    color: white;
}
</style>