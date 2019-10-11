<template>
  <div>
    <h2>Register</h2>
    <form>
      <input class="mb-2 rounded" type="text" v-model="userData.name" placeholder="John / Jane Smith"/>
      <br />
      <input class="mb-2 rounded" type="email" v-model="userData.email" placeholder="email@email.com"/>
      <br />
      <input class="mb-2 rounded" type="password" v-model="userData.password" placeholder="password"/>
      <br />
      <input type="submit" value="Register" @click="register" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userData: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async register(e) {
      e.preventDefault();
      try {
        const response = await axios.post("/api/users", this.userData);
        alert("Registered");
      } catch (err) {
        alert("Not Registered");
      }
    }
  }
};
</script>