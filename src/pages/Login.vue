<template>
  <div class="grid grid-cols-12">
    <div class="hidden md:block col-span-7 bg-zinc-900 h-screen">
      <div class="flex items-center text-lg font-medium p-8">
        <img src="/logo2.png" class="w-8 mr-1"/>
        <div class="text-[#4c6c84]">
          FreeBrands
        </div>
      </div>
    </div>
    <div class="md:col-span-5 col-span-12 h-screen md:h-none bg-muted grid place-items-center">
      <div class="grid items-center justify-center gap-4">
        <h1 class="text-2xl font-bold text-center">Bem vindo!</h1>
        <Input placeholder="Usuário" class="pl-2" v-model="nomeUsuario"/>
        <Input placeholder="Senha" type="password" class="pl-2" v-model="senha"/>
        <Button type="submit" @click="login(nomeUsuario, senha)">Entrar</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { usuario } from '@/lib/store'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const nomeUsuario = ref('')
const senha = ref('')

const login = (nomeUsuario, senha) => {
  if ((nomeUsuario === 'admin' || nomeUsuario === 'gerente' || nomeUsuario === 'vendas') && senha === '123456') {
    usuario.value = {
      nomeUsuario,
      senha
    }
    router.push('/')
  } else {
    alert('Usuário ou senha inválidos!')
  }
}

</script>