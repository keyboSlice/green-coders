import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: {
            drawer: false,
            activePlant: 1,
            plants: [
                {
                    id: 1,
                    name: 'Penelope',
                    image: 'penelope-resized.jpg'
                }
            ]
        },
        mutations: {
            toggleDrawer(state, active) {
                state.drawer = active
            },
            setActivePlant(state, plantId) {
                state.activePlant = plantId
            }
        },
        actions: {
            setActivePlant({ commit }, plantId) {
                commit('setActivePlant', plantId)
                commit('toggleDrawer', true)
            }
        },
        getters: {
            activePlant: state =>
                state.plants.filter(plant => plant.id === state.activePlant)[0]
        }
    })
}

export default createStore
