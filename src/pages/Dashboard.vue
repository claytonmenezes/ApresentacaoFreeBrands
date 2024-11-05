<template>
  <div class="grid grid-cols-12 gap-6 p-10">
    <Play v-if="!tempoReal" class="cursor-pointer col-span-12" @click="tempoReal = !tempoReal"/>
    <CirclePause v-else class="cursor-pointer col-span-12" @click="tempoReal = !tempoReal"/>
    <Card class="2xl:col-span-4 lg:col-span-6 sm:col-span-12 col-span-12" v-if="usuario.nomeUsuario === 'admin' || usuario.nomeUsuario === 'gerente'">
      <CardHeader>
        <CardTitle class="flex justify-between">
          <RefreshCcw style="cursor: pointer;" @click="atualizaBar"/>
          <div> Faturamento 2023/2024 </div>
          <Fullscreen style="cursor: pointer;" @click="abrirDialogTelaCheia('Faturamento 2023/2024', optionsBar, chartBar)"/>
        </CardTitle>
      </CardHeader>
      <VChart :option="optionsBar" class="chart" autoresize ref="chartBar" />
    </Card>
    <Card class="2xl:col-span-4 lg:col-span-6 sm:col-span-12 col-span-12" v-if="usuario.nomeUsuario === 'admin'">
      <CardHeader>
        <CardTitle class="flex justify-between">
          <RefreshCcw style="cursor: pointer;" @click="atualizaDonut"/>
          <div> Vendas por Produto </div>
          <Fullscreen style="cursor: pointer;" @click="abrirDialogTelaCheia('Vendas por Produto', optionsDonut, chartDonut)"/>
        </CardTitle>
      </CardHeader>
      <VChart :option="optionsDonut" class="chart" autoresize ref="chartDonut" />
    </Card>
    <Card class="2xl:col-span-4 lg:col-span-6 sm:col-span-12 col-span-12" v-if="usuario.nomeUsuario === 'admin' || usuario.nomeUsuario === 'gerente' || usuario.nomeUsuario === 'vendas'">
      <CardHeader>
        <CardTitle class="flex justify-between">
          <RefreshCcw style="cursor: pointer;" @click="atualizaLine"/>
          <div> Crescimento de Vendas </div>
          <Fullscreen style="cursor: pointer;" @click="abrirDialogTelaCheia('Crescimento de Vendas', optionsLine, chartLine)"/>
        </CardTitle>
      </CardHeader>
      <VChart :option="optionsLine" class="chart" autoresize ref="chartLine" />
    </Card>
    <Card class="2xl:col-span-4 lg:col-span-6 sm:col-span-12 col-span-12" v-if="usuario.nomeUsuario === 'admin' || usuario.nomeUsuario === 'gerente'">
      <CardHeader>
        <CardTitle class="flex justify-between">
          <RefreshCcw style="cursor: pointer;" @click="atualizaVerticalBar"/>
          <div> Top Clientes (em mil) </div>
          <Fullscreen style="cursor: pointer;" @click="abrirDialogTelaCheia('Top Clientes (em mil)', optionsVerticalBar, chartVerticalBar)"/>
        </CardTitle>
      </CardHeader>
      <VChart :option="optionsVerticalBar" class="chart" autoresize ref="chartVerticalBar" />
    </Card>
    <Card class="2xl:col-span-4 lg:col-span-6 sm:col-span-12 col-span-12" v-if="usuario.nomeUsuario === 'admin' || usuario.nomeUsuario === 'gerente'">
      <CardHeader>
        <CardTitle class="flex justify-between">
          <RefreshCcw style="cursor: pointer;" @click="atualizaRadar"/>
          <div> Comparação de Vendas </div>
          <Fullscreen style="cursor: pointer;" @click="abrirDialogTelaCheia('Comparação de Vendas', optionsRadar, chartRadar)"/>
        </CardTitle>
      </CardHeader>
      <VChart :option="optionsRadar" class="chart" autoresize ref="chartRadar" />
    </Card>
    <Card class="2xl:col-span-4 lg:col-span-6 sm:col-span-12 col-span-12" v-if="usuario.nomeUsuario === 'admin'">
      <CardHeader>
        <CardTitle class="flex justify-between">
          <RefreshCcw style="cursor: pointer;" @click="atualizaBarHorizontal"/>
          <div> Vendas entre Produtos </div>
          <Fullscreen style="cursor: pointer;" @click="abrirDialogTelaCheia('Vendas entre Produtos', optionsBarHorizontal, chartBarHorizontal)"/>
        </CardTitle>
      </CardHeader>
      <VChart :option="optionsBarHorizontal" class="chart" autoresize ref="chartBarHorizontal" />
    </Card>
    <Dialog v-model:open="dialogTelaCheia">
      <DialogContent class="h-full max-w-full">
        <DialogHeader>
          <RefreshCcw style="cursor: pointer;" @click="atualizaChart(nomeDashboard)"/>
          <DialogTitle class="text-6xl text-center">{{ nomeDashboard }}</DialogTitle>
          <DialogDescription/>
          <VChart :option="optionsTelaCheia" autoresize />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import 'echarts'
