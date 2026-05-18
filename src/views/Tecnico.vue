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
        <!-- Header con métricas técnicas -->
        <div class="quick-stats">
          <div class="stat-card stat-primary">
            <div class="stat-content">
              <span class="stat-label">RENDIMIENTO</span>
              <span class="stat-value">98.5%</span>
              <div class="mini-chart">
                <canvas ref="miniChart1"></canvas>
              </div>
            </div>
            <div class="stat-icon">
              <ion-icon :icon="speedometerOutline"></ion-icon>
            </div>
          </div>
          <div class="stat-card stat-success">
            <div class="stat-content">
              <span class="stat-label">UPTIME</span>
              <span class="stat-value">99.9%</span>
              <div class="mini-chart">
                <canvas ref="miniChart2"></canvas>
              </div>
            </div>
            <div class="stat-icon">
              <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
            </div>
          </div>
          <div class="stat-card stat-danger">
            <div class="stat-content">
              <span class="stat-label">ERRORES</span>
              <span class="stat-value">12</span>
              <div class="mini-chart">
                <canvas ref="miniChart3"></canvas>
              </div>
            </div>
            <div class="stat-icon">
              <ion-icon :icon="alertCircleOutline"></ion-icon>
            </div>
          </div>
          <div class="stat-card stat-info">
            <div class="stat-content">
              <span class="stat-label">API CALLS</span>
              <span class="stat-value">45.2K</span>
              <div class="mini-chart">
                <canvas ref="miniChart4"></canvas>
              </div>
            </div>
            <div class="stat-icon">
              <ion-icon :icon="serverOutline"></ion-icon>
            </div>
          </div>
        </div>

        <!-- Gráfico principal grande -->
        <div class="main-chart">
          <div class="chart-card">
            <div class="card-header">
              <h3>Uso de CPU en Tiempo Real</h3>
              <ion-badge color="warning">En vivo</ion-badge>
            </div>
            <div class="chart-surface">
              <canvas ref="systemRealtimeChartRef"></canvas>
            </div>
          </div>
        </div>

        <!-- Grid de gráficos secundarios -->
        <div class="secondary-grid">
          <div class="chart-card">
            <div class="card-header">
              <h3>Distribución de Errores</h3>
            </div>
            <div class="chart-surface">
              <canvas ref="errorChartRef"></canvas>
            </div>
          </div>
          
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
          
          <div class="chart-card">
            <div class="card-header">
              <h3>Disponibilidad</h3>
            </div>
            <div class="chart-surface">
              <div ref="availabilityGaugeRef" class="chart-host"></div>
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
const availabilityGaugeRef = ref<HTMLDivElement | null>(null);
const miniChart1 = ref<HTMLCanvasElement | null>(null);
const miniChart2 = ref<HTMLCanvasElement | null>(null);
const miniChart3 = ref<HTMLCanvasElement | null>(null);
const miniChart4 = ref<HTMLCanvasElement | null>(null);

let systemRealtimeChart: Chart | null = null;
let errorChart: Chart | null = null;
let apiResponseApexChart: ApexCharts | null = null;
let networkEchart: echarts.ECharts | null = null;
let availabilityGauge: echarts.ECharts | null = null;
let realtimeInterval: number | null = null;
let mini1: Chart | null = null;
let mini2: Chart | null = null;
let mini3: Chart | null = null;
let mini4: Chart | null = null;

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
      height: 224,
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

const buildAvailabilityGauge = () => {
  if (!availabilityGaugeRef.value) return;

  availabilityGauge = echarts.init(availabilityGaugeRef.value);
  availabilityGauge.setOption({
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 4,
        radius: '90%',
        center: ['50%', '75%'],
        axisLine: {
          lineStyle: {
            width: 20,
            color: [
              [0.3, '#EF5350'],
              [0.7, '#FFB74D'],
              [1, '#4CAF50']
            ]
          }
        },
        pointer: {
          width: 4,
          length: '65%',
          itemStyle: {
            color: '#333'
          }
        },
        axisTick: {
          distance: -20,
          length: 8,
          lineStyle: {
            color: '#fff',
            width: 2
          }
        },
        splitLine: {
          distance: -20,
          length: 14,
          lineStyle: {
            color: '#fff',
            width: 3
          }
        },
        axisLabel: {
          distance: 30,
          color: '#999',
          fontSize: 12,
          formatter: (value: number) => value + '%'
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}%',
          color: '#333',
          fontSize: 32,
          fontWeight: 'bold',
          offsetCenter: [0, '40%']
        },
        title: {
          show: true,
          offsetCenter: [0, '15%'],
          fontSize: 14,
          color: '#666',
          fontWeight: 'normal'
        },
        data: [
          {
            value: 99.9,
            name: 'Disponibilidad'
          }
        ]
      }
    ]
  });
};

