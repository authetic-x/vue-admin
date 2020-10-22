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
      paddingTop: 0,
      paddingBottom: 0,
      topSentinelPreviousY: 0,
      topSentinelPreviousRatio: 0,
      bottomSentinelPreviousY: 0,
      bottomSentinelPreviousRatio: 0,
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
  },
  methods: {
    observerCb(entries) {
      entries.forEach(entry => {
        if (entry.target.id === this.lastIndex) {
          this.bottomItemCb(entry)
        }
        if (entry.target.id === this.firstIndex) {
          this.topItemCb(entry)
        }
      })
    },
    bottomItemCb(entry) {
      const currentY = entry.boundingClientRect.top;
      const currentRatio = entry.intersectionRatio;
      const isIntersecting = entry.isIntersecting;

      if (isIntersecting && currentY < this.bottomSentinelPreviousY 
      && currentRatio > this.bottomSentinelPreviousRatio) {
        console.log('---bottom update---')
        this.observer.unobserve(this.firstListItem)
        this.observer.unobserve(this.lastListItem)
        this.currentIndex += 10
        console.log('CurrentIndex: ', this.currentIndex)
        this.updatePadding(true)
        this.$nextTick(() => {
          this.updateObserveItem()
        })
      }
      this.bottomSentinelPreviousY = currentY
      this.bottomSentinelPreviousRatio = currentRatio
    },
    topItemCb(entry) {
      const currentY = entry.boundingClientRect.top;
      const currentRatio = entry.intersectionRatio;
      const isIntersecting = entry.isIntersecting;

      if (isIntersecting && currentY > this.topSentinelPreviousY 
      && currentRatio > this.topSentinelPreviousRatio) {
        this.observer.unobserve(this.firstListItem)
        this.observer.unobserve(this.lastListItem)
        if (this.currentIndex > 0) {
          this.currentIndex -= 10
        }
        console.log('top callback currentIndex: ', this.currentIndex)
        this.updatePadding(false)
        this.$nextTick(() => {
          this.updateObserveItem()
        })
      }
      this.topSentinelPreviousY = currentY
      this.topSentinelPreviousRatio = currentRatio
    },
    // 不能简单的取第一个和最后一个，此时ref是乱序的
    updateObserveItem() {
      const [firstListItem, lastListItem] = this.getFirstAndLastItem()
      // console.log(firstListItem, lastListItem)
      this.firstListItem = firstListItem
      this.lastListItem = lastListItem
      this.observer.observe(this.firstListItem)
      this.observer.observe(this.lastListItem)
    },
    updatePadding(scrollDown) {
      if (scrollDown) {
        this.paddingTop += 500
        if (this.paddingBottom !== 0) {
          this.paddingBottom -= 500
        }
      } else {
        this.paddingBottom += 500
        if (this.paddingTop !== 0) {
          this.paddingTop -= 500
        }
      }
    },
    getFirstAndLastItem() {
      const res = this.$refs.list.filter(vnode => {
        if (vnode.id === this.firstIndex || vnode.id === this.lastIndex) {
          return true
        }
        return false
      })
      if (+res[0].id > +res[1].id) [res[0], res[1]] = [res[1], res[0]]
      return res
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