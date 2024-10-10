<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-brandBlue shadow-md p-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-white">FreeBrands Dashboard</h1>
    </header>

    <main class="p-8">
      <h2 class="text-3xl font-semibold text-gray-800 mb-6">Visão Geral Financeira</h2>
      <!-- Gráficos -->
      <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        <!-- Card 1: Faturamento Total -->
        <div class="bg-white shadow-md rounded-lg p-6" ref="faturamentoTotal">
          <h3 class="text-lg font-medium text-gray-800 flex justify-between items-center">
            Faturamento mês
            <Dialog @close="closeFullscreen">
              <DialogTrigger as-child>
                <Button variant="ghost">🖥️</Button>
              </DialogTrigger>
              <DialogContent class="text-center max-w-none p-0 m-0 bg-white">
                <div class="p-6 pl-80">
                  <h3 class="text-xl font-bold mb-4">Faturamento mês</h3>
                  <apexchart type="bar" :options="options1" :series="series1" class="max-w-7xl" />
                </div>
              </DialogContent>
            </Dialog>
          </h3>
          <div class="mt-4 bg-gray-100 rounded flex items-center justify-center">
            <apexchart type="bar" :options="options1" :series="series1" style="width: 100%; height: 400px;" />
          </div>
        </div>
        <!-- Card 2: Custos Operacionais -->
        <div class="bg-white shadow-md rounded-lg p-6" ref="faturamentoClientes">
          <h3 class="text-lg font-medium text-gray-800 flex justify-between items-center">
            Faturamento clientes mês
            <Dialog @close="closeFullscreen">
              <DialogTrigger as-child>
                <Button variant="ghost">🖥️</Button>
              </DialogTrigger>
              <DialogContent class="text-center max-w-none p-0 m-0 bg-white">
                <div class="p-6 pl-80">
                  <h3 class="text-xl font-bold mb-4">Faturamento clientes mês</h3>
                  <apexchart type="line" :options="options1" :series="series2" class="max-w-7xl" />
                </div>
              </DialogContent>
            </Dialog>
          </h3>
          <div class="mt-4 bg-gray-100 rounded flex items-center justify-center">
            <apexchart type="line" :options="options1" :series="series2" style="width: 100%; height: 400px;" />
          </div>
        </div>
        <!-- Card 3: Lucro Líquido -->
        <div class="bg-white shadow-md rounded-lg p-6" ref="lucroLiquido">
          <h3 class="text-lg font-medium text-gray-800 flex justify-between items-center">
            Lucro revendedor mês
            <Dialog @close="closeFullscreen">
              <DialogTrigger as-child>
                <Button variant="ghost">🖥️</Button>
              </DialogTrigger>
              <DialogContent class="text-center max-w-none p-0 m-0 bg-white">
                <div class="p-6 pl-80">
                  <h3 class="text-xl font-bold mb-4">Lucro revendedor mês</h3>
                  <apexchart type="area" :options="options1" :series="series3" class="max-w-7xl" />
                </div>
              </DialogContent>
            </Dialog>
          </h3>
          <div class="mt-4 bg-gray-100 rounded flex items-center justify-center">
            <apexchart type="area" :options="options1" :series="series3" style="width: 100%; height: 400px;" />
          </div>
        </div>
        <!-- Card 4: Desempenho por Produto -->
        <div class="bg-white shadow-md rounded-lg p-6" ref="desempenhoProduto">
          <h3 class="text-lg font-medium text-gray-800 flex justify-between items-center">
            Desempenho por produto
            <Dialog @close="closeFullscreen">
              <DialogTrigger as-child>
                <Button variant="ghost">🖥️</Button>
              </DialogTrigger>
              <DialogContent class="h-full text-center max-w-none p-0 m-0 bg-white">
                <div class="p-6 pl-96">
                  <h3 class="text-xl font-bold mb-4">Desempenho por produto</h3>
                  <apexchart type="donut" :options="options2" :series="series4" class="max-w-4xl" />
                </div>
              </DialogContent>
            </Dialog>
          </h3>
          <div class="mt-4 bg-gray-100 rounded flex items-center justify-center">
            <apexchart type="donut" :options="options2" :series="series4" style="width: 100%; height: 400px;" />
          </div>
        </div>
        <!-- Card 5: Vendas por Região -->
        <div class="bg-white shadow-md rounded-lg p-6" ref="vendasRegiao">
          <h3 class="text-lg font-medium text-gray-800 flex justify-between items-center">
            Total Vendido
            <Dialog @close="closeFullscreen">
              <DialogTrigger as-child>
                <Button variant="ghost">🖥️</Button>
              </DialogTrigger>
              <DialogContent class="h-full text-center max-w-none p-0 m-0 bg-white">
                <div class="p-6 pl-80">
                  <h3 class="text-xl font-bold mb-4">Total Vendido</h3>
                  <div class="mt-4 bg-gray-100 rounded flex items-center justify-center text-8xl">
                    {{ valorTotal }}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </h3>
          <div class="mt-4 bg-gray-100 rounded flex items-center justify-center text-8xl">
            {{ valorTotal }}
          </div>
        </div>
        <!-- Card 2: Mapa de Lucratividade por Estado -->
        <div class="bg-white shadow-md rounded-lg p-6" ref="lucratividadeEstado">
          <h3 class="text-lg font-medium text-gray-800 flex justify-between items-center">
            Lucratividade por Estado
            <Dialog @close="closeFullscreen">
              <DialogTrigger as-child>
                <Button variant="ghost">🖥️</Button>
              </DialogTrigger>
              <DialogContent class="h-full text-center max-w-none p-0 m-0 bg-white">
                <div class="p-6">
                  <h3 class="text-xl font-bold mb-4">Lucratividade por Estado</h3>
                  <div class="mt-4 bg-gray-100 rounded flex items-center justify-center text-8xl">
                    <GoogleMap api-key="AIzaSyA2lwmdVgbKneAtI9fE-uX8IBnq-Z398SM" style="width: 100%; height: 500px" :center="center" :zoom="4" >
                      <Marker :options="{ position: center }" />
                    </GoogleMap>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </h3>
          <div class="mt-4 bg-gray-100 rounded flex items-center justify-center">
            <GoogleMap api-key="AIzaSyA2lwmdVgbKneAtI9fE-uX8IBnq-Z398SM" style="width: 100%; height: 500px" :center="center" :zoom="4" >
              <Marker :options="{ position: center }" />
            </GoogleMap>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { supabase, listarEntradas, listarSaida } from '@/lib/supabase'
