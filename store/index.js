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
            },
            setPlant(state, plant) {
                state.plants = [...state.plants, plant]
            }
        },
        actions: {
            setActivePlant({ commit }, plantId) {
                commit('setActivePlant', plantId)
                commit('toggleDrawer', true)
            },
            savePlant({ commit, state }, plant) {
                const sortedByID = state.plants.sort((a, b) => {
                    return a.id > b.id ? -1 : 1
                })

                const highestID = sortedByID[0].id

                commit('setPlant', { ...plant, id: highestID + 1 })
            }
        },
        getters: {
            activePlant: state =>
                state.plants.filter(plant => plant.id === state.activePlant)[0]
        }
    })
}

export default createStore
