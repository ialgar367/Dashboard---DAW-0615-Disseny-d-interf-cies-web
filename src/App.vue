<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay" class="custom-menu">
        <ion-content class="menu-content">
          <div class="menu-header">
            <div class="logo-container">
              <ion-icon :icon="analyticsOutline" class="logo-icon"></ion-icon>
            </div>
            <h1 class="app-title">Dashboard</h1>
            <p class="app-subtitle">Visualització de Dades</p>
          </div>

          <ion-list class="menu-list">
            <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item 
                @click="selectedIndex = i" 
                router-direction="root" 
                :router-link="p.url" 
                lines="none" 
                :detail="false" 
                class="menu-item"
                :class="{ selected: selectedIndex === i }">
                <ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/vue';
import { ref } from 'vue';
import {
  analyticsOutline,
  briefcaseOutline,
  codeSlashOutline,
  statsChartOutline,
} from 'ionicons/icons';

const selectedIndex = ref(0);
const appPages = [
  {
    title: 'Negocio',
    url: '/negocio',
    iosIcon: briefcaseOutline,
    mdIcon: briefcaseOutline,
  },
  {
    title: 'Técnico',
    url: '/tecnico',
    iosIcon: codeSlashOutline,
    mdIcon: codeSlashOutline,
  },
  {
    title: 'KPIs',
    url: '/kpis',
    iosIcon: statsChartOutline,
    mdIcon: statsChartOutline,
  },
];

const path = window.location.pathname;
if (path !== undefined) {
  if (path.includes('/negocio')) selectedIndex.value = 0;
  else if (path.includes('/tecnico')) selectedIndex.value = 1;
  else if (path.includes('/kpis')) selectedIndex.value = 2;
}
</script>

<style scoped>
/* Custom Menu Styling */
.custom-menu {
  --width: 20%;
  --min-width: 200px;
  --max-width: 280px;
  --border: none;
}

ion-split-pane {
  --border: none;
  --side-width: 20%;
  --side-min-width: 200px;
  --side-max-width: 280px;
}

.menu-content {
  --background: #ffffff;
}

.menu-header {
  padding: 40px 24px 32px;
  background: linear-gradient(135deg, #6CB65C 0%, #5a9e4c 100%);
  text-align: center;
  color: #ffffff;
}

.logo-container {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.logo-icon {
  font-size: 36px;
  color: #ffffff;
}

.app-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #ffffff;
}

.app-subtitle {
  font-size: 14px;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
}

.menu-list {
  padding: 24px 16px;
  background: transparent;
}

.menu-item {
  --background: transparent;
  --color: #666666;
  --padding-start: 16px;
  --padding-end: 16px;
  --inner-padding-end: 0;
  margin-bottom: 8px;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.2s ease;
}

.menu-item::part(native) {
  border-radius: 12px;
}

.menu-item ion-icon {
  font-size: 24px;
  margin-right: 16px;
  color: #666666;
  transition: color 0.2s ease;
}

.menu-item:hover {
  --background: #f5f5f5;
}

.menu-item.selected {
  --background: #e8f5e6;
  --color: #6CB65C;
  font-weight: 600;
}

.menu-item.selected ion-icon {
  color: #6CB65C;
}

/* Responsive adjustments */
@media (min-width: 768px) {
  ion-menu.md {
    --width: 280px;
  }
  
  .menu-header {
    padding: 48px 24px 40px;
  }
}

@media (max-width: 767px) {
  .custom-menu {
    --width: 260px;
  }
  
  .menu-header {
    padding: 32px 20px 28px;
  }
  
  .logo-container {
    width: 56px;
    height: 56px;
    margin: 0 auto 12px;
  }
  
  .logo-icon {
    font-size: 32px;
  }
  
  .app-title {
    font-size: 22px;
  }
  
  .app-subtitle {
    font-size: 13px;
  }
  
  .menu-list {
    padding: 20px 12px;
  }
  
  .menu-item {
    --padding-start: 12px;
    --padding-end: 12px;
    font-size: 14px;
  }
  
  .menu-item ion-icon {
    font-size: 22px;
    margin-right: 12px;
  }
}

@media (max-width: 480px) {
  .custom-menu {
    --width: 240px;
  }
  
  .menu-header {
    padding: 28px 16px 24px;
  }
  
  .logo-container {
    width: 52px;
    height: 52px;
  }
  
  .logo-icon {
    font-size: 28px;
  }
  
  .app-title {
    font-size: 20px;
  }
  
  .app-subtitle {
    font-size: 12px;
  }
}
</style>