import { GoogleMap, Marker } from 'vue3-google-map'

const center = { lat: -9.82527513205756, lng: -55.00238142638493 }
const series1 = ref([])
const series2 = ref([])
const series3 = ref([])
const series4 = ref([])

const valorTotal = ref(0.0)

const options1 = ref({
  xaxis: {
    categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    labels: {
      formatter: function(value) {
        if (typeof value === 'number') {
          return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
        return value
      }
    }
  },
  plotOptions: {
    bar: {
      horizontal: true
    }
  },
  yaxis: {
    labels: {
      formatter: function(value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      }
    }
  },
  tooltip: {
    y: {
      formatter: function(value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      }
    }
  }
})
const options2 = {
  labels: ['FreeCô', 'FreeCô Pro', 'Beta', 'Free Wipes', 'Kissu', 'Vedika'],
  colors: ['#007BFF', '#6C757D', '#28a745', '#dc3545', '#ffc107', '#17a2b8']
}

const sumByMonthSaida = (array) => {
  const months = {
    "2024-01": 0,
    "2024-02": 0,
    "2024-03": 0,
    "2024-04": 0,
    "2024-05": 0,
    "2024-06": 0,
    "2024-07": 0,
    "2024-08": 0,
    "2024-09": 0,
    "2024-10": 0,
    "2024-11": 0,
    "2024-12": 0
  }
  array.forEach((obj) => {
    const month = obj.data_saida.substring(0, 7)
    if (months[month] !== undefined) {
      months[month] += obj.valor
    }
    months[month] = parseFloat(months[month].toFixed(2))
  })
  return Object.values(months)
}

const sumByMonthEntrada = (array) => {
  const months = {
    "2024-01": 0,
    "2024-02": 0,
    "2024-03": 0,
    "2024-04": 0,
    "2024-05": 0,
    "2024-06": 0,
    "2024-07": 0,
    "2024-08": 0,
    "2024-09": 0,
    "2024-10": 0,
    "2024-11": 0,
    "2024-12": 0
  }
  array.forEach((obj) => {
    const month = obj.data_entrada.substring(0, 7)
    if (months[month] !== undefined) {
      months[month] += obj.valor
    }
    months[month] = parseFloat(months[month].toFixed(2))
  })
  return Object.values(months)
}

const somarArrays = (array1, array2) => {
  const resultado = []
  const tamanho = Math.min(array1.length, array2.length)
  for (let i = 0; i < tamanho; i++) {
    resultado.push(parseFloat((array2[i] - array1[i]).toFixed(2)))  // Ajuste aqui
  }
  return resultado
}

const atualizarDashboard = async () => {
  const entradas = await listarEntradas()
  const faturamentoTotal = sumByMonthEntrada(entradas)
  series1.value = [{ name: 'Faturamento', data: faturamentoTotal }]
  
  const saidas = await listarSaida()
  const faturamentoClientes = sumByMonthSaida(saidas)
  series2.value = [{ name: 'Faturamento Clientes', data: faturamentoClientes }]
  
  // Ajustando o cálculo para mostrar o lucro do revendedor
  const lucroLiquido = somarArrays(faturamentoTotal, faturamentoClientes)
  series3.value = [{ name: 'Lucro do Revendedor', data: lucroLiquido }]
  
  const desempenhoPorProduto = [10.76, 0.07, 52.47, 0.78, 26.94, 8.98]
  series4.value = desempenhoPorProduto

  valorTotal.value = `R$ ${faturamentoTotal.reduce((acumulador, numero) => acumulador + numero, 0).toLocaleString()}`
}

onMounted(async () => {
  supabase.channel('atualizacoes').on('postgres_changes', { event: '*', schema: 'public' }, atualizarDashboard).subscribe()
  await atualizarDashboard()
})
</script>

