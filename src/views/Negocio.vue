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
            <div class="stat-content">
              <span class="stat-label">CLICS</span>
              <span class="stat-value">1234</span>
              <div class="mini-chart">
                <canvas ref="miniChart1"></canvas>
              </div>
            </div>
            <div class="stat-icon">
              <ion-icon :icon="trendingUpOutline"></ion-icon>
            </div>
          </div>
          <div class="stat-card stat-info">
            <div class="stat-content">
              <span class="stat-label">VISTAS</span>
              <span class="stat-value">1982</span>
              <div class="mini-chart">
                <canvas ref="miniChart2"></canvas>
              </div>
            </div>
            <div class="stat-icon">
              <ion-icon :icon="eyeOutline"></ion-icon>
            </div>
          </div>
          <div class="stat-card stat-danger">
            <div class="stat-content">
              <span class="stat-label">VENTAS</span>
              <span class="stat-value">2011</span>
              <div class="mini-chart">
                <canvas ref="miniChart3"></canvas>
              </div>
            </div>
            <div class="stat-icon">
              <ion-icon :icon="cartOutline"></ion-icon>
            </div>
          </div>
          <div class="stat-card stat-success">
            <div class="stat-content">
              <span class="stat-label">INGRESOS</span>
              <span class="stat-value">627K€</span>
              <div class="mini-chart">
                <canvas ref="miniChart4"></canvas>
              </div>
            </div>
            <div class="stat-icon">
              <ion-icon :icon="cashOutline"></ion-icon>
            </div>
          </div>
        </div>

        <!-- Gráfico principal grande -->
        <div class="main-chart">
          <div class="chart-card">
            <div class="card-header">
              <h3>Ventas por Mes</h3>
              <ion-badge color="success">+12.5%</ion-badge>
            </div>
            <div class="chart-surface">
              <canvas ref="salesChartRef"></canvas>
            </div>
          </div>
        </div>

        <!-- Grid de gráficos secundarios -->
        <div class="secondary-grid">
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
              <h3>Categorías Top</h3>
            </div>
            <div class="chart-surface">
              <div ref="categoriesEchartRef" class="chart-host"></div>
            </div>
          </div>
          
          <div class="chart-card">
            <div class="card-header">
              <h3>Conversión</h3>
            </div>
            <div class="chart-surface">
              <div ref="conversionGaugeRef" class="chart-host"></div>
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

        <div class="custom-chart-row">
          <div class="chart-card custom-chart-card">
            <div class="card-header">
              <h3>Indice de Salud Comercial (Grafico Propio)</h3>
              <ion-badge color="tertiary">Sin libreria</ion-badge>
            </div>
            <div class="custom-chart-layout">
              <svg viewBox="0 0 420 200" class="custom-health-chart" aria-label="Grafico propio de salud comercial">
                <defs>
                  <linearGradient id="healthArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#2f80ed" stop-opacity="0.26" />
                    <stop offset="100%" stop-color="#2f80ed" stop-opacity="0.02" />
                  </linearGradient>
                </defs>
                <line x1="30" y1="180" x2="390" y2="180" class="axis-line" />
                <line x1="30" y1="20" x2="30" y2="180" class="axis-line" />
                <polygon :points="customAreaPoints" fill="url(#healthArea)" />
                <polyline :points="customTrendPoints" class="trend-line" />
                <line
                  :x1="activeCustomPoint.x"
                  :x2="activeCustomPoint.x"
                  y1="20"
                  y2="180"
                  class="active-guide"
                />
                <circle
                  v-for="point in customPoints"
                  :key="point.label"
                  :cx="point.x"
                  :cy="point.y"
                  :r="activeCustomPoint.label === point.label ? 7 : 4.5"
                  class="trend-point"
                  :class="{ active: activeCustomPoint.label === point.label }"
                  tabindex="0"
                  role="button"
                  @mouseenter="hoveredPointIndex = point.index"
                  @focus="hoveredPointIndex = point.index"
                />
                <text
                  :x="activeCustomPoint.x"
                  :y="activeCustomPoint.y - 16"
                  class="point-value-label"
                  text-anchor="middle"
                >{{ activeCustomPoint.value }}</text>
              </svg>
              <div class="custom-insights">
                <div class="custom-insight-card">
                  <span class="insight-kicker">Punto activo</span>
                  <strong>{{ activeCustomPoint.label }}</strong>
                  <span class="insight-value">{{ activeCustomPoint.value }}/100</span>
                  <p>{{ activeCustomPoint.description }}</p>
                </div>
                <div class="custom-bars" @mouseleave="hoveredPointIndex = null">
                  <div
                    class="bar-item"
                    v-for="bar in customBars"
                    :key="bar.label"
                    @mouseenter="hoveredPointIndex = bar.index"
                  >
                  <div class="bar-outer">
                    <div
                      class="bar-inner"
                      :class="{ active: activeCustomPoint.label === bar.label }"
                      :style="{ height: `${bar.height}px` }"
                    ></div>
                  </div>
                  <span class="bar-label">{{ bar.label }}</span>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
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
  eyeOutline,
  cartOutline,
  cashOutline
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
const conversionGaugeRef = ref<HTMLDivElement | null>(null);
const miniChart1 = ref<HTMLCanvasElement | null>(null);
const miniChart2 = ref<HTMLCanvasElement | null>(null);
const miniChart3 = ref<HTMLCanvasElement | null>(null);
const miniChart4 = ref<HTMLCanvasElement | null>(null);

