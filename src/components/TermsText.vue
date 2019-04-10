<template>
  <div class="content">
    {{termAndCond}}
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


</style>
