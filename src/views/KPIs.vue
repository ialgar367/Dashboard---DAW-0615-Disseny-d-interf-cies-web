<template>
  <ion-page>
    <ion-header :translucent="true" class="custom-header">
      <ion-toolbar class="custom-toolbar">
        <ion-buttons slot="start">
          <ion-menu-button color="light"></ion-menu-button>
        </ion-buttons>
        <ion-title class="header-title">Indicadores Clave (KPIs)</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="custom-content">
      <div class="kpis-container">
        <!-- KPIs de Negocio -->
        <div class="kpi-section">
          <div class="section-header">
            <div class="header-icon">
              <ion-icon :icon="briefcaseOutline"></ion-icon>
            </div>
            <h2>KPIs de Negocio</h2>
          </div>
          <ion-accordion-group class="custom-accordion-group">
            <ion-accordion value="kpi-negocio-1" class="custom-accordion">
              <ion-item slot="header" class="accordion-header">
                <ion-label>
                  <h3>Tasa de Conversión</h3>
                  <p>Objetivo SMART: Aumentar la tasa de conversión del 18% al 25% en 6 meses (Dic 2026)</p>
                </ion-label>
              </ion-item>
              <div class="accordion-content" slot="content">
                <div class="kpi-card">
                  <div class="kpi-objective">
                    <div class="objective-item"><strong>Específico:</strong> Incrementar conversión de visitantes a compradores</div>
                    <div class="objective-item"><strong>Medible:</strong> De 18% a 25% (+7 puntos porcentuales)</div>
                    <div class="objective-item"><strong>Alcanzable:</strong> Mediante optimización UX y checkout simplificado</div>
                    <div class="objective-item"><strong>Relevante:</strong> Impacta directamente en ingresos sin aumentar tráfico</div>
                    <div class="objective-item"><strong>Temporal:</strong> 6 meses (Julio - Diciembre 2026)</div>
                  </div>
                  <div class="chart-container">
                    <canvas ref="conversionChart"></canvas>
                  </div>
                </div>
              </div>
            </ion-accordion>

            <ion-accordion value="kpi-negocio-2" class="custom-accordion">
              <ion-item slot="header" class="accordion-header">
                <ion-label>
                  <h3>Valor Promedio del Pedido (AOV)</h3>
                  <p>Objetivo SMART: Incrementar AOV de €45 a €60 en 4 meses (Sep 2026)</p>
                </ion-label>
              </ion-item>
              <div class="accordion-content" slot="content">
                <div class="kpi-card">
                  <div class="kpi-objective">
                    <div class="objective-item"><strong>Específico:</strong> Aumentar el ticket promedio por pedido</div>
                    <div class="objective-item"><strong>Medible:</strong> De €45 a €60 (+€15, +33%)</div>
                    <div class="objective-item"><strong>Alcanzable:</strong> Con cross-selling, bundles y descuentos por volumen</div>
                    <div class="objective-item"><strong>Relevante:</strong> Mejora rentabilidad y amortiza costos de envío</div>
                    <div class="objective-item"><strong>Temporal:</strong> 4 meses (Mayo - Septiembre 2026)</div>
                  </div>
                  <div class="chart-container">
                    <canvas ref="aovChart"></canvas>
                  </div>
                </div>
              </div>
            </ion-accordion>

            <ion-accordion value="kpi-negocio-3" class="custom-accordion">
              <ion-item slot="header" class="accordion-header">
                <ion-label>
                  <h3>Retención de Clientes</h3>
                  <p>Objetivo SMART: Aumentar retención mensual del 40% al 55% en 8 meses (Ene 2027)</p>
                </ion-label>
              </ion-item>
              <div class="accordion-content" slot="content">
                <div class="kpi-card">
                  <div class="kpi-objective">
                    <div class="objective-item"><strong>Específico:</strong> Incrementar clientes que recompran en 30 días</div>
                    <div class="objective-item"><strong>Medible:</strong> De 40% a 55% de retención mensual</div>
                    <div class="objective-item"><strong>Alcanzable:</strong> Email marketing, programa de fidelidad y recordatorios</div>
                    <div class="objective-item"><strong>Relevante:</strong> Cliente recurrente cuesta 5x menos que adquirir nuevo</div>
                    <div class="objective-item"><strong>Temporal:</strong> 8 meses (Mayo 2026 - Enero 2027)</div>
                  </div>
                  <div class="chart-container">
                    <canvas ref="retentionChart"></canvas>
                  </div>
                </div>
              </div>
            </ion-accordion>

            <ion-accordion value="kpi-negocio-4" class="custom-accordion">
              <ion-item slot="header" class="accordion-header">
                <ion-label>
                  <h3>Costo de Adquisición (CAC)</h3>
                  <p>Objetivo SMART: Reducir CAC de €22 a €15 en 5 meses (Oct 2026)</p>
                </ion-label>
              </ion-item>
              <div class="accordion-content" slot="content">
                <div class="kpi-card">
                  <div class="kpi-objective">
                    <div class="objective-item"><strong>Específico:</strong> Disminuir costo promedio para adquirir cliente</div>
                    <div class="objective-item"><strong>Medible:</strong> De €22 a €15 por cliente (-€7, -32%)</div>
                    <div class="objective-item"><strong>Alcanzable:</strong> Optimización campañas, SEO orgánico y referidos</div>
                    <div class="objective-item"><strong>Relevante:</strong> Mejora margen y permite escalar marketing</div>
                    <div class="objective-item"><strong>Temporal:</strong> 5 meses (Mayo - Octubre 2026)</div>
                  </div>
                  <div class="chart-container">
                    <canvas ref="cacChart"></canvas>
                  </div>
                </div>
              </div>
            </ion-accordion>

            <ion-accordion value="kpi-negocio-5" class="custom-accordion">
              <ion-item slot="header" class="accordion-header">
                <ion-label>
                  <h3>Tiempo de Vida del Cliente (LTV)</h3>
                  <p>Objetivo SMART: Aumentar LTV de €180 a €280 en 12 meses (May 2027)</p>
                </ion-label>
              </ion-item>
              <div class="accordion-content" slot="content">
                <div class="kpi-card">
                  <div class="kpi-objective">
                    <div class="objective-item"><strong>Específico:</strong> Incrementar valor total generado por cliente</div>
                    <div class="objective-item"><strong>Medible:</strong> De €180 a €280 lifetime value (+€100, +56%)</div>
                    <div class="objective-item"><strong>Alcanzable:</strong> Mejorando retención, frecuencia y ticket promedio</div>
                    <div class="objective-item"><strong>Relevante:</strong> Ratio LTV/CAC óptimo permite crecimiento sostenible</div>
                    <div class="objective-item"><strong>Temporal:</strong> 12 meses (Mayo 2026 - Mayo 2027)</div>
                  </div>
                  <div class="chart-container">
                    <canvas ref="ltvChart"></canvas>
                  </div>
                </div>
              </div>
            </ion-accordion>
          </ion-accordion-group>
        </div>

        <!-- KPIs Técnicos -->
        <div class="kpi-section">
          <div class="section-header">
            <div class="header-icon header-icon-secondary">
              <ion-icon :icon="codeSlashOutline"></ion-icon>
            </div>
            <h2>KPIs Técnicos</h2>
          </div>
          <ion-accordion-group class="custom-accordion-group">
            <ion-accordion value="kpi-tecnico-1" class="custom-accordion">
              <ion-item slot="header" class="accordion-header">
                <ion-label>
                  <h3>Tiempo de Carga de Página</h3>
                  <p>Objetivo SMART: Reducir tiempo de carga de 3.2s a 1.5s en 3 meses (Ago 2026)</p>
                </ion-label>
              </ion-item>
              <div class="accordion-content" slot="content">
                <div class="kpi-card">
                  <div class="kpi-objective">
                    <div class="objective-item"><strong>Específico:</strong> Disminuir tiempo de carga inicial de página</div>
                    <div class="objective-item"><strong>Medible:</strong> De 3.2s a 1.5s (-1.7s, -53%)</div>
                    <div class="objective-item"><strong>Alcanzable:</strong> Lazy loading, CDN, optimización imágenes y código</div>
                    <div class="objective-item"><strong>Relevante:</strong> Mejora UX y SEO, reduce tasa de rebote</div>
                    <div class="objective-item"><strong>Temporal:</strong> 3 meses (Mayo - Agosto 2026)</div>
                  </div>
                  <div class="chart-container">
                    <canvas ref="loadTimeChart"></canvas>
                  </div>
                </div>
              </div>
            </ion-accordion>

            <ion-accordion value="kpi-tecnico-2" class="custom-accordion">
              <ion-item slot="header" class="accordion-header">
                <ion-label>
                  <h3>Tasa de Errores</h3>
                  <p>Objetivo SMART: Reducir error rate del 2.1% al 0.5% en 4 meses (Sep 2026)</p>
                </ion-label>
              </ion-item>
              <div class="accordion-content" slot="content">
                <div class="kpi-card">
                  <div class="kpi-objective">
                    <div class="objective-item"><strong>Específico:</strong> Disminuir porcentaje de peticiones fallidas</div>
                    <div class="objective-item"><strong>Medible:</strong> De 2.1% a 0.5% de error rate (-76%)</div>
                    <div class="objective-item"><strong>Alcanzable:</strong> Monitoring, logs, tests automatizados y retry logic</div>
                    <div class="objective-item"><strong>Relevante:</strong> Mejora confiabilidad y experiencia del usuario</div>
                    <div class="objective-item"><strong>Temporal:</strong> 4 meses (Mayo - Septiembre 2026)</div>
                  </div>
                  <div class="chart-container">
                    <canvas ref="errorRateChart"></canvas>
                  </div>
                </div>
              </div>
            </ion-accordion>

            <ion-accordion value="kpi-tecnico-3" class="custom-accordion">
              <ion-item slot="header" class="accordion-header">
                <ion-label>
                  <h3>Disponibilidad del Sistema</h3>
                  <p>Objetivo SMART: Mantener uptime del 99.5% al 99.95% en 6 meses (Nov 2026)</p>
                </ion-label>
              </ion-item>
              <div class="accordion-content" slot="content">
                <div class="kpi-card">
                  <div class="kpi-objective">
                    <div class="objective-item"><strong>Específico:</strong> Aumentar disponibilidad del servicio</div>
                    <div class="objective-item"><strong>Medible:</strong> De 99.5% a 99.95% uptime (reducir downtime de 3.6h a 26min/mes)</div>
                    <div class="objective-item"><strong>Alcanzable:</strong> Redundancia, load balancing, auto-scaling y DR plan</div>
                    <div class="objective-item"><strong>Relevante:</strong> Garantiza servicio continuo y confianza del cliente</div>
                    <div class="objective-item"><strong>Temporal:</strong> 6 meses (Mayo - Noviembre 2026)</div>
                  </div>
                  <div class="chart-container">
                    <canvas ref="uptimeChart"></canvas>
                  </div>
                </div>
              </div>
            </ion-accordion>

            <ion-accordion value="kpi-tecnico-4" class="custom-accordion">
              <ion-item slot="header" class="accordion-header">
                <ion-label>
                  <h3>Uso de Recursos del Servidor</h3>
                  <p>Objetivo SMART: Optimizar uso de CPU del 78% al 55% en 3 meses (Ago 2026)</p>
                </ion-label>
              </ion-item>
              <div class="accordion-content" slot="content">
                <div class="kpi-card">
                  <div class="kpi-objective">
                    <div class="objective-item"><strong>Específico:</strong> Reducir consumo promedio de CPU en servidores</div>
                    <div class="objective-item"><strong>Medible:</strong> De 78% a 55% de uso CPU (-23 puntos)</div>
                    <div class="objective-item"><strong>Alcanzable:</strong> Optimización queries, caching, code profiling</div>
                    <div class="objective-item"><strong>Relevante:</strong> Reduce costos cloud y mejora escalabilidad</div>
                    <div class="objective-item"><strong>Temporal:</strong> 3 meses (Mayo - Agosto 2026)</div>
                  </div>
                  <div class="chart-container">
                    <canvas ref="cpuUsageChart"></canvas>
                  </div>
                </div>
              </div>
            </ion-accordion>

            <ion-accordion value="kpi-tecnico-5" class="custom-accordion">
              <ion-item slot="header" class="accordion-header">
                <ion-label>
                  <h3>Cobertura de Tests</h3>
                  <p>Objetivo SMART: Aumentar cobertura del 62% al 85% en 5 meses (Oct 2026)</p>
                </ion-label>
              </ion-item>
              <div class="accordion-content" slot="content">
                <div class="kpi-card">
                  <div class="kpi-objective">
                    <div class="objective-item"><strong>Específico:</strong> Incrementar porcentaje de código con tests</div>
                    <div class="objective-item"><strong>Medible:</strong> De 62% a 85% de code coverage (+23 puntos)</div>
                    <div class="objective-item"><strong>Alcanzable:</strong> Unit tests, integration tests, TDD practices</div>
                    <div class="objective-item"><strong>Relevante:</strong> Reduce bugs en producción y facilita refactoring</div>
                    <div class="objective-item"><strong>Temporal:</strong> 5 meses (Mayo - Octubre 2026)</div>
                  </div>
                  <div class="chart-container">
                    <canvas ref="coverageChart"></canvas>
                  </div>
                </div>
              </div>
            </ion-accordion>
          </ion-accordion-group>
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
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonIcon
} from '@ionic/vue';
import { briefcaseOutline, codeSlashOutline } from 'ionicons/icons';
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

