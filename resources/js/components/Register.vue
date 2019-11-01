<template>
  <div>
    <template v-if="loginModal">
      <div class="fixed bg-black opacity-75 right-0 left-0 top-0 bottom-0 z-10"></div>
      <div class="absolute inset-0 flex justify-center items-center z-20">
        <div class="fixed bg-blue-900 border-white rounded-lg w-5/6 py-8 shadow">

          <!-- Start of Content -->
          <p class="text-center text-2xl">Register</p>
          <div class="flex block mt-8 items-center justify-center">
            <form>
              <input class="my-2 h-12 w-full text-center text-white rounded bg-blue-400 placeholder-gray-100" type="text" v-model="userData.name" placeholder="John / Jane Smith"/>
              <br>
              <input class="my-2 h-12 w-full text-center text-white rounded bg-blue-400 placeholder-gray-100" type="email" v-model="userData.email" placeholder ="email@email.com"/>
              <br>
              <input class="my-2 h-12 w-full text-center text-white rounded bg-blue-400 placeholder-gray-100" type="password" v-model="userData.password" placeholder="password"/>
              <br>
              <div class="flex block mt-8 items-center justify-center ">
                <button type="cancel" class="p-4 m-2 w-40 rounded bg-gray-300 text-blue-900 focus:outline-none"
                @click="closeLogin">Close</button>

                <button type="submit" @click="register" class="p-4 m-2 w-40 rounded text-white bg-red-500 focus:outline-none">Register</button>
              </div>
            </form>
          </div>
          <!-- End of Content -->
          
        </div>
      </div>
    </template>
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
  computed:{
    loginModal(){
      return this.$store.state.loginModal;
    }
  },
  methods: {
    async register(e) {
      e.preventDefault();
      try {
        const response = await axios.post("/api/users", this.userData);
        closeLogin();
        alert("Registered");
      } catch (err) {
        alert("Not Registered");
      }
    },
  },
  closeLogin(){
    return this.loginModal = false;
  },
};
</script>