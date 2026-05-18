import { mount } from '@vue/test-utils'
import Negocio from '@/views/Negocio.vue'
import { describe, expect, test } from 'vitest'

describe('Negocio.vue', () => {
  test('renders negocio dashboard', () => {
    const wrapper = mount(Negocio, {
      global: {
        stubs: {
          IonPage: true,
          IonHeader: true,
          IonToolbar: true,
          IonButtons: true,
          IonMenuButton: true,
          IonTitle: true,
          IonContent: true,
          IonIcon: true,
          IonBadge: true
        }
      }
    })
    expect(wrapper.text()).toMatch('Dashboard de Negocio')
  })
})