// Refs para los canvas de los gráficos
const conversionChart = ref(null);
const aovChart = ref(null);
const retentionChart = ref(null);
const cacChart = ref(null);
const ltvChart = ref(null);
const loadTimeChart = ref(null);
const errorRateChart = ref(null);
const uptimeChart = ref(null);
const cpuUsageChart = ref(null);
const coverageChart = ref(null);

onMounted(() => {
  // KPI 1: Tasa de Conversión
  if (conversionChart.value) {
    new Chart(conversionChart.value, {
      type: 'line',
      data: {
        labels: ['Mayo', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [{
          label: 'Tasa de Conversión (%)',
          data: [18, 18.5, 19.5, 21, 22, 23.5, 24.5, 25],
          borderColor: '#2196F3',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'top' }
        },
        scales: {
          y: { 
            beginAtZero: false,
            min: 15,
            max: 28,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          }
        }
      }
    });
  }

  // KPI 2: Valor Promedio del Pedido (AOV)
  if (aovChart.value) {
    new Chart(aovChart.value, {
      type: 'bar',
      data: {
        labels: ['Mayo', 'Jun', 'Jul', 'Ago', 'Sep'],
        datasets: [{
          label: 'AOV (€)',
          data: [45, 48, 52, 56, 60],
          backgroundColor: '#6CB65C',
          borderColor: '#6CB65C',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'top' }
        },
        scales: {
          y: { 
            beginAtZero: false,
            min: 40,
            max: 65,
            ticks: {
              callback: function(value) {
                return '€' + value;
              }
            }
          }
        }
      }
    });
  }

  // KPI 3: Tasa de Retención
  if (retentionChart.value) {
    new Chart(retentionChart.value, {
      type: 'line',
      data: {
        labels: ['Mayo', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene'],
        datasets: [{
          label: 'Retención (%)',
          data: [40, 42, 45, 47, 49, 51, 53, 54, 55],
          borderColor: '#9C27B0',
          backgroundColor: 'rgba(156, 39, 176, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'top' }
        },
        scales: {
          y: { 
            beginAtZero: false,
            min: 35,
            max: 60,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          }
        }
      }
    });
  }

  // KPI 4: Coste de Adquisición de Cliente (CAC)
  if (cacChart.value) {
    new Chart(cacChart.value, {
      type: 'line',
      data: {
        labels: ['Mayo', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct'],
        datasets: [{
          label: 'CAC (€)',
          data: [22, 20, 18.5, 17.5, 16, 15],
          borderColor: '#FF5722',
          backgroundColor: 'rgba(255, 87, 34, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'top' }
        },
        scales: {
          y: { 
            beginAtZero: false,
            min: 10,
            max: 25,
            ticks: {
              callback: function(value) {
                return '€' + value;
              }
            }
          }
        }
      }
    });
  }

  // KPI 5: Valor del Tiempo de Vida del Cliente (LTV)
  if (ltvChart.value) {
    new Chart(ltvChart.value, {
      type: 'bar',
      data: {
        labels: ['Mayo', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'Mayo'],
        datasets: [{
          label: 'LTV (€)',
          data: [180, 190, 205, 220, 235, 245, 255, 260, 265, 270, 275, 278, 280],
          backgroundColor: '#4CAF50',
          borderColor: '#4CAF50',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'top' }
        },
        scales: {
          y: { 
            beginAtZero: false,
            min: 150,
            max: 300,
            ticks: {
              callback: function(value) {
                return '€' + value;
              }
            }
          }
        }
      }
    });
  }

  // KPI 6: Tiempo de Carga
  if (loadTimeChart.value) {
    new Chart(loadTimeChart.value, {
      type: 'line',
      data: {
        labels: ['Mayo', 'Jun', 'Jul', 'Ago'],
        datasets: [{
          label: 'Tiempo de Carga (s)',
          data: [3.2, 2.7, 2.1, 1.5],
          borderColor: '#2196F3',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'top' }
        },
        scales: {
          y: { 
            beginAtZero: false,
            min: 0,
            max: 4,
            ticks: {
              callback: function(value) {
                return value + 's';
              }
            }
          }
        }
      }
    });
  }

  // KPI 7: Tasa de Errores
  if (errorRateChart.value) {
    new Chart(errorRateChart.value, {
      type: 'line',
      data: {
        labels: ['Mayo', 'Jun', 'Jul', 'Ago', 'Sep'],
        datasets: [{
          label: 'Error Rate (%)',
          data: [2.1, 1.7, 1.3, 0.9, 0.5],
          borderColor: '#FF5722',
          backgroundColor: 'rgba(255, 87, 34, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'top' }
        },
        scales: {
          y: { 
            beginAtZero: true,
            max: 3,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          }
        }
      }
    });
  }

  // KPI 8: Disponibilidad
  if (uptimeChart.value) {
    new Chart(uptimeChart.value, {
      type: 'line',
      data: {
        labels: ['Mayo', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov'],
        datasets: [{
          label: 'Uptime (%)',
          data: [99.5, 99.6, 99.7, 99.75, 99.8, 99.9, 99.95],
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'top' }
        },
        scales: {
          y: { 
            beginAtZero: false,
            min: 99,
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          }
        }
      }
    });
  }

  // KPI 9: Uso de CPU
  if (cpuUsageChart.value) {
    new Chart(cpuUsageChart.value, {
      type: 'bar',
      data: {
        labels: ['Mayo', 'Jun', 'Jul', 'Ago'],
        datasets: [{
          label: 'Uso CPU (%)',
          data: [78, 70, 62, 55],
          backgroundColor: '#9C27B0',
          borderColor: '#9C27B0',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'top' }
        },
        scales: {
          y: { 
            beginAtZero: false,
            min: 40,
            max: 90,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          }
        }
      }
    });
  }

  // KPI 10: Cobertura de Tests
  if (coverageChart.value) {
    new Chart(coverageChart.value, {
      type: 'line',
      data: {
        labels: ['Mayo', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct'],
        datasets: [{
          label: 'Code Coverage (%)',
          data: [62, 67, 72, 77, 82, 85],
          borderColor: '#6CB65C',
          backgroundColor: 'rgba(108, 182, 92, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'top' }
        },
        scales: {
          y: { 
            beginAtZero: false,
            min: 50,
            max: 90,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          }
        }
      }
    });
  }
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
    font-size: 14px;
  }
}

.custom-content {
  --background: #f5f5f5;
}

.kpis-container {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.kpi-section {
  margin-bottom: 32px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding: 20px 24px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.header-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #6CB65C 0%, #5a9e4c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-icon-secondary {
  background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
}

.section-header ion-icon {
  font-size: 26px;
  color: #ffffff;
}

.section-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333333;
}

.custom-accordion-group {
  background: transparent;
}

.custom-accordion {
  background: #ffffff;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.accordion-header {
  --background: #ffffff;
  --color: #333333;
  --padding-start: 20px;
  --padding-end: 20px;
  --inner-padding-end: 0;
}

.accordion-header ion-label h3 {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin: 0 0 4px 0;
}

.accordion-header ion-label p {
  font-size: 13px;
  color: #999999;
  margin: 0;
}

.accordion-content {
  padding: 20px;
  background: #f5f5f5;
}

.kpi-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.kpi-placeholder {
  background: #f5f5f5;
  border-radius: 8px;
  min-height: 250px;
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

.kpi-objective {
  margin-bottom: 20px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(108, 182, 92, 0.05) 0%, rgba(33, 150, 243, 0.05) 100%);
  border-left: 4px solid #6CB65C;
  border-radius: 8px;
}

.objective-item {
  padding: 10px 0;
  font-size: 14px;
  line-height: 1.6;
  color: #444444;
}

.objective-item:not(:last-child) {
  border-bottom: 1px solid #e0e0e0;
}

.objective-item strong {
  color: #6CB65C;
  font-weight: 600;
  margin-right: 8px;
}

.chart-container {
  background: #ffffff;
  border-radius: 8px;
  padding: 16px;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-container canvas {
  max-width: 100%;
  height: 280px !important;
}

/* Responsive design */

/* Desktop Grande */
@media (min-width: 1440px) {
  .kpis-container {
    max-width: 1400px;
    padding: 32px;
  }
}

/* Tablet */
@media (max-width: 992px) {
  .kpis-container {
    padding: 20px;
  }
  
  .section-header {
    padding: 18px 20px;
  }
  
  .header-icon {
    width: 44px;
    height: 44px;
  }
  
  .section-header ion-icon {
    font-size: 24px;
  }
  
  .section-header h2 {
    font-size: 19px;
  }
  
  .kpi-section {
    margin-bottom: 28px;
  }
}

/* Mobile Grande */
@media (max-width: 768px) {
  .kpis-container {
    padding: 16px;
  }
  
  .section-header {
    padding: 16px;
    gap: 12px;
  }
  
  .header-icon {
    width: 42px;
    height: 42px;
  }
  
  .section-header ion-icon {
    font-size: 22px;
  }
  
  .section-header h2 {
    font-size: 18px;
  }
  
  .kpi-section {
    margin-bottom: 24px;
  }
  
  .custom-accordion {
    margin-bottom: 10px;
  }
  
  .accordion-header {
    --padding-start: 16px;
    --padding-end: 16px;
  }
  
  .accordion-header ion-label h3 {
    font-size: 15px;
  }
  
  .accordion-header ion-label p {
    font-size: 12px;
  }
  
  .accordion-content {
    padding: 16px;
  }
  
  .kpi-card {
    padding: 16px;
  }
  
  .kpi-placeholder {
    min-height: 220px;
  }
}

/* Mobile Pequeño */
@media (max-width: 480px) {
  .kpis-container {
    padding: 12px;
  }
  
  .section-header {
    padding: 14px;
    gap: 10px;
    flex-direction: column;
    text-align: center;
  }
  
  .header-icon {
    width: 40px;
    height: 40px;
    margin: 0 auto;
  }
  
  .section-header ion-icon {
    font-size: 20px;
  }
  
  .section-header h2 {
    font-size: 17px;
  }
  
  .accordion-header {
    --padding-start: 12px;
    --padding-end: 12px;
  }
  
  .accordion-header ion-label h3 {
    font-size: 14px;
  }
  
  .accordion-header ion-label p {
    font-size: 11px;
  }
  
  .accordion-content {
    padding: 12px;
  }
  
  .kpi-card {
    padding: 14px;
  }
  
  .kpi-placeholder {
    min-height: 200px;
  }
  
  .placeholder-text {
    font-size: 13px;
  }
}
</style>
