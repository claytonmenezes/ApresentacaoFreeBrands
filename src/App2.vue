<template>
    <div class="min-h-screen bg-gray-50">
      <header class="bg-brandBlue shadow-md p-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-white">FreeBrands Dashboard</h1>
      </header>
  
      <main class="p-8">
        <h2 class="flex gap-2 text-3xl font-semibold text-gray-800 mb-6">
          Visão Geral Financeira
          <Button @click="updateChart" class="bg-lime-600">ATUALIZAR</Button>
        </h2>
  
        <!-- Gráficos -->
        <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
          <!-- Card 1: Faturamento Total -->
          <div class="bg-white shadow-md rounded-lg p-6" ref="faturamentoTotal">
            <h3 class="text-lg font-medium text-gray-800 flex justify-between items-center">
              Faturamento Total
              <button @click="toggleFullscreen($refs.faturamentoTotal)">🖥️</button>
            </h3>
            <div class="mt-4 bg-gray-100 rounded flex items-center justify-center">
              <apexchart type="bar" :options="options1" :series="series1" style="width: 100%; height: 400px;"/>
            </div>
          </div>
  
          <!-- Card 2: Custos Operacionais -->
          <div class="bg-white shadow-md rounded-lg p-6" ref="custosOperacionais">
            <h3 class="text-lg font-medium text-gray-800 flex justify-between items-center">
              Custos Operacionais
              <button @click="toggleFullscreen($refs.custosOperacionais)">🖥️</button>
            </h3>
            <div class="mt-4 bg-gray-100 rounded flex items-center justify-center">
              <apexchart type="line" :options="options1" :series="series3" style="width: 100%; height: 400px;"/>
            </div>
          </div>
  
          <!-- Card 3: Lucro Líquido -->
          <div class="bg-white shadow-md rounded-lg p-6" ref="lucroLiquido">
            <h3 class="text-lg font-medium text-gray-800 flex justify-between items-center">
              Lucro Líquido
              <button @click="toggleFullscreen($refs.lucroLiquido)">🖥️</button>
            </h3>
            <div class="mt-4 bg-gray-100 rounded flex items-center justify-center">
              <apexchart type="area" :options="options1" :series="series4" style="width: 100%; height: 400px;"/>
            </div>
          </div>
  
          <!-- Card 4: Desempenho por Produto -->
          <div class="bg-white shadow-md rounded-lg p-6" ref="desempenhoProduto">
            <h3 class="text-lg font-medium text-gray-800 flex justify-between items-center">
              Desempenho por Produto
              <button @click="toggleFullscreen($refs.desempenhoProduto)">🖥️</button>
            </h3>
            <div class="mt-4 bg-gray-100 rounded flex items-center justify-center">
              <apexchart ref="chartDesempenhoProduto" type="donut" :options="options2" :series="series2" style="width: 100%; height: 400px;"/>
            </div>
          </div>
  
          <!-- Card 5: Vendas por Região -->
          <div class="bg-white shadow-md rounded-lg p-6" ref="vendasRegiao">
            <h3 class="text-lg font-medium text-gray-800 flex justify-between items-center">
              Vendas por Região
              <button @click="toggleFullscreen($refs.vendasRegiao)">🖥️</button>
            </h3>
            <div class="mt-4 bg-gray-100 rounded flex items-center justify-center">
              <apexchart type="heatmap" :options="options3" :series="series5" style="width: 100%; height: 400px;"/>
            </div>
          </div>
  
          <!-- Card 2: Mapa de Lucratividade por Estado -->
          <div class="bg-white shadow-md rounded-lg p-6" ref="lucratividadeEstado">
            <h3 class="text-lg font-medium text-gray-800 flex justify-between items-center">
              Lucratividade por Estado
              <button @click="toggleFullscreen($refs.lucratividadeEstado)">🖥️</button>
            </h3>
            <div class="mt-4 bg-gray-100 rounded flex items-center justify-center">
                MAPA
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Button } from '@/components/ui/button'
  
  const options1 = ref({
    chart: { id: 'vuechart-faturamentoTotal' },
    xaxis: { categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'] },
    colors: ['#007BFF', '#6C757D'] // Cores da FreeBrands
  })
  
  // Faturamento Total
  const series1 = ref([{ name: 'Faturamento', data: [3043.15, 4022.58, 4512.36, 5045.48, 4921.12, 6033.02] }])
  
  // Custos Operacionais
  const series3 = ref([{ name: 'Custos Operacionais', data: [1500.75, 1802.90, 2150.40, 2400.32, 2600.15, 2700.20] }])
  
  // Lucro Líquido
  const options4 = ref({
    chart: { id: 'chart-lucroLiquido' }
  })
  const series4 = ref([{ name: 'Lucro Líquido', data: [1542.40, 2219.68, 2361.96, 2645.16, 2320.97, 3332.82] }])
  
  // Desempenho por Produto
  const options2 = {
    chart: { id: 'chart-desempenhoProduto' },
    labels: ['FreeCô', 'FreeCô Pro', 'Beta', 'Free Wipes', 'Kissu', 'Vedika'],
    colors: ['#007BFF', '#6C757D', '#28a745', '#dc3545', '#ffc107', '#17a2b8']
  }
  const series2 = ref([30.15, 40.58, 45.36, 50.48, 49.12, 60.0])
  
  // Vendas por Região
  const options3 = ref({
    chart: { id: 'chart-vendasRegiao' },
    xaxis: { categories: ['Sul', 'Sudeste', 'Centro-Oeste', 'Norte', 'Nordeste'] }
  })
  const series5 = ref([
    { name: 'Jan', data: [20, 40, 30, 50, 60] },
    { name: 'Fev', data: [30, 50, 20, 40, 70] },
    { name: 'Mar', data: [40, 30, 50, 60, 80] },
    { name: 'Abr', data: [60, 20, 40, 50, 90] },
    { name: 'Mai', data: [50, 40, 60, 70, 100] }
  ])
  
  const updateChart = () => {
    const max = 2500
    const min = 5000
    const newData = series1.value[0].data.map(() => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    })
    series1.value = [{ name: 'Faturamento', data: newData }]
    series3.value = [{ name: 'Custos Operacionais', data: newData.map(n => n * 0.6) }]
    series4.value = [{ name: 'Lucro Líquido', data: newData.map(n => n * 0.4) }]
    series2.value = newData.map(n => Math.floor(n / 10)) // Atualizando donut
  }
  // Função para alternar tela cheia e ajustar tamanho do gráfico
  const toggleFullscreen = (element) => {
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen();
    }
  }
  
  </script>
  
  <style scoped>
  .bg-brandBlue {
    background-color: #007BFF
  }
  </style>