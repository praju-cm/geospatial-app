<template>
  <div class="register-container">
    <div class="register-form">
      <h1>Register</h1>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="username">Username</label>
          <input v-model="username" id="username" type="text" placeholder="Username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="password" id="password" type="password" placeholder="Password" required />
        </div>
        <button type="submit" class="submit-btn">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: 'UserRegister',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  setup() { const store = useStore(); return { store }; },
  methods: {
    async register() {
      try {
        const params= {
          username: this.username,
          password: this.password
        }
        await this.$store.dispatch('register', params);
        alert(this.errormessage);
        this.username='';
        this.password='';
        this.$router.push({ name: 'Login' });
      } catch (error) {
        alert(this.errormessage);
        console.error('Error:', error);
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.register-form {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #42b983;
}

.submit-btn {
  background-color: #42b983;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

.submit-btn:hover {
  background-color: #369970;
}
</style>
