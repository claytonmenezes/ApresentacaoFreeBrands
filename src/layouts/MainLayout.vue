<template>
  <Sidebar :notificacoes="notificacoes">
    <router-view/>
  </Sidebar>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

const notificacoes = ref([])
</script>
