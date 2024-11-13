<template>
  <div class="home">
    <h1>Welcome to the Geospatial Data Management App</h1>
    <p>
      This application allows you to manage and visualize geospatial data, draw and edit shapes, measure distances, and manage point markers on a map using Mapbox.
    </p>
    <router-link to="/login">
      <button>Login</button>
    </router-link>
    <router-link to="/register">
      <button>Register</button>
    </router-link>
    <router-link v-if="isAuthenticated" to="/dashboard">
      <button>Go to Dashboard</button>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated'])
  }
};
</script>

<style scoped>
.home {
  text-align: center;
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #369970;
}
</style>
