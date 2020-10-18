
const state = {
  cachedView: [],
  visitedView: []
}

const mutations = {
  ADD_CACHED_VIEW(state, view) {
    if (state.cachedView.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedView.push(view.name)
    }
  },
  ADD_VISITED_VIEW(state, view) {
    if (state.visitedView.some(v => v.path === view.path)) return
    state.visitedView.push(Object.assign({}, view, {
      title: view.meta.title || 'no-name'
    }))
  },
  DEL_CACHED_VIEW(state, view) {
    const index = state.cachedView.indexOf(view.name)
    index > -1 && state.cachedView.splice(index, 1)
  },
  DEL_VISITED_VIEW(state, view) {
    for (const [idx, val] of state.visitedView.entries()) {
      if (val.path === view.path) {
        state.visitedView.splice(idx, 1)
        break
      }
    }
  },
  DEL_OTHERS_CACHED_VIEWS(state, view) {
    const index = state.cachedView.indexOf(view.name)
    if (index > -1) {
      state.cachedView = state.cachedView.slice(index, index + 1)
    } else {
      state.cachedView = []
    }
  },
  DEL_ALL_CACHED_VIEWS(state) {
    state.cachedView = []
  },
  UPDATE_VISITED_VIEW(state, view) {
    for (let v of state.visitedView) {
      if (v.path === view.path) {
        // TODO: debug
        // ?? It looks like strange
        v = Object.assign(v, view)
        break
      }
    }
  }
}

const actions = {
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  addView({ dispatch }, view) {
    dispatch('addCachedView', view)
    dispatch('addVisitedView', view)
  },
  delCachedView({ commit, state }, view) {
    return new Promise((resolve, reject) => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedView])
    })
  },
  delView({ dispatch, state }, view) {
    return new Promise((resolve, reject) => {
      dispatch('delCachedView', view)
      dispatch('delVisitedView', view)
      resolve({
        cachedView: [...state.cachedView],
        visitedView: [...state.visitedView]
      })
    })
  },
  delVisitedView({ commit, state }, view) {
    return new Promise(resolve =>  {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedView])
    })
  },
  delOthersCachedView({ commit }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_VIEWS', view)
      resolve([...state.cachedView])
    })
  },
  delOtherViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delOthersCachedView', view)
      resolve({
        cachedView: [...state.cachedView]
      })
    })
  },
  delAllCachedViews({ commit }) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([])
    })
  },
  delAllViews({ dispatch }) {
    return new Promise(resolve => {
      dispatch('delAllCachedViews')
      resolve({
        cachedView: []
      })
    })
  },
  updateVisitedView({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  }
}

export default {
  namespaced: 'tagsView',
  state,
  mutations,
  actions
}