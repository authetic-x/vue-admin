
const state = {
  cachedView: []
}

const mutations = {
  ADD_CACHED_VIEW(state, view) {
    if (state.cachedView.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedView.push(view.name)
    }
  },
  DEL_CACHED_VIEW(state, view) {
    const index = state.cachedView.indexOf(view.name)
    index > -1 && state.cachedView.splice(index, 1)
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
  }
}

const actions = {
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },
  addView({ dispatch }, view) {
    dispatch('addCachedView', view)
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
      resolve({
        cachedView: [...state.cachedView]
      })
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

}

export default {
  namespaced: 'tagsView',
  state,
  mutations,
  actions
}