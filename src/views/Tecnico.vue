<template>
  <ion-page>
    <ion-header :translucent="true" class="custom-header">
      <ion-toolbar class="custom-toolbar">
        <ion-buttons slot="start">
          <ion-menu-button color="light"></ion-menu-button>
        </ion-buttons>
        <ion-title class="header-title">Dashboard Técnico</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="custom-content">
      <div class="dashboard-container">
        <div class="quick-stats">
          <div class="stat-card stat-primary">
            <div class="stat-icon">
              <ion-icon :icon="speedometerOutline"></ion-icon>
            </div>
            <div class="stat-info">
              <span class="stat-label">Rendimiento</span>
              <span class="stat-value">98.5%</span>
            </div>
          </div>
          <div class="stat-card stat-success">
            <div class="stat-icon">
              <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
            </div>
            <div class="stat-info">
              <span class="stat-label">Uptime</span>
              <span class="stat-value">99.9%</span>
            </div>
          </div>
          <div class="stat-card stat-danger">
            <div class="stat-icon">
              <ion-icon :icon="alertCircleOutline"></ion-icon>
            </div>
            <div class="stat-info">
              <span class="stat-label">Errores</span>
              <span class="stat-value">12</span>
            </div>
          </div>
          <div class="stat-card stat-info">
            <div class="stat-icon">
              <ion-icon :icon="serverOutline"></ion-icon>
            </div>
            <div class="stat-info">
              <span class="stat-label">API Calls</span>
              <span class="stat-value">45.2K</span>
            </div>
          </div>
        </div>

        <div class="row row-main">
          <div class="chart-card chart-large">
            <div class="card-header">
              <h3>Uso de Recursos del Sistema</h3>
              <ion-badge color="warning">En vivo</ion-badge>
            </div>
            <div class="chart-surface">
              <canvas ref="systemRealtimeChartRef"></canvas>
            </div>
          </div>

          <div class="chart-card">
            <div class="card-header">
              <h3>Distribución de Errores</h3>
            </div>
            <div class="chart-surface">
              <canvas ref="errorChartRef"></canvas>
            </div>
          </div>
        </div>

        <div class="row row-secondary">
          <div class="chart-card">
            <div class="card-header">
              <h3>Tiempo de Respuesta API</h3>
            </div>
            <div class="chart-surface">
              <div ref="apiResponseApexRef" class="chart-host"></div>
            </div>
          </div>

          <div class="chart-card">
            <div class="card-header">
              <h3>Tráfico de Red</h3>
            </div>
            <div class="chart-surface">
              <div ref="networkEchartRef" class="chart-host"></div>
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
  IonBadge,
} from '@ionic/vue';
import {
  speedometerOutline,
  checkmarkCircleOutline,
  alertCircleOutline,
  serverOutline,
} from 'ionicons/icons';
import {
  Chart,
  type ChartConfiguration,
  registerables,
} from 'chart.js';
import ApexCharts from 'apexcharts';
import * as echarts from 'echarts';

Chart.register(...registerables);

const systemRealtimeChartRef = ref<HTMLCanvasElement | null>(null);
const errorChartRef = ref<HTMLCanvasElement | null>(null);
const apiResponseApexRef = ref<HTMLDivElement | null>(null);
const networkEchartRef = ref<HTMLDivElement | null>(null);

let systemRealtimeChart: Chart | null = null;
let errorChart: Chart | null = null;
let apiResponseApexChart: ApexCharts | null = null;
let networkEchart: echarts.ECharts | null = null;
let realtimeInterval: number | null = null;

const buildSystemRealtimeChart = () => {
  if (!systemRealtimeChartRef.value) return;

  const config: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      labels: Array.from({ length: 10 }, (_, i) => `${i * 5}s`),
      datasets: [
        {
          label: 'CPU %',
          data: [58, 62, 65, 61, 67, 72, 70, 74, 71, 76],
          borderColor: '#6CB65C',
          backgroundColor: 'rgba(108, 182, 92, 0.18)',
          fill: true,
          tension: 0.35,
          pointRadius: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            callback: (value) => `${value}%`,
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

  systemRealtimeChart = new Chart(systemRealtimeChartRef.value, config);

  realtimeInterval = window.setInterval(() => {
    if (!systemRealtimeChart) return;
    const data = systemRealtimeChart.data.datasets[0].data as number[];
    const next = Math.min(95, Math.max(35, data[data.length - 1] + (Math.random() * 12 - 6)));
    data.shift();
    data.push(Math.round(next));
    systemRealtimeChart.update();
  }, 1800);
};

const buildErrorChart = () => {
  if (!errorChartRef.value) return;

  const config: ChartConfiguration<'doughnut'> = {
    type: 'doughnut',
    data: {
      labels: ['4xx', '5xx', 'Timeout', 'Auth'],
      datasets: [
        {
          data: [41, 22, 17, 20],
          backgroundColor: ['#42A5F5', '#EF5350', '#FFB74D', '#AB47BC'],
          borderWidth: 2,
          borderColor: '#fff',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    },
  };

  errorChart = new Chart(errorChartRef.value, config);
};

const buildApiResponseApex = async () => {
  if (!apiResponseApexRef.value) return;

  apiResponseApexChart = new ApexCharts(apiResponseApexRef.value, {
    chart: {
      type: 'area',
      height: '100%',
      toolbar: { show: false },
      fontFamily: 'inherit',
    },
    colors: ['#6CB65C'],
    series: [
      {
        name: 'ms',
        data: [220, 245, 210, 260, 240, 230, 215, 225, 235, 218],
      },
    ],
    xaxis: {
      categories: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.28,
        opacityTo: 0.04,
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => `${Math.round(value)} ms`,
      },
    },
    grid: {
      borderColor: '#ecf0ef',
    },
  });

  await apiResponseApexChart.render();
};

const buildNetworkEchart = () => {
  if (!networkEchartRef.value) return;

  networkEchart = echarts.init(networkEchartRef.value);
  networkEchart.setOption({
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      top: 0,
      textStyle: {
        color: '#666',
      },
    },
    grid: {
      top: 34,
      right: 12,
      bottom: 12,
      left: 12,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} Mbps',
      },
    },
    series: [
      {
        name: 'Entrada',
        type: 'line',
        smooth: true,
        data: [220, 190, 240, 260, 230, 180, 210],
        lineStyle: {
          width: 3,
        },
        areaStyle: {
          opacity: 0.1,
        },
        color: '#42A5F5',
      },
      {
        name: 'Salida',
        type: 'line',
        smooth: true,
        data: [140, 125, 150, 165, 158, 132, 148],
        lineStyle: {
          width: 3,
        },
        color: '#6CB65C',
      },
    ],
  });
};

