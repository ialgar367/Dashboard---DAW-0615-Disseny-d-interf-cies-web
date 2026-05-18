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
                  <p>Porcentaje de visitantes que realizan compras</p>
                </ion-label>
              </ion-item>
              <div class="accordion-content" slot="content">
                <div class="kpi-card">
                  <div class="kpi-placeholder">
                    <span class="placeholder-text">Gráfico de conversión</span>
                  </div>
                </div>
              </div>
            </ion-accordion>

            <ion-accordion value="kpi-negocio-2" class="custom-accordion">
              <ion-item slot="header" class="accordion-header">
                <ion-label>
                  <h3>Valor Promedio del Pedido (AOV)</h3>
                  <p>Ingreso medio por transacción</p>
                </ion-label>
              </ion-item>
              <div class="accordion-content" slot="content">
                <div class="kpi-card">
                  <div class="kpi-placeholder">
                    <span class="placeholder-text">Gráfico de valor promedio</span>
                  </div>
                </div>
              </div>
            </ion-accordion>

            <ion-accordion value="kpi-negocio-3" class="custom-accordion">
              <ion-item slot="header" class="accordion-header">
                <ion-label>
                  <h3>Retención de Clientes</h3>
                  <p>Clientes que vuelven a comprar</p>
                </ion-label>
              </ion-item>
              <div class="accordion-content" slot="content">
                <div class="kpi-card">
                  <div class="kpi-placeholder">
                    <span class="placeholder-text">Gráfico de retención</span>
                  </div>
                </div>
              </div>
            </ion-accordion>

            <ion-accordion value="kpi-negocio-4" class="custom-accordion">
              <ion-item slot="header" class="accordion-header">
                <ion-label>
                  <h3>Costo de Adquisición (CAC)</h3>
                  <p>Inversión para adquirir nuevos clientes</p>
                </ion-label>
              </ion-item>
              <div class="accordion-content" slot="content">
                <div class="kpi-card">
                  <div class="kpi-placeholder">
                    <span class="placeholder-text">Gráfico de CAC</span>
                  </div>
                </div>
              </div>
            </ion-accordion>

            <ion-accordion value="kpi-negocio-5" class="custom-accordion">
              <ion-item slot="header" class="accordion-header">
                <ion-label>
                  <h3>Tiempo de Vida del Cliente (LTV)</h3>
                  <p>Valor total que genera un cliente</p>
                </ion-label>
              </ion-item>
              <div class="accordion-content" slot="content">
                <div class="kpi-card">
                  <div class="kpi-placeholder">
                    <span class="placeholder-text">Gráfico de LTV</span>
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
                  <p>Velocidad de respuesta de la aplicación</p>
                </ion-label>
              </ion-item>
              <div class="accordion-content" slot="content">
                <div class="kpi-card">
                  <div class="kpi-placeholder">
                    <span class="placeholder-text">Gráfico de tiempo de carga</span>
                  </div>
                </div>
              </div>
            </ion-accordion>

            <ion-accordion value="kpi-tecnico-2" class="custom-accordion">
              <ion-item slot="header" class="accordion-header">
                <ion-label>
                  <h3>Tasa de Errores</h3>
                  <p>Porcentaje de peticiones fallidas</p>
                </ion-label>
              </ion-item>
              <div class="accordion-content" slot="content">
                <div class="kpi-card">
                  <div class="kpi-placeholder">
                    <span class="placeholder-text">Gráfico de errores</span>
                  </div>
                </div>
              </div>
            </ion-accordion>

            <ion-accordion value="kpi-tecnico-3" class="custom-accordion">
              <ion-item slot="header" class="accordion-header">
                <ion-label>
                  <h3>Disponibilidad del Sistema</h3>
                  <p>Uptime y tiempo de actividad</p>
                </ion-label>
              </ion-item>
              <div class="accordion-content" slot="content">
                <div class="kpi-card">
                  <div class="kpi-placeholder">
                    <span class="placeholder-text">Gráfico de disponibilidad</span>
                  </div>
                </div>
              </div>
            </ion-accordion>

            <ion-accordion value="kpi-tecnico-4" class="custom-accordion">
              <ion-item slot="header" class="accordion-header">
                <ion-label>
                  <h3>Uso de Recursos del Servidor</h3>
                  <p>CPU, Memoria y almacenamiento</p>
                </ion-label>
              </ion-item>
              <div class="accordion-content" slot="content">
                <div class="kpi-card">
                  <div class="kpi-placeholder">
                    <span class="placeholder-text">Gráfico de recursos</span>
                  </div>
                </div>
              </div>
            </ion-accordion>

            <ion-accordion value="kpi-tecnico-5" class="custom-accordion">
              <ion-item slot="header" class="accordion-header">
                <ion-label>
                  <h3>Cobertura de Tests</h3>
                  <p>Porcentaje de código testeado</p>
                </ion-label>
              </ion-item>
              <div class="accordion-content" slot="content">
                <div class="kpi-card">
                  <div class="kpi-placeholder">
                    <span class="placeholder-text">Gráfico de cobertura</span>
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
