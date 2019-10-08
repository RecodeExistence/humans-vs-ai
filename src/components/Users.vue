<template>
  <P>{{this.users}}</P>
</template>
<script>
import axios from "axios";
const BASE_URL = "http://localhost:3000/auth/users";

export default {
  data() {
    return {
      users: null
    };
  },
  async mounted() {
    const response = await axios.get(BASE_URL);

    return (this.users = response);
  }
};
</script>