const buildMiniCharts = () => {
  const miniConfig = (canvas: HTMLCanvasElement, data: number[], color: string, bgColor: string) => {
    return new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['', '', '', '', '', ''],
        datasets: [{
          data: data,
          borderColor: color,
          backgroundColor: bgColor,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        scales: {
          x: { display: false },
          y: { display: false }
        }
      }
    });
  };

  if (miniChart1.value) mini1 = miniConfig(miniChart1.value, [85, 90, 88, 92, 95, 98], '#2196F3', 'rgba(33, 150, 243, 0.1)');
  if (miniChart2.value) mini2 = miniConfig(miniChart2.value, [95, 97, 99, 98, 99, 100], '#4CAF50', 'rgba(76, 175, 80, 0.1)');
  if (miniChart3.value) mini3 = miniConfig(miniChart3.value, [5, 8, 12, 10, 15, 12], '#EF5350', 'rgba(239, 83, 80, 0.1)');
  if (miniChart4.value) mini4 = miniConfig(miniChart4.value, [30, 35, 40, 42, 45, 48], '#9C27B0', 'rgba(156, 39, 176, 0.1)');
};

const resizeCharts = () => {
  networkEchart?.resize();
  availabilityGauge?.resize();
  apiResponseApexChart?.updateOptions({}, true, true);
};

onMounted(async () => {
  buildSystemRealtimeChart();
  buildErrorChart();
  await buildApiResponseApex();
  buildNetworkEchart();
  buildAvailabilityGauge();
  buildMiniCharts();
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
  availabilityGauge?.dispose();
  mini1?.destroy();
  mini2?.destroy();
  mini3?.destroy();
  mini4?.destroy();
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
  padding: 20px;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
}

/* Quick Stats */
.quick-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.stat-card {
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  min-height: 120px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.stat-card.stat-primary {
  border-left: 4px solid #2196F3;
}

.stat-card.stat-success {
  border-left: 4px solid #4CAF50;
}

.stat-card.stat-danger {
  border-left: 4px solid #EF5350;
}

.stat-card.stat-info {
  border-left: 4px solid #9C27B0;
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 2;
}

.stat-label {
  font-size: 11px;
  font-weight: 600;
  color: #666666;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #333333;
  line-height: 1;
}

.stat-icon {
  font-size: 40px;
  color: #e0e0e0;
  z-index: 1;
}

.stat-card.stat-primary .stat-icon {
  color: rgba(33, 150, 243, 0.2);
}

.stat-card.stat-success .stat-icon {
  color: rgba(76, 175, 80, 0.2);
}

.stat-card.stat-danger .stat-icon {
  color: rgba(239, 83, 80, 0.2);
}

.stat-card.stat-info .stat-icon {
  color: rgba(156, 39, 176, 0.2);
}

.mini-chart {
  width: 100%;
  height: 35px;
  margin-top: 4px;
}

.mini-chart canvas {
  width: 100% !important;
  height: 100% !important;
}

/* Main Chart */
.main-chart {
  margin-bottom: 20px;
}

.main-chart .chart-card {
  min-height: 350px;
}

/* Secondary Grid */
.secondary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.secondary-grid .chart-card {
  min-height: 280px;
}

.chart-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-header h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #333333;
}

.chart-surface {
  background: transparent;
  border-radius: 8px;
  height: 240px;
  padding: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-chart .chart-surface {
  height: 300px;
}

.chart-host {
  width: 100%;
  height: 100%;
}

canvas {
  width: 100% !important;
  height: 100% !important;
}

.main-chart canvas {
  height: 280px !important;
}

ion-badge {
  font-size: 11px;
  padding: 5px 10px;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 1200px) {
  .secondary-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .quick-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .secondary-grid {
    grid-template-columns: 1fr;
  }
  
  .dashboard-container {
    padding: 16px;
  }
  
  .stat-value {
    font-size: 26px;
  }
  
  .stat-label {
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .quick-stats {
    grid-template-columns: 1fr;
  }
}
</style>
