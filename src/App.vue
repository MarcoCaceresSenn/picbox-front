<template>
  <Layout>
    <router-view class="min-h-screen bg-celes" />
  </Layout>
</template>

<script setup>
import { ref, provide, onMounted } from 'vue';
import Layout from './layout/Layout.vue';

// Estado para almacenar los datos del usuario
const user = ref(null);

// Función para obtener el usuario por el token guardado
const fetchUserByToken = async (token) => {
  try {
    const response = await fetch(`http://localhost:3000/users/${token}`);
    const data = await response.json();
    user.value = data.user; // Asignar los datos del usuario al estado
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
  }
};

// Al montar el componente, obtener el token y cargar el usuario
onMounted(() => {
  const token = localStorage.getItem('authToken');
  if (token) {
    fetchUserByToken(token); // Si el token existe, obtener el usuario
  }
});

// Proporcionar el usuario y la función para actualizarlo
provide('user', user);
provide('setUser', (newUser) => { user.value = newUser });
</script>
