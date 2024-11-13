import axios from 'axios';
import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || '',
    files: [],
    shapes: [],
  },
  getters: {
    isAuthenticated: state => !!state.token,
    uploadedFiles: state => state.files,
    storedShapes: state => state.shapes
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearUser(state) {
      state.user = null;
      state.token = '';
      localStorage.removeItem('token');
    },
    setFiles(state, files) {
      state.files = files;
    },
    setShapes(state, shapes) {
      state.shapes = shapes;
    }
  },
  actions: {
    async login({ commit }, userData) {
      try {
        const response = await axios.post('http://localhost:5000/api/users/login', userData);
        commit('setToken', response.data.token);
        // Fetch user info if necessary
      } catch (error) {
        console.error('Error logging in:', error);
      }
    },
    async register({commit} ,userData) {
      try {
        await axios.post('http://localhost:5000/api/users/register', userData);
        commit('setToken', '');
        // Automatically log in the user after registration
        await this.dispatch('login', userData);
      } catch (error) {
        console.error('Error registering:', error);
      }
    },
    logout({ commit }) {
      commit('clearUser');
    },
    async uploadFile({ commit }, file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:5000/api/files/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        commit('setFiles', [...this.state.files, response.data.file]);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    },
    async saveShapes({ commit }, shapes) {
      try {
        await axios.post('http://localhost:5000/api/shapes/save', { data: shapes });
        commit('setShapes', shapes);
      } catch (error) {
        console.error('Error saving shapes:', error);
      }
    },
    async loadShapes({ commit }) {
      try {
        const response = await axios.get('http://localhost:5000/api/shapes/load');
        commit('setShapes', response.data);
      } catch (error) {
        console.error('Error loading shapes:', error);
      }
    }
  },
  modules: {
    // You can add additional Vuex modules here
  }
});

export default store;