let salesChart: Chart | null = null;
let usersChart: Chart | null = null;
let incomeApexChart: ApexCharts | null = null;
let categoriesEchart: echarts.ECharts | null = null;
let conversionGauge: echarts.ECharts | null = null;
let mini1: Chart | null = null;
let mini2: Chart | null = null;
let mini3: Chart | null = null;
let mini4: Chart | null = null;

const customHealthData = [62, 68, 74, 71, 79, 84, 88];
const customHealthLabels = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
const customHealthNotes = [
  'Base estable con margen de mejora comercial.',
  'Aumento sostenido tras reforzar trafico cualificado.',
  'La conversion crece con mayor regularidad.',
  'Ligera correccion sin afectar la tendencia general.',
  'Buen equilibrio entre captacion y ventas cerradas.',
  'Repunte claro apoyado por mejor ticket medio.',
  'Maximo semanal con respuesta comercial muy positiva.',
];
const hoveredPointIndex = ref<number | null>(null);

const customPoints = computed(() => customHealthData.map((value, index) => ({
  index,
  label: customHealthLabels[index],
  value,
  description: customHealthNotes[index],
  x: 30 + (index * 60),
  y: 180 - (value * 1.6),
})));

const activeCustomPoint = computed(() => customPoints.value[hoveredPointIndex.value ?? 4]);

const customTrendPoints = computed(() => customPoints.value
  .map((point) => `${point.x},${point.y}`)
  .join(' '));

const customAreaPoints = computed(() => `30,180 ${customTrendPoints.value} 390,180`);

