<template>
  <Sidebar :notificacoes="notificacoes">
    <router-view/>
  </Sidebar>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

const notificacoes = ref([])

onMounted(() => {
  setInterval(() => {
    notificacoes.value.push({
      titulo: 'Notificação',
      descricao: 'Esta notificação foi gerada automaticamente',
      data: '2022-01-01',
      tipo: 'info'
    })
  }, 10000)
})
</script>
