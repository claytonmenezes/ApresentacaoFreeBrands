<template>
  <Sidebar :notificacoes="notificacoes">
    <router-view class="px-32 py-4"/>
  </Sidebar>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

const notificacoes = ref([])
</script>
