<template>
  <div class="p-10">
    <router-link to="/">
      <img src="/logo.svg" />
    </router-link>
  </div>
  <div class="py-2 overflow-y-auto h-[calc(100vh-64px)]">
    <router-link v-for="(menu, index) of menus" :key="index" :to="menu.link" class="p-4 hover:bg-gray-200 dark:hover:bg-slate-800 cursor-pointer flex gap-2 items-center">
      <Icon :icon="menu.icon" height="26px" />
      {{ menu.titulo }}
    </router-link>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const menus = [
  { link: 'Dashboard', titulo: 'Dashboard' },
  { link: 'Usuario', titulo: 'Usuario' },
  { link: 'Perfil', titulo: 'Perfil' },
  { link: 'Automacao', titulo: 'Automação' }
]
</script>
