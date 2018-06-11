import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedParticipants: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedParticipants (state, payload) {
      state.loadedParticipants = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadParticipants ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('participants').once('value')
        .then((data) => {
          const participants = []
          const obj = data.val()
          for (let key in obj) {
            participants.push({
              id: key,
              index: obj[key].index,
              name: obj[key].name,
              visited: obj[key].visited,
              visitdate: obj[key].visitDateTime ? new Date(obj[key].visitDateTime).toDateString() : null
            })
          }
          commit('setLoadedParticipants', participants)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    updateUserVisit ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = {
        visited: true,
        visitDateTime: firebase.database.ServerValue.TIMESTAMP
      }
      return firebase.database().ref('participants').child(payload.id).update(user)
        .then((data) => {
          commit('setLoading', false)
          return 'DONE'
        })
        .catch((error) => {
          console.log(error)
        })
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedParticipants (state) {
      return state.loadedParticipants
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
