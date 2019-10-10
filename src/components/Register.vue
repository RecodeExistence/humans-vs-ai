<template>
  <div>
    <h2>Register</h2>
    <form>
      <input type="text" v-model="userData.name" />
      <br />
      <input type="email" v-model="userData.email" />
      <br />
      <input type="password" v-model="userData.password" />
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
        const repsonse = await axios.post("/users", this.userData);
        console.log("Registered");
      } catch (err) {
        console.log("Not Registered");
      }
    }
  }
};
</script>