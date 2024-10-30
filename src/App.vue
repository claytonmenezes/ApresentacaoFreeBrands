<!-- App.vue -->
<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { usuario } from '@/lib/store'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  if (!usuario.value.nomeUsuario) {
    router.push('/login')
  }
})
</script>