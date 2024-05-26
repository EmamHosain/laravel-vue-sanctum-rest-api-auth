<script setup>
import { RouterView } from 'vue-router';
import Navbar from '../shortComponent/Navbar.vue'

</script>
<template>
    <header>
        <Navbar/>
    </header>


    <main>
        <router-view></router-view>
    </main>


    <footer>
        <!-- <h1>footer</h1> -->
    </footer>
</template>