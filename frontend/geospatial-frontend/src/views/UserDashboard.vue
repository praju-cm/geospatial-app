<template>
  <div class="dashboard-container">
    <h1>Dashboard</h1>
    <div class="actions">
      <FileUpload />
      <button @click="saveShapes" class="action-btn">Save Shapes</button>
      <button @click="loadShapes" class="action-btn">Load Shapes</button>
      <button @click="startMeasurement" class="action-btn">Measure Distance</button>
    </div>
    <div ref="mapContainer" class="map-container"></div>
    <div v-if="hoverInfo" class="hover-card">{{ hoverInfo }}</div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import FileUpload from '../components/FileUpload.vue';

mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;

export default {
  components: { FileUpload },
  data() {
    return {
      map: null,
      draw: null,
      hoverInfo: null,
      measuring: false
    };
  },
  mounted() {
    this.map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 2
    });

    this.draw = new MapboxDraw();
    this.map.addControl(this.draw);

    this.map.on('mousemove', this.onHover);
  },
  methods: {
    async saveShapes() {
      const data = this.draw.getAll();
      try {
        await this.$store.dispatch('saveShapes', data);
        alert('Shapes saved successfully');
      } catch (error) {
        console.error('Error saving shapes:', error);
      }
    },
    async loadShapes() {
      try {
        await this.$store.dispatch('loadShapes');
        this.draw.set(this.$store.getters.storedShapes);
      } catch (error) {
        console.error('Error loading shapes:', error);
      }
    },
    onHover(event) {
      const features = this.map.queryRenderedFeatures(event.point);
      if (features.length) {
        this.hoverInfo = features[0].properties.name || 'Unnamed feature';
      } else {
        this.hoverInfo = null;
      }
    },
    startMeasurement() {
      // Implement measurement functionality here
    }
  }
};
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  text-align: center;
}

.actions {
  margin-bottom: 20px;
}

.action-btn {
  background-color: #42b983;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin: 5px;
}

.action-btn:hover {
  background-color: #369970;
}

.map-container {
  height: 500px;
  width: 100%;
  margin: 0 auto;
}

.hover-card {
  position: absolute;
  background: white;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