const resizeCharts = () => {
  networkEchart?.resize();
  apiResponseApexChart?.updateOptions({}, true, true);
};

onMounted(async () => {
  buildSystemRealtimeChart();
  buildErrorChart();
  await buildApiResponseApex();
  buildNetworkEchart();
  window.addEventListener('resize', resizeCharts);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCharts);
  if (realtimeInterval) {
    window.clearInterval(realtimeInterval);
  }
  systemRealtimeChart?.destroy();
  errorChart?.destroy();
  apiResponseApexChart?.destroy();
  networkEchart?.dispose();
});
</script>

<style scoped>
.custom-header {
  box-shadow: none;
}

.custom-toolbar {
  --background: #6cb65c;
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
  background: linear-gradient(135deg, #6cb65c 0%, #5a9e4c 100%);
  color: #ffffff;
}

.stat-success .stat-icon {
  background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
  color: #ffffff;
}

.stat-danger .stat-icon {
  background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
  color: #ffffff;
}

.stat-info .stat-icon {
  background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
  color: #ffffff;
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

@media (max-width: 1200px) {
  .quick-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .row-main {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 992px) {
  .row-secondary {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 16px;
  }

  .quick-stats {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .chart-card {
    padding: 18px;
  }

  .chart-surface {
    min-height: 220px;
  }
}
</style><template>
  <ion-page>
    <ion-header :translucent="true" class="custom-header">
      <ion-toolbar class="custom-toolbar">
        <ion-buttons slot="start">
          <ion-menu-button color="light"></ion-menu-button>
        </ion-buttons>
        <ion-title class="header-title">Dashboard Técnico</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="custom-content">
      <div class="dashboard-container">
        <!-- Header con métricas técnicas -->
        <div class="quick-stats">
          <div class="stat-card stat-primary">
            <div class="stat-icon">
              <ion-icon :icon="speedometerOutline"></ion-icon>
            </div>
            <div class="stat-info">
              <span class="stat-label">Rendimiento</span>
              <span class="stat-value">98.5%</span>
            </div>
          </div>
          <div class="stat-card stat-success">
            <div class="stat-icon">
              <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
            </div>
            <div class="stat-info">
              <span class="stat-label">Uptime</span>
              <span class="stat-value">99.9%</span>
            </div>
          </div>
          <div class="stat-card stat-danger">
            <div class="stat-icon">
              <ion-icon :icon="alertCircleOutline"></ion-icon>
            </div>
            <div class="stat-info">
              <span class="stat-label">Errores</span>
              <span class="stat-value">12</span>
            </div>
          </div>
          <div class="stat-card stat-info">
            <div class="stat-icon">
              <ion-icon :icon="serverOutline"></ion-icon>
            </div>
            <div class="stat-info">
              <span class="stat-label">API Calls</span>
              <span class="stat-value">45.2K</span>
            </div>
          </div>
        </div>

        <!-- Fila principal con gráficos grandes -->
        <div class="row row-main">
          <div class="chart-card chart-large">
            <div class="card-header">
              <h3>Uso de Recursos del Sistema</h3>
              <ion-badge color="warning">En vivo</ion-badge>
            </div>
            <div class="chart-placeholder">
              <span class="placeholder-text">Gráfico de líneas en tiempo real</span>
            </div>
          </div>
          <div class="chart-card">
            <div class="card-header">
              <h3>Distribución de Errores</h3>
            </div>
            <div class="chart-placeholder">
              <span class="placeholder-text">Gráfico de barras</span>
            </div>
          </div>
        </div>

        <!-- Fila secundaria -->
        <div class="row row-secondary">
          <div class="chart-card">
            <div class="card-header">
              <h3>Tiempo de Respuesta API</h3>
            </div>
            <div class="chart-placeholder">
              <span class="placeholder-text">Gráfico de área</span>
            </div>
          </div>
          <div class="chart-card">
            <div class="card-header">
              <h3>Tráfico de Red</h3>
            </div>
            <div class="chart-placeholder">
              <span class="placeholder-text">Gráfico de líneas</span>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
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
  speedometerOutline,
  checkmarkCircleOutline,
  alertCircleOutline,
  serverOutline
} from 'ionicons/icons';
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

.stat-danger .stat-icon {
  background: linear-gradient(135deg, #F44336 0%, #D32F2F 100%);
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

.chart-placeholder {
  background: #f5f5f5;
  border-radius: 12px;
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #e0e0e0;
}

.placeholder-text {
  color: #999999;
  font-size: 14px;
  font-weight: 500;
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
  
  .chart-placeholder {
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
  
  .chart-placeholder {
    min-height: 200px;
  }
  
  .placeholder-text {
    font-size: 13px;
  }
}
</style>
