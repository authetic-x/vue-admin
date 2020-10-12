import store from '@/store'

const WIDTH = 992

export default {
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSidebar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    console.log('add resize handler')
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      store.dispatch('app/toggleDevice', { device: 'mobile' })
      store.dispatch('app/closeSidebar', { withoutAnimation: true })
    }
  },
  methods: {
    $_isMobile() {
      const rect = document.body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler() {
      console.log('---resize---')
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        store.dispatch('app/toggleDevice', { device: isMobile ? 'mobile' : 'desktop' })

        if (isMobile) {
          store.dispatch('app/closeSidebar', { withoutAnimation: true })
        }
      }
    }
  }
}