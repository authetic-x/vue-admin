<template>
  <el-card class="list-container">
    <div slot="header">
      <span>Observer infinite scroll</span>
    </div>
    
    <div class="scrollable scrollbar" ref="listContainer">
      <ul class="list-wrapper" :style="{paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px`}">
        <li :id="item.id" v-for="item of list" :key="item.id" ref="list" class="list-item">{{item.content}}</li>
      </ul>
      <!-- <p v-if="loading">Loading...</p> -->
    </div>
  </el-card>
</template>

<script>
const LIST_LENGTH = 20

export default {
  name: 'ObserverList',
  data() {
    return {
      observer: null,
      currentIndex: 0,
      count: 20,
      firstListItem: null,
      lastListItem: null,
      maxListLen: LIST_LENGTH,
    }
  },
  mounted() {
    this.firstListItem = this.$refs.list[0]
    this.lastListItem = this.$refs.list[LIST_LENGTH - 1]
    if (this.lastListItem && this.firstListItem) {
      this.observer = new IntersectionObserver(this.observerCb, {
        root: this.$refs.listContainer.$el
      })
      this.observer.observe(this.firstListItem)
      this.observer.observe(this.lastListItem)
    }
  },
  computed: {
    list() {
      const res = []
      for (let i = this.currentIndex; i < this.currentIndex + 20; i ++ ) {
        res.push({id: i, content: `${i} item`})
      }
      return res
    },
    firstIndex() {
      return String(this.currentIndex)
    },
    lastIndex() {
      return String(this.currentIndex + 19)
    },
    paddingTop() {
      return this.currentIndex * 50
    },
    paddingBottom() {
      return (this.maxListLen - (this.currentIndex + LIST_LENGTH)) * 50
    }
  },
  methods: {
    observerCb(entries) {
      entries.forEach(entry => {
        if (entry.target.id === this.lastIndex && entry.isIntersecting) {
          this.bottomItemCb()
        }
        if (entry.target.id === this.firstIndex && entry.isIntersecting) {
          this.topItemCb()
        }
      })
    },
    bottomItemCb() {
      this.observer.unobserve(this.firstListItem)
      this.observer.unobserve(this.lastListItem)
      console.log('CurrentIndex: ' + this.currentIndex)
      this.currentIndex += 10
      this.maxListLen = Math.max(this.maxListLen, this.currentIndex + LIST_LENGTH)
      this.$nextTick(() => {
        this.updateObserveItem()
      })
    },
    topItemCb() {
      // TODO: 
      if (this.currentIndex === 0) return
      this.observer.unobserve(this.firstListItem)
      this.observer.unobserve(this.lastListItem)
      console.log('CurrentIndex: ' + this.currentIndex)
      if (this.currentIndex > 0) {
        this.currentIndex -= 10
      }
      this.$nextTick(() => {
        this.updateObserveItem()
      })
    },
    updateObserveItem() {
      this.firstListItem = this.$refs.list[0]
      this.lastListItem = this.$refs.list[LIST_LENGTH - 1]
      this.observer.observe(this.firstListItem)
      this.observer.observe(this.lastListItem)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  .scrollable {
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 400px;
    
  }
  .list-wrapper {
    margin: 0;
    padding: 0;
    list-style: none;
    .list-item {
      padding: 1em 0;
      &:hover {
        background: #ccc;
      }
    }
  }
}
</style>