<template>
    <div>
        <div class="absolute bg-black opacity-75 h-screen right-0 left-0 top-0 bottom-0 z-10"></div>
        <div class="relative flex justify-center">
            <div class="fixed bg-blue-900 border-white text-white rounded-lg py-8 w-5/6 mt-20 h-48 shadow z-20">
                <p class="text-center"> stuff here </p>
                <div class="flex block mt-8 items-center justify-center">
                    <button class="p-4 m-2 w-40 rounded text-white bg-red-500 focus:outline-none"
                    @click="closeModal()">Close Modal</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        computed:{
            modalOpen(){
                return this.$store.state.modalOpen();
            }
        },
        methods: {
            closeModal() {
                this.$store.state.modalOpen = !this.$store.state.modalOpen;
            }
        }
    }

</script>