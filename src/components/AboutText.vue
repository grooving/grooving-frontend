<template>
  <span v-html="aboutUs"></span>
</template>

<script>
export default {
  name: 'AboutText',
  props: {
    aboutUs: {
        type: String,
        default: '',
    },
  }
}
</script>

<style scoped>


 


</style>
