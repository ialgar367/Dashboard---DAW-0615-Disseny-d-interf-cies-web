<template>
  <ion-page>
    <ion-header :translucent="true" class="custom-header">
      <ion-toolbar class="custom-toolbar">
        <ion-buttons slot="start">
          <ion-menu-button color="light"></ion-menu-button>
        </ion-buttons>
        <ion-title class="header-title">Dashboard de Negocio</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="custom-content">
      <div class="dashboard-container">
        <!-- Header con métricas rápidas -->
        <div class="quick-stats">
          <div class="stat-card stat-primary">
            <div class="stat-icon">
              <ion-icon :icon="trendingUpOutline"></ion-icon>
            </div>
            <div class="stat-info">
              <span class="stat-label">Ventas Totales</span>
              <span class="stat-value">€45,230</span>
            </div>
          </div>
          <div class="stat-card stat-success">
            <div class="stat-icon">
              <ion-icon :icon="peopleOutline"></ion-icon>
            </div>
            <div class="stat-info">
              <span class="stat-label">Nuevos Clientes</span>
              <span class="stat-value">1,234</span>
            </div>
          </div>
          <div class="stat-card stat-warning">
            <div class="stat-icon">
              <ion-icon :icon="cartOutline"></ion-icon>
            </div>
            <div class="stat-info">
              <span class="stat-label">Pedidos Activos</span>
              <span class="stat-value">89</span>
            </div>
          </div>
          <div class="stat-card stat-info">
            <div class="stat-icon">
              <ion-icon :icon="statsChartOutline"></ion-icon>
            </div>
            <div class="stat-info">
              <span class="stat-label">Conversión</span>
              <span class="stat-value">23.4%</span>
            </div>
          </div>
        </div>

        <!-- Fila principal con gráficos grandes -->
        <div class="row row-main">
          <div class="chart-card chart-large">
            <div class="card-header">
              <h3>Ventas por Mes</h3>
              <ion-badge color="success">+12.5%</ion-badge>
            </div>
            <div class="chart-surface">
              <canvas ref="salesChartRef"></canvas>
            </div>
          </div>
          <div class="chart-card">
            <div class="card-header">
              <h3>Categorías Top</h3>
            </div>
            <div class="chart-surface">
              <div ref="categoriesEchartRef" class="chart-host"></div>
            </div>
          </div>
        </div>

        <!-- Fila secundaria -->
        <div class="row row-secondary">
          <div class="chart-card">
            <div class="card-header">
              <h3>Ingresos vs Gastos</h3>
            </div>
            <div class="chart-surface">
              <div ref="incomeApexRef" class="chart-host"></div>
            </div>
          </div>
          <div class="chart-card">
            <div class="card-header">
              <h3>Usuarios Activos</h3>
            </div>
            <div class="chart-surface">
              <canvas ref="usersChartRef"></canvas>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonIcon,
  IonBadge
} from '@ionic/vue';
import { 
  trendingUpOutline,
  peopleOutline,
  cartOutline,
  statsChartOutline
} from 'ionicons/icons';
import {
  Chart,
  type ChartConfiguration,
  registerables,
} from 'chart.js';
import ApexCharts from 'apexcharts';
import * as echarts from 'echarts';

Chart.register(...registerables);

const salesChartRef = ref<HTMLCanvasElement | null>(null);
const usersChartRef = ref<HTMLCanvasElement | null>(null);
const incomeApexRef = ref<HTMLDivElement | null>(null);
const categoriesEchartRef = ref<HTMLDivElement | null>(null);

let salesChart: Chart | null = null;
let usersChart: Chart | null = null;
let incomeApexChart: ApexCharts | null = null;
let categoriesEchart: echarts.ECharts | null = null;

