<template>
  <div class="grid grid-cols-12 gap-6 p-10">
    <Card class="2xl:col-span-4 lg:col-span-6 sm:col-span-12 col-span-12">
      <CardHeader>
        <CardTitle>Faturamento 2023/2024</CardTitle>
      </CardHeader>
      <VChart :option="optionsBar" class="chart" />
    </Card>
    <Card class="2xl:col-span-4 lg:col-span-6 sm:col-span-12 col-span-12">
      <CardHeader>
        <CardTitle>Vendas por Produto</CardTitle>
      </CardHeader>
      <VChart :option="optionsDonut" class="chart" />
    </Card>
    <Card class="2xl:col-span-4 lg:col-span-6 sm:col-span-12 col-span-12">
      <CardHeader>
        <CardTitle>Crescimento de Vendas</CardTitle>
      </CardHeader>
      <VChart :option="optionsLine" class="chart" />
    </Card>
    <Card class="2xl:col-span-4 lg:col-span-6 sm:col-span-12 col-span-12">
      <CardHeader>
        <CardTitle>Top Clientes (em mil)</CardTitle>
      </CardHeader>
      <VChart :option="optionsVerticalBar" class="chart" />
    </Card>
    <Card class="2xl:col-span-4 lg:col-span-6 sm:col-span-12 col-span-12">
      <CardHeader>
        <CardTitle>Vendas entre Produtos</CardTitle>
      </CardHeader>
      <VChart :option="optionsRadar" class="chart" />
    </Card>
    <Card class="2xl:col-span-4 lg:col-span-6 sm:col-span-12 col-span-12">
      <CardHeader>
        <CardTitle>Vendas entre Produtos</CardTitle>
      </CardHeader>
      <VChart :option="optionsBarHorizontal" class="chart" />
    </Card>
  </div>
</template>

<script setup>
import 'echarts'
import VChart, { THEME_KEY, INIT_OPTIONS_KEY } from 'vue-echarts'
import { ref, provide } from 'vue'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

provide(THEME_KEY, {
  value: ''
})
provide(INIT_OPTIONS_KEY, {
  renderer: 'svg'
})

const optionsBar = ref({
  tooltip: {
    trigger: 'item'
  },
  textStyle: {
    color: '#fff'
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
    },
    {
      data: [150, 250, 250, 100, 80, 150, 150],
      type: 'bar',
    },
  ],
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
  series: [
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
        { value: 150, name: 'Vedika' },
      ],
    },
  ],
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
    data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
    },
  ],
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
    data: ['Cliente A', 'Cliente B', 'Cliente C', 'Cliente D', 'Cliente E'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [500, 400, 300, 200, 100],
      type: 'bar',
    },
  ],
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
  series: [
    {
      name: 'Comparação de Vendas',
      type: 'radar',
      data: [
        {
          value: [95.3, 27.1, 84.4, 75.1, 49.7, 41.1],
          name: 'Produto A',
        },
      ],
    },
  ],
})
const optionsBarHorizontal = ref({
  tooltip: {
    trigger: 'item'
  },
  textStyle: {
    color: '#fff'
  },
  dataset: {
    source: [
      ['score', 'amount', 'product'],
      [95.3, 88212, 'FreeCô'],
      [27.1, 23212, 'FreeCô Pro'],
      [84.4, 61032, 'Beta'],
      [75.1, 48755, 'Free Wipes'],
      [49.7, 20145, 'Kissu'],
      [41.1, 21212, 'Vedika']
    ]
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
      type: 'bar',
      encode: {
        x: 'amount',
        y: 'product'
      }
    }
  ]
})
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>