import VChart, { THEME_KEY, INIT_OPTIONS_KEY } from 'vue-echarts'
import { ref, provide, onMounted } from 'vue'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { usuario } from '@/lib/store'
import { Fullscreen, RefreshCcw, Play, CirclePause } from 'lucide-vue-next'

provide(THEME_KEY, { value: '' })
provide(INIT_OPTIONS_KEY, { renderer: 'svg' })

const dialogTelaCheia = ref(false)
const nomeDashboard = ref('')
const optionsTelaCheia = ref({})
const chartBar = ref(null)
const chartDonut = ref(null)
const chartLine = ref(null)
const chartVerticalBar = ref(null)
const chartRadar = ref(null)
const chartBarHorizontal = ref(null)
const tempoReal = ref(false)

const seriesBar = ref([
  {
    name: '2023',
    data: [125, 150, 200, 180, 100],
    type: 'bar',
  },
  {
    name: '2024',
    data: [190, 200, 220, 250, 150],
    type: 'bar',
  }
])
const seriesDonut = ref([
  {
    type: 'pie',
    label: {
      color: '#fff'
    },
    radius: '60%',
    data: [
      { value: 2048, name: 'FreeCô' },
      { value: 135, name: 'FreeCô Pro' },
      { value: 580, name: 'Beta' },
      { value: 484, name: 'Free Wipes' },
      { value: 300, name: 'Kissu' },
      { value: 150, name: 'Vedika' }
    ]
  }
])
const seriesLine = ref([
  {
    data: [125, 150, 200, 180, 185],
    type: 'line',
  }
])
const seriesVerticalBar = ref([
  {
    data: [178, 110, 190, 200, 150, 120, 170, 180, 190, 100, 150, 160],
    type: 'bar',
  }
])
const seriesRadar = ref([
  {
    name: 'Comparação',
    type: 'radar',
    data: [
      {
        value: [95.3, 27.1, 84.4, 75.1, 49.7, 41.1],
      },
    ],
  }
])
const sourceBarHorizontal = ref([
  ['score', 'amount', 'product'],
  [95.3, 88212, 'FreeCô'],
  [27.1, 23212, 'FreeCô Pro'],
  [84.4, 61032, 'Beta'],
  [75.1, 48755, 'Free Wipes'],
  [49.7, 20145, 'Kissu'],
  [41.1, 21212, 'Vedika']
])