const customBars = computed(() => customPoints.value.map((point) => {
  const height = point.value * 1.3;
  return {
    index: point.index,
    label: point.label,
    height,
  };
}));

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
      height: 220,
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
      bottom: -5,
      left: 'center',
      textStyle: {
        color: '#666',
        fontSize: 11
      },
      itemGap: 10,
      padding: [10, 0, 0, 0]
    },
    series: [
      {
        name: 'Categorías',
        type: 'pie',
        radius: ['40%', '65%'],
        center: ['50%', '45%'],
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

const buildConversionGauge = () => {
  if (!conversionGaugeRef.value) return;

  conversionGauge = echarts.init(conversionGaugeRef.value);
  conversionGauge.setOption({
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
              [1, '#6CB65C']
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
            value: 70,
            name: 'Conversión'
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

  if (miniChart1.value) mini1 = miniConfig(miniChart1.value, [20, 35, 28, 42, 38, 50], '#2196F3', 'rgba(33, 150, 243, 0.1)');
  if (miniChart2.value) mini2 = miniConfig(miniChart2.value, [15, 25, 20, 32, 28, 35], '#9C27B0', 'rgba(156, 39, 176, 0.1)');
  if (miniChart3.value) mini3 = miniConfig(miniChart3.value, [25, 40, 35, 50, 45, 60], '#FF5722', 'rgba(255, 87, 34, 0.1)');
  if (miniChart4.value) mini4 = miniConfig(miniChart4.value, [30, 45, 40, 55, 50, 65], '#4CAF50', 'rgba(76, 175, 80, 0.1)');
};

const resizeCharts = () => {
  categoriesEchart?.resize();
  conversionGauge?.resize();
  incomeApexChart?.updateOptions({}, true, true);
};

onMounted(async () => {
  buildSalesChart();
  buildUsersChart();
  await buildIncomeApex();
  buildCategoriesEchart();
  buildConversionGauge();
  buildMiniCharts();
  window.addEventListener('resize', resizeCharts);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCharts);
  salesChart?.destroy();
  usersChart?.destroy();
  categoriesEchart?.dispose();
  conversionGauge?.dispose();
  incomeApexChart?.destroy();
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

.stat-card.stat-info {
  border-left: 4px solid #9C27B0;
}

.stat-card.stat-danger {
  border-left: 4px solid #FF5722;
}

.stat-card.stat-success {
  border-left: 4px solid #4CAF50;
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
  width: 54px;
  height: 54px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  z-index: 1;
}

.stat-icon ion-icon {
  font-size: 30px;
}

.stat-card.stat-primary .stat-icon {
  color: #2196f3;
  background: rgba(33, 150, 243, 0.15);
}

.stat-card.stat-info .stat-icon {
  color: #9c27b0;
  background: rgba(156, 39, 176, 0.15);
}

.stat-card.stat-danger .stat-icon {
  color: #ff5722;
  background: rgba(255, 87, 34, 0.15);
}

.stat-card.stat-success .stat-icon {
  color: #4caf50;
  background: rgba(76, 175, 80, 0.15);
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

.custom-chart-row {
  margin-top: 16px;
}

.custom-chart-card {
  min-height: 320px;
}

.custom-chart-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  align-items: center;
}

.custom-insights {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.custom-insight-card {
  padding: 14px;
  border-radius: 14px;
  background: linear-gradient(180deg, #f4f8ff 0%, #eef6ff 100%);
  border: 1px solid #d8e6fb;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.insight-kicker {
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #5d7fa6;
  margin-bottom: 4px;
}

.custom-insight-card strong {
  display: block;
  font-size: 20px;
  color: #1f3f66;
}

.insight-value {
  display: inline-block;
  margin-top: 4px;
  font-size: 14px;
  font-weight: 700;
  color: #2f80ed;
}

.custom-insight-card p {
  margin: 10px 0 0;
  font-size: 13px;
  line-height: 1.45;
  color: #4a617e;
}

.custom-health-chart {
  width: 100%;
  height: 220px;
  background: linear-gradient(180deg, rgba(47, 128, 237, 0.06), rgba(47, 128, 237, 0));
  border-radius: 10px;
}

.axis-line {
  stroke: #c7d8ef;
  stroke-width: 1.5;
}

.trend-line {
  fill: none;
  stroke: #2f80ed;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.active-guide {
  stroke: rgba(47, 128, 237, 0.28);
  stroke-width: 1.5;
  stroke-dasharray: 4 4;
}

.trend-point {
  fill: #2f80ed;
  stroke: #ffffff;
  stroke-width: 2;
  cursor: pointer;
  transition: transform 0.18s ease, fill 0.18s ease;
}

.trend-point.active,
.trend-point:hover,
.trend-point:focus {
  fill: #1459b8;
}

.point-value-label {
  font-size: 12px;
  font-weight: 700;
  fill: #1459b8;
}

.custom-bars {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 8px;
  height: 190px;
}

.bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.bar-outer {
  width: 24px;
  height: 160px;
  border-radius: 999px;
  background: #e7effa;
  display: flex;
  align-items: flex-end;
  padding: 3px;
}

.bar-inner {
  width: 100%;
  border-radius: 999px;
  background: linear-gradient(180deg, #2f80ed 0%, #56ccf2 100%);
  transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
}

.bar-inner.active {
  transform: scaleX(1.08);
  box-shadow: 0 10px 18px rgba(47, 128, 237, 0.22);
}

.bar-label {
  font-size: 11px;
  color: #5c6a7a;
  font-weight: 600;
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

/* Chart Cards */
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

  .custom-chart-layout {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .custom-health-chart {
    height: 200px;
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
