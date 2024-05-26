<script setup>


const props = defineProps({
    errors: Array
})

</script>
<template>
    <div>
        <p v-for="error, index in errors" :key="index" class="text-red-400 text-sm">{{ error }}</p>
    </div>
</template>