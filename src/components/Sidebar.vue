<template>
  <div>
    <div class="flex h-14 items-center gap-4 border-b dark:border-b-slate-600 bg-muted/40 px-4 lg:h-[50px] lg:px-6 bg-blue-500">
      <Sheet>
        <SheetTrigger>
          <Button variant="outline" size="icon" class="shrink-0" >
            <Menu class="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" class="w-70 p-0">
          <SheetClose>
            <SidebarItems/>
          </SheetClose>
        </SheetContent>
      </Sheet>
      <div class="w-full flex justify-center">
        {{ router.currentRoute.value.name }}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outlone" size="icon" class="rounded-full">
            <Icon icon="ic:round-notifications" height="26px"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel class="text-lg border-b dark:border-b-slate-600 py-2">Notificações</DropdownMenuLabel>
          <ScrollArea class="h-[400px] w-[350px]">
            <div v-for="(notificacao, index) of notificacoes" :key="index">
              <DropdownMenuLabel>{{ notificacao.titulo}}</DropdownMenuLabel>
                <router-link :to="notificacao.link" class="p-2 hover:bg-gray-200 dark:hover:bg-slate-800 cursor-pointer flex justify-start">
                  {{ notificacao.descricao }}
                </router-link>
              <DropdownMenuSeparator />
            </div>
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" size="icon" class="rounded-full">
            <Icon icon="ic:round-account-circle" height="32px"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="abrirDialogConfig">
            Configurações
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="deslogar">Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <main>
      <slot v-if="router.currentRoute.value.path !== '/'"></slot>
      <div v-else class="flex items-center justify-center" style="height: calc(100vh - 60px);">
        <img src="/logo.svg" class="w-96"/>
      </div>
    </main>
    <Dialog :open="dialogConfig" @close="fecharDialogConfig">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Perfil</DialogTitle>
          {{ mode }}
          DarkMode: <Checkbox  @update:checked="mode" />
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" @click="fecharDialogConfig">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Menu } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Icon } from '@iconify/vue'
import SidebarItems from '@/components/SidebarItems.vue'
import { router } from '@/router'
import { useDark } from '@vueuse/core'
import { usuario } from '@/lib/store'

const props = defineProps({
  notificacoes: {
    type: Array
  }
})

const dialogConfig = ref(false)

const abrirDialogConfig = () => {
  dialogConfig.value = true
}
const fecharDialogConfig = () => {
  dialogConfig.value = false
}

const deslogar = () => {
  usuario.value = {}
  router.push('/login')
}

const mode = useDark()
mode.value = true
</script>