const optionsBar = ref({
  tooltip: {
    trigger: 'item'
  },
  textStyle: {
    color: '#fff'
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  },
  yAxis: {
    type: 'value',
  },
  series: seriesBar.value,
})
const optionsDonut = ref({
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    textStyle: {
      color: '#fff'
    }
  },
  series: seriesDonut.value,
})
const optionsLine = ref({
  tooltip: {
    trigger: 'axis'
  },
  textStyle: {
    color: '#fff'
  },
  xAxis: {
    type: 'category',
    data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
  },
  yAxis: {
    type: 'value',
  },
  series: seriesLine.value,
})
const optionsVerticalBar = ref({
  tooltip: {
    trigger: 'item'
  },
  textStyle: {
    color: '#fff'
  },
  xAxis: {
    type: 'category',
    data: ['Droga Raia', 'Droga Sil', 'Droga SP', 'Carrefour', 'Extra', 'Farmácia Vida', 'Farmácia Popular', 'Super Drogaria', 'Droga Ponto Certo', 'Atacadão Farma', 'Distribuidora Farma', 'Big Farma'],
  },
  yAxis: {
    type: 'value',
  },
  series: seriesVerticalBar.value,
})
const optionsRadar = ref({
  tooltip: {
    trigger: 'item'
  },
  textStyle: {
    color: '#fff'
  },
  radar: {
    indicator: [
      { name: 'FreeCô', max: 100 },
      { name: 'FreeCô Pro', max: 100 },
      { name: 'Beta', max: 100 },
      { name: 'Free Wipes', max: 100 },
      { name: 'Kissu', max: 100 },
      { name: 'Vedika', max: 100 },
    ],
  },
  series: seriesRadar.value,
})
const optionsBarHorizontal = ref({
  tooltip: {
    trigger: 'item'
  },
  textStyle: {
    color: '#fff'
  },
  dataset: {
    source: sourceBarHorizontal.value
  },
  grid: { containLabel: true },
  xAxis: { name: 'Qtde' },
  yAxis: { type: 'category' },
  visualMap: {
    orient: 'horizontal',
    left: 'center',
    min: 10,
    max: 100,
    text: ['Alta Pontuação', 'Baixa Pontuação'],
    dimension: 0,
    inRange: {
      color: ['#65B581', '#FFCE34', '#FD665F']
    }
  },
  series: [
    {
      name: '',
      type: 'bar',
      encode: {
        x: 'amount',
        y: 'product'
      }
    }
  ]
})
const abrirDialogTelaCheia = (nome, options) => {
  dialogTelaCheia.value = true
  nomeDashboard.value = nome
  optionsTelaCheia.value = options
}
const atualizaBar = () => {
  if (seriesBar.value[0].data.length >= 12) {
    seriesBar.value[0].data = []
    seriesBar.value[1].data = []
  }
  seriesBar.value[0].data.push(Math.floor(Math.random() * 300))
  seriesBar.value[1].data.push(Math.floor(Math.random() * 300))
}
const atualizaDonut = () => {
  seriesDonut.value[0].data[0].value = Math.floor(Math.random() * 300)
  seriesDonut.value[0].data[1].value = Math.floor(Math.random() * 300)
  seriesDonut.value[0].data[2].value = Math.floor(Math.random() * 300)
  seriesDonut.value[0].data[3].value = Math.floor(Math.random() * 300)
  seriesDonut.value[0].data[4].value = Math.floor(Math.random() * 300)
}
const atualizaLine = () => {
  if (seriesLine.value[0].data.length >= 30) {
    seriesLine.value[0].data = [50]
  }
  const ultimoValor = seriesLine.value[0].data[seriesLine.value[0].data.length - 1]
  const novoValor = geraNumeroAleatorio(-30, 50)
  seriesLine.value[0].data.push(ultimoValor + novoValor)
}
const atualizaVerticalBar = () => {
  seriesVerticalBar.value[0].data[0] = Math.floor(Math.random() * 300)
  seriesVerticalBar.value[0].data[1] = Math.floor(Math.random() * 300)
  seriesVerticalBar.value[0].data[2] = Math.floor(Math.random() * 300)
  seriesVerticalBar.value[0].data[3] = Math.floor(Math.random() * 300)
  seriesVerticalBar.value[0].data[4] = Math.floor(Math.random() * 300)
  seriesVerticalBar.value[0].data[5] = Math.floor(Math.random() * 300)
  seriesVerticalBar.value[0].data[6] = Math.floor(Math.random() * 300)
  seriesVerticalBar.value[0].data[7] = Math.floor(Math.random() * 300)
  seriesVerticalBar.value[0].data[8] = Math.floor(Math.random() * 300)
  seriesVerticalBar.value[0].data[9] = Math.floor(Math.random() * 300)
  seriesVerticalBar.value[0].data[10] = Math.floor(Math.random() * 300)
  seriesVerticalBar.value[0].data[11] = Math.floor(Math.random() * 300)
}
const atualizaRadar = () => {
  seriesRadar.value[0].data[0].value = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]
}
const atualizaBarHorizontal = () => {
  sourceBarHorizontal.value[1][1] = Math.floor(Math.random() * 300)
  sourceBarHorizontal.value[2][1] = Math.floor(Math.random() * 300)
  sourceBarHorizontal.value[3][1] = Math.floor(Math.random() * 300)
  sourceBarHorizontal.value[4][1] = Math.floor(Math.random() * 300)
  sourceBarHorizontal.value[5][1] = Math.floor(Math.random() * 300)
  sourceBarHorizontal.value[6][1] = Math.floor(Math.random() * 300)
}
const atualizaChart = (nomeDashboard) => {
  if (nomeDashboard === 'Faturamento 2023/2024') {
    atualizaBar()
  } else if (nomeDashboard === 'Vendas por Produto') {
    atualizaDonut()
  } else if (nomeDashboard === 'Crescimento de Vendas') {
    atualizaLine()
  } else if (nomeDashboard === 'Top Clientes (em mil)') {
    atualizaVerticalBar()
  } else if (nomeDashboard === 'Comparação de Vendas') {
    atualizaRadar()
  } else if (nomeDashboard === 'Vendas entre Produtos') {
    atualizaBarHorizontal()
  }
}
const geraNumeroAleatorio = (min, max) => {
  return Math.random() * (max - min) + min;
}
onMounted(async () => {
  setInterval(() => {
    if (tempoReal.value) {
      atualizaBar()
      atualizaDonut()
      atualizaLine()
      atualizaVerticalBar()
      atualizaRadar()
      atualizaBarHorizontal()
    }
  }, 2000)
})
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>