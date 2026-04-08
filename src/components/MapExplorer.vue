<template>
  <div class="map-container" :class="{ 'is-fullscreen': isFullscreen }">
    <div id="rwanda-map"></div>

    <div class="map-overlay-ui">
      <div class="map-controls">
        <button @click="resetMapView" title="Reset View" class="control-btn">
          <i class="fas fa-house"></i>
        </button>
        <button @click="toggleFullscreen" title="Toggle Fullscreen" class="control-btn">
          <i :class="isFullscreen ? 'fas fa-compress' : 'fas fa-expand'"></i>
        </button>
      </div>

      <div class="map-legend">
        <div class="legend-item">
          <span class="dot undiscovered"></span>
          <span>Locked</span>
        </div>
        <div class="legend-item">
          <span class="dot discovered"></span>
          <span>Explored</span>
        </div>
        <div class="legend-item">
          <span class="dot completed"></span>
          <span>Mastered</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  discoveredLocations: {
    type: Array,
    default: () => []
  },
  completedQuests: {
    type: Array,
    default: () => []
  },
  currentDistrict: {
    type: String,
    default: null
  },
  provinceData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['district-selected'])

let map = null
const provinceLayers = ref({})
const isFullscreen = ref(false)

const PROVINCES = {
  kigali: {
    name: 'Kigali City',
    center: [-1.9441, 30.0619],
    bounds: [[-1.996, 30.015], [-1.892, 30.108]],
    color: '#FF6B6B',
    zoom: 12,
    nickname: 'Heart of Rwanda'
  },
  north: {
    name: 'Northern Province',
    center: [-1.5782, 29.6235],
    bounds: [[-1.389, 29.393], [-1.767, 29.853]],
    color: '#4ECDC4',
    zoom: 10,
    nickname: 'Land of Volcanoes'
  },
  east: {
    name: 'Eastern Province',
    center: [-1.9324, 30.4946],
    bounds: [[-2.216, 30.243], [-1.648, 30.745]],
    color: '#95E77E',
    zoom: 9,
    nickname: 'Savanna Gateway'
  },
  south: {
    name: 'Southern Province',
    center: [-2.5982, 29.7339],
    bounds: [[-2.838, 29.252], [-2.358, 30.215]],
    color: '#FFD93D',
    zoom: 9,
    nickname: 'Cultural Heartland'
  },
  west: {
    name: 'Western Province',
    center: [-2.0724, 29.2258],
    bounds: [[-2.552, 28.861], [-1.592, 29.590]],
    color: '#C77DFF',
    zoom: 9,
    nickname: 'Lake & Forest Region'
  }
}

const initializeMap = () => {
  map = L.map('rwanda-map', {
    center: [-1.9403, 29.8739],
    zoom: 8,
    zoomControl: false,
    minZoom: 7,
    maxZoom: 13,
    attributionControl: true
  })

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap',
    maxZoom: 19
  }).addTo(map)

  Object.entries(PROVINCES).forEach(([id, province]) => {
    addProvinceLayer(id, province)
  })

  addLandmarks()
}

const addProvinceLayer = (provinceId, province) => {
  const bounds = province.bounds
  const polygonCoords = [
    [bounds[0][0], bounds[0][1]],
    [bounds[0][0], bounds[1][1]],
    [bounds[1][0], bounds[1][1]],
    [bounds[1][0], bounds[0][1]]
  ]

  const layer = L.polygon(polygonCoords, {
    color: province.color,
    weight: 3,
    opacity: 0.8,
    fillColor: getProvinceFillColor(provinceId),
    fillOpacity: 0.3,
    interactive: true,
    className: `province-polygon province-${provinceId}`
  })

  const labelIcon = L.divIcon({
    className: 'province-label',
    html: `
      <div class="label-content ${props.completedQuests.includes(provinceId) ? 'completed' : ''}">
        <span>${province.name}</span>
        ${props.completedQuests.includes(provinceId) ? '<i class="fas fa-certificate"></i>' : ''}
      </div>
    `,
    iconSize: [150, 40],
    iconAnchor: [75, 20]
  })

  const label = L.marker(province.center, { icon: labelIcon })

  layer.on('click', () => {
    emit('district-selected', provinceId)
    zoomToProvince(provinceId)
  })

  window.clickProvince = (id) => {
    emit('district-selected', id)
    zoomToProvince(id)
    map.closePopup()
  }

  layer.bindPopup(`
    <div class="province-popup">
      <h3>${province.name}</h3>
      <p>${province.nickname}</p>
      <button onclick="window.clickProvince('${provinceId}')">Enter Region</button>
    </div>
  `)
  
  layer.addTo(map)
  label.addTo(map)
  provinceLayers.value[provinceId] = { layer, label }
}

const addLandmarks = () => {
  const landmarks = [
    { name: 'Lake Kivu', coords: [-1.8531, 29.1567], icon: 'water', color: '#3b82f6' },
    { name: 'Volcanoes', coords: [-1.4680, 29.4924], icon: 'mountain', color: '#ef4444' },
    { name: 'Nyungwe', coords: [-2.4889, 29.2925], icon: 'tree', color: '#10b981' },
    { name: 'Akagera', coords: [-1.8766, 30.7260], icon: 'leaf', color: '#f59e0b' }
  ]

  landmarks.forEach(lm => {
    const icon = L.divIcon({
      className: 'landmark-marker',
      html: `<i class="fas fa-${lm.icon}" style="color: ${lm.color};"></i>`,
      iconSize: [24, 24]
    })
    L.marker(lm.coords, { icon }).bindTooltip(lm.name).addTo(map)
  })
}

