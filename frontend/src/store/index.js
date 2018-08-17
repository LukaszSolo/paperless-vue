import Vuex from 'vuex'

const store = () => new Vuex.Store({
  state: {
    loggedUser: undefined,
    tags: [],
    tagsIdToTag: {},
    tagsSlugToTag: {}
  },
  mutations: {
    SET_LOGGED_USER (state, loggedUser) {
      state.loggedUser = loggedUser
    },
    SET_TAGS (state, tags) {
      state.tags = tags
      state.tagsIdToTag = {}
      state.tagsSlugToTag = {}
      for (var i in tags) {
        let tag = tags[i]
        state.tagsIdToTag[tag.id] = tag
        state.tagsSlugToTag[tag.slug] = tag
      }
    }
  },
  getters: {
    loggedUser (state) {
      return state.loggedUser
    },
    tags (state) {
      return state.tags
    },
    tagById: state => tagId => state.tagsIdToTag[tagId],
    tagBySlug: state => tagSlug => state.tagsSlugToTag[tagSlug]
  }
})

export default store
