<template>
  <div class="content">

      <span v-html="termAndCond"></span>

    
    
  </div>
</template>

<script>
export default {
  name: 'TermsText',
  props: {
    termAndCond: {
        type: String,
        default: '',
    },
  }
}
</script>

<style scoped>

  h1 {
    margin-top: 5%;
    margin-bottom: 5%;
  }

  h2 {
    margin-top: 5%;
    margin-bottom: 3%;
  }

  p {
    text-align: justify;
    margin-right: 3%;
    margin-left: 3%;

  }

    @media (min-width:768px)  {

    h1 {
      display: none;
      margin-top: 5%;
      margin-bottom: 5%;
    }

    h2 {
      margin-top: 5%;
      margin-bottom: 3%;
    }

    p {
      text-align: justify;
      margin-right: 3%;
      margin-left: 3%;

    }

    }

content {
  text-align: left;

}

</style>