const getProvinceFillColor = (provinceId) => {
  if (props.completedQuests.includes(provinceId)) return '#10b981'
  if (props.discoveredLocations.includes(provinceId)) return '#3b82f6'
  return '#cbd5e1'
}

const zoomToProvince = (provinceId) => {
  const province = PROVINCES[provinceId]
  if (!province || !map) return

  map.flyTo(province.center, province.zoom, { duration: 1.2 })

  Object.entries(provinceLayers.value).forEach(([id, { layer }]) => {
    const isActive = id === provinceId
    layer.setStyle({
      weight: isActive ? 5 : 3,
      fillOpacity: isActive ? 0.5 : 0.3,
      className: `province-polygon province-${id} ${isActive ? 'province-active' : ''}`
    })
    if (isActive) layer.bringToFront()
  })
}

const resetMapView = () => {
  map?.flyTo([-1.9403, 29.8739], 8, { duration: 1 })
  Object.values(provinceLayers.value).forEach(({ layer }) => {
    layer.setStyle({ weight: 3, fillOpacity: 0.3, className: 'province-polygon' })
  })
}

const toggleFullscreen = () => {
  const el = document.querySelector('.map-container')
  if (!isFullscreen.value) el.requestFullscreen?.()
  else document.exitFullscreen?.()
}

watch(() => props.currentDistrict, (newVal) => {
  newVal ? zoomToProvince(newVal) : resetMapView()
})

watch([() => props.discoveredLocations, () => props.completedQuests], () => {
  Object.entries(provinceLayers.value).forEach(([id, { layer, label }]) => {
    layer.setStyle({ fillColor: getProvinceFillColor(id) })
    const province = PROVINCES[id]
    label.setIcon(L.divIcon({
      className: 'province-label',
      html: `
        <div class="label-content ${props.completedQuests.includes(id) ? 'completed' : ''}">
          <span>${province.name}</span>
          ${props.completedQuests.includes(id) ? '<i class="fas fa-certificate"></i>' : ''}
        </div>
      `,
      iconSize: [150, 40],
      iconAnchor: [75, 20]
    }))
  })
}, { deep: true })

onMounted(() => {
  initializeMap()
  document.addEventListener('fullscreenchange', () => {
    isFullscreen.value = !!document.fullscreenElement
  })
})

onUnmounted(() => {
  map?.remove()
  delete window.clickProvince
})
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 600px;
  background: #f8fafc;
  border-radius: 24px;
  overflow: hidden;
}

.map-container.is-fullscreen {
  height: 100vh;
  border-radius: 0;
}

#rwanda-map {
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* --- UI Overlays --- */
.map-overlay-ui {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 15px;
  pointer-events: none;
}

.map-controls, .map-legend {
  pointer-events: auto;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  padding: 10px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  border: 1px solid rgba(255,255,255,0.2);
}

.map-controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.control-btn {
  width: 42px;
  height: 42px;
  border: none;
  background: #f1f5f9;
  border-radius: 10px;
  cursor: pointer;
  color: #1b4332;
  transition: all 0.2s;
  font-size: 1rem;
}

.control-btn:hover {
  background: #2d6a4f;
  color: white;
  transform: translateY(-2px);
}

/* --- Legend --- */
.map-legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #1e293b;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(0,0,0,0.1);
}

.dot.undiscovered { background: #cbd5e1; }
.dot.discovered { background: #3b82f6; }
.dot.completed { background: #10b981; }

/* --- Polygons & Animations --- */
:deep(.province-polygon) {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  cursor: pointer;
}

:deep(.province-active) {
  stroke-dasharray: 8;
  animation: pulse-border 2s infinite ease-in-out, dash 30s linear infinite;
  stroke-width: 4px;
}

@keyframes dash {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: 1000; }
}

@keyframes pulse-border {
  0% { stroke-opacity: 0.8; fill-opacity: 0.4; }
  50% { stroke-opacity: 1; fill-opacity: 0.6; }
  100% { stroke-opacity: 0.8; fill-opacity: 0.4; }
}

/* --- Province Labels --- */
:deep(.province-label) {
  background: transparent;
  border: none;
}

:deep(.label-content) {
  background: rgba(255, 255, 255, 0.95);
  padding: 6px 14px;
  border-radius: 25px;
  border: 1px solid #e2e8f0;
  color: #1e293b;
  font-weight: 800;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transform: translateY(-10px);
}

:deep(.label-content.completed) {
  background: #10b981;
  color: white;
  border-color: #059669;
}

:deep(.label-content i) {
  font-size: 10px;
}

/* --- Popups --- */
:deep(.leaflet-popup-content-wrapper) {
  border-radius: 16px;
  padding: 8px;
}

:deep(.province-popup) {
  text-align: center;
}

:deep(.province-popup h3) {
  margin: 0 0 5px;
  color: #1b4332;
  font-weight: 800;
}

:deep(.province-popup p) {
  margin: 0 0 15px;
  color: #64748b;
  font-size: 0.85rem;
}

:deep(.province-popup button) {
  background: #2d6a4f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s;
}

:deep(.province-popup button:hover) {
  background: #1b4332;
}
</style>