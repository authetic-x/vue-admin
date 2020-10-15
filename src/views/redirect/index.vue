<script>
export default {
  created() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  // avoid warning message
  render(h) {
    return h()
  }
}
</script>