const buildSalesChart = () => {
  if (!salesChartRef.value) return;

  const config: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Ventas',
          data: [12500, 15400, 17300, 16900, 20100, 22400, 25800],
          borderColor: '#6CB65C',
          backgroundColor: 'rgba(108, 182, 92, 0.16)',
          tension: 0.35,
          fill: true,
          pointRadius: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: {
          ticks: {
            callback: (value) => `€${value}`,
          },
          grid: {
            color: '#ecf0ef',
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  };

  salesChart = new Chart(salesChartRef.value, config);
};

const buildUsersChart = () => {
  if (!usersChartRef.value) return;

  const config: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      datasets: [
        {
          label: 'Usuarios activos',
          data: [820, 910, 980, 1120, 1070, 890, 940],
          borderRadius: 8,
          backgroundColor: '#6CB65C',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: {
          grid: {
            color: '#ecf0ef',
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  };

  usersChart = new Chart(usersChartRef.value, config);
};

const buildIncomeApex = async () => {
  if (!incomeApexRef.value) return;

  incomeApexChart = new ApexCharts(incomeApexRef.value, {
    chart: {
      type: 'bar',
      height: '100%',
      toolbar: { show: false },
      fontFamily: 'inherit',
    },
    colors: ['#6CB65C', '#EF5350'],
    series: [
      {
        name: 'Ingresos',
        data: [11, 14, 13, 17, 19, 24],
      },
      {
        name: 'Gastos',
        data: [8, 9, 10, 11, 13, 16],
      },
    ],
    xaxis: {
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    },
    legend: {
      position: 'top',
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '45%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: '#ecf0ef',
    },
    yaxis: {
      labels: {
        formatter: (value: number) => `€${value}k`,
      },
    },
  });

  await incomeApexChart.render();
};

const buildCategoriesEchart = () => {
  if (!categoriesEchartRef.value) return;

  categoriesEchart = echarts.init(categoriesEchartRef.value);
  categoriesEchart.setOption({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: 0,
      left: 'center',
      textStyle: {
        color: '#666',
      },
    },
    series: [
      {
        name: 'Categorías',
        type: 'pie',
        radius: ['45%', '72%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 2,
        },
        color: ['#6CB65C', '#42A5F5', '#FFB74D', '#EC407A', '#26A69A'],
        data: [
          { value: 35, name: 'Fruta y Verdura' },
          { value: 22, name: 'Carnes' },
          { value: 18, name: 'Pescados' },
          { value: 14, name: 'Congelados' },
          { value: 11, name: 'Otros' },
        ],
      },
    ],
  });
};

const resizeCharts = () => {
  categoriesEchart?.resize();
  incomeApexChart?.updateOptions({}, true, true);
};

onMounted(async () => {
  buildSalesChart();
  buildUsersChart();
  await buildIncomeApex();
  buildCategoriesEchart();
  window.addEventListener('resize', resizeCharts);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCharts);
  salesChart?.destroy();
  usersChart?.destroy();
  categoriesEchart?.dispose();
  incomeApexChart?.destroy();
});
</script>

<style scoped>
.custom-header {
  box-shadow: none;
}

.custom-toolbar {
  --background: #6CB65C;
  --color: #ffffff;
}

.header-title {
  font-weight: 600;
  font-size: 18px;
}

@media (max-width: 768px) {
  .header-title {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .header-title {
    font-size: 15px;
  }
}

.custom-content {
  --background: #f5f5f5;
}

.dashboard-container {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Quick Stats */
.quick-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.stat-primary .stat-icon {
  background: linear-gradient(135deg, #6CB65C 0%, #5a9e4c 100%);
  color: #ffffff;
}

.stat-success .stat-icon {
  background: linear-gradient(135deg, #4CAF50 0%, #388E3C 100%);
  color: #ffffff;
}

.stat-warning .stat-icon {
  background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%);
  color: #ffffff;
}

.stat-info .stat-icon {
  background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
  color: #ffffff;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 13px;
  color: #999999;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 22px;
  font-weight: 700;
  color: #333333;
}

/* Chart Cards */
.row {
  display: grid;
  gap: 20px;
  margin-bottom: 24px;
}

.row-main {
  grid-template-columns: 2fr 1fr;
}

.row-secondary {
  grid-template-columns: 1fr 1fr;
}

.chart-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s ease;
}

.chart-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.chart-large {
  min-height: 380px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-header h3 {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  color: #333333;
}

.chart-surface {
  background: #f5f5f5;
  border-radius: 12px;
  min-height: 280px;
  border: 1px solid #e7ece9;
  padding: 12px;
  position: relative;
}

.chart-host {
  width: 100%;
  height: 100%;
  min-height: 252px;
}

canvas {
  width: 100% !important;
  height: 100% !important;
  min-height: 252px;
}

ion-badge {
  font-size: 12px;
  padding: 6px 10px;
}

@media (max-width: 768px) {
  ion-badge {
    font-size: 11px;
    padding: 5px 8px;
  }
}

@media (max-width: 480px) {
  ion-badge {
    font-size: 10px;
    padding: 4px 7px;
  }
}

/* Responsive design */

/* Desktop Grande */
@media (min-width: 1440px) {
  .dashboard-container {
    padding: 32px;
  }
}

/* Tablet y Desktop Pequeño */
@media (max-width: 1200px) {
  .quick-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .row-main {
    grid-template-columns: 1fr;
  }
  
  .chart-large {
    min-height: 320px;
  }
}

/* Tablet */
@media (max-width: 992px) {
  .dashboard-container {
    padding: 20px;
  }
  
  .row-secondary {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    padding: 18px;
  }
  
  .stat-icon {
    width: 52px;
    height: 52px;
    font-size: 26px;
  }
  
  .stat-value {
    font-size: 20px;
  }
}

/* Mobile Grande */
@media (max-width: 768px) {
  .dashboard-container {
    padding: 16px;
  }
  
  .quick-stats {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .stat-card {
    padding: 16px;
    gap: 12px;
  }
  
  .stat-icon {
    width: 48px;
    height: 48px;
    font-size: 24px;
  }
  
  .stat-label {
    font-size: 12px;
  }
  
  .stat-value {
    font-size: 18px;
  }
  
  .row {
    gap: 16px;
    margin-bottom: 16px;
  }
  
  .chart-card {
    padding: 20px;
  }
  
  .card-header h3 {
    font-size: 16px;
  }
  
  .chart-surface {
    min-height: 220px;
  }
  
  .chart-large {
    min-height: 280px;
  }
}

/* Mobile Pequeño */
@media (max-width: 480px) {
  .dashboard-container {
    padding: 12px;
  }
  
  .quick-stats {
    gap: 10px;
  }
  
  .stat-card {
    padding: 14px;
    gap: 10px;
  }
  
  .stat-icon {
    width: 44px;
    height: 44px;
    font-size: 22px;
  }
  
  .stat-value {
    font-size: 16px;
  }
  
  .chart-card {
    padding: 16px;
  }
  
  .card-header h3 {
    font-size: 15px;
  }
  
  .chart-surface {
    min-height: 200px;
  }
}
</style>
