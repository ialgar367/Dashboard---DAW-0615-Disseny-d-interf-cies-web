# Dashboard - Visualizacion de Datos

Dashboard desarrollado con Ionic + Vue para el seguimiento de una empresa de ecommerce alimentario.

## Contexto de la practica

### Empresa

La empresa representa un ecommerce alimentario llamado De la cesta a tu mesa.
La empresa vende productos frescos, gestiona pedidos online y monitoriza la salud comercial y tecnica de su plataforma.

### Audiencia

- Negocio: seguimiento de ventas, conversion e ingresos para tomar decisiones comerciales.
- Tecnica: rendimiento, disponibilidad, errores y calidad del codigo para el mantenimiento de la app para poder mejor el SEO de la app.

### Fuentes de datos

Los datos estan preparados directamente en el codigo para construir una visualizacion exploratoria y explicativa.
Se organizan en series mensuales, semanales y en tiempo real para representar distintos escenarios de negocio y de sistema.

### Origen de los datos

- Metricas de negocio: ventas, visitas, conversion, ticket medio y retencion a partir de la operativa de la tienda.
- Metricas tecnicas: tiempos de respuesta, uso de CPU, uptime, errores y cobertura de tests que vienen de la monitorizacion interna.

### Criterios de diseño

- Limpieza visual, jerarquia clara y espacio en blanco para reducir la carga cognitiva.
- Uso de color y tamaño para focalizar los objetivos SMART y destacar desviaciones relevantes.

## Tecnologias utilizadas

- Ionic Vue
- Chart.js
- ApexCharts
- ECharts
- SVG interactivo para el grafico propio

## Estructura del dashboard

- Dashboard de negocio con metricas comerciales y evolucion de ventas.
- Dashboard tecnico con metricas de rendimiento, disponibilidad y errores.
- Vista de KPIs con 10 objetivos SMART, 5 de negocio y 5 tecnicos.

## Grafico propio: Indice de Salud Comercial

### Que representa

El Indice de Salud Comercial es una metrica compuesta que refleja el estado general de la operacion comercial de "De la cesta a tu mesa" en cada dia de la semana. Combina varios factores clave del negocio en un solo indicador (sobre 100) para facilitar la toma de decisiones rapida.

### De donde provienen los datos

Los valores del grafico (62-88 puntos sobre 100) se calculan a partir de la combinacion ponderada de:

- **Tasa de conversion diaria**: peso del 30% - indica cuantos visitantes realizan compra
- **Satisfaccion del cliente**: peso del 25% - valoraciones y feedback recibido
- **Tiempo de entrega cumplido**: peso del 20% - pedidos entregados en plazo
- **Disponibilidad de stock**: peso del 15% - productos disponibles vs agotados
- **Rendimiento de la plataforma**: peso del 10% - velocidad y estabilidad del sistema

Estos datos se actualizan diariamente y se simulan en el codigo para representar una semana tipo de operacion, mostrando la evolucion natural del negocio con picos en viernes (79) y sabado (84), y el maximo alcanzado el domingo (88).

### Como esta construido

Este grafico es 100% propio, construido manualmente sin usar Chart.js, ApexCharts ni ECharts:

- **SVG interactivo**: dibujado con elementos SVG nativos (polyline, circle, polygon)
- **Datos reactivos en Vue**: los puntos, area y barras se calculan con computed properties
- **Interactividad manual**: hover, tooltip y resaltado programados desde cero
- **Sincronizacion visual**: el punto activo en el grafico se sincroniza con las barras laterales

### Para la grabacion

Podeis explicar que este grafico demuestra como construir visualizaciones personalizadas cuando las librerias estandar no cubren necesidades especificas. En este caso, permite combinar una vista de tendencia (linea), distribucion (area) y comparativa (barras) en un solo componente interactivo que refleja la salud del negocio de forma intuitiva para la direccion comercial.