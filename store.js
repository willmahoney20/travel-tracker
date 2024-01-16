import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = create(set => ({
    // props for the "Lived" in countries
    livedCountries: [],
    addLived: country_id => {
        try {
            set(state => {
                AsyncStorage.setItem(
                    'livedCountries',
                    JSON.stringify([country_id, ...state.livedCountries])
                )
        
                return { livedCountries: [country_id, ...state.livedCountries] }
            })
        } catch (err) {
            console.error('Error adding lived in country:', err)
        }
    },
    removeLived: async country_id => {
        try {
            set(state => {
                const updatedCountries = [...state.livedCountries].filter(id => id !== country_id)
                
                AsyncStorage.setItem(
                    'livedCountries',
                    JSON.stringify(updatedCountries)
                )
        
                return { livedCountries: updatedCountries }
            })
        } catch (err) {
            console.error('Error removing lived in country:', err)
        }
    },
    loadLivedCountries: async () => {
        try {
            const storedCountries = await AsyncStorage.getItem('livedCountries')

            storedCountries ? set({ livedCountries: JSON.parse(storedCountries) }) : set({ livedCountries: [] })            
        } catch (err) {
            console.error('Error loading livedCountries from AsyncStorage:', err)
        }
    },

    // props for the "Been" to countries
    beenCountries: [],
    addBeen: country_id => {
        try {
            set(state => {
                AsyncStorage.setItem(
                    'beenCountries',
                    JSON.stringify([country_id, ...state.beenCountries])
                )
        
                return { beenCountries: [country_id, ...state.beenCountries] }
            })
        } catch (err) {
            console.error('Error adding been country:', err)
        }
    },
    removeBeen: async country_id => {
        try {
            set(state => {
                const updatedCountries = [...state.beenCountries].filter(id => id !== country_id)
                
                AsyncStorage.setItem(
                    'beenCountries',
                    JSON.stringify(updatedCountries)
                )
        
                return { beenCountries: updatedCountries }
            })
        } catch (err) {
            console.error('Error removing been country:', err)
        }
    },
    loadBeenCountries: async () => {
        try {
            const storedCountries = await AsyncStorage.getItem('beenCountries')

            storedCountries ? set({ beenCountries: JSON.parse(storedCountries) }) : set({ beenCountries: [] })            
        } catch (err) {
            console.error('Error loading beenCountries from AsyncStorage:', err)
        }
    },

    // props for the "Want" to countries
    wantCountries: [],
    addWant: country_id => {
        try {
            set(state => {
                AsyncStorage.setItem(
                    'wantCountries',
                    JSON.stringify([country_id, ...state.wantCountries])
                )
        
                return { wantCountries: [country_id, ...state.wantCountries] }
            })
        } catch (err) {
            console.error('Error adding want country:', err)
        }
    },
    removeWant: async country_id => {
        try {
            set(state => {
                const updatedCountries = [...state.wantCountries].filter(id => id !== country_id)
                
                AsyncStorage.setItem(
                    'wantCountries',
                    JSON.stringify(updatedCountries)
                )
        
                return { wantCountries: updatedCountries }
            })
        } catch (err) {
            console.error('Error removing want country:', err)
        }
    },
    loadWantCountries: async () => {
        try {
            const storedCountries = await AsyncStorage.getItem('wantCountries')

            storedCountries ? set({ wantCountries: JSON.parse(storedCountries) }) : set({ wantCountries: [] })            
        } catch (err) {
            console.error('Error loading wantCountries from AsyncStorage:', err)
        }
    }
}))

// load the livedCountries when the app starts
useStore.getState().loadLivedCountries()

// load the beenCountries when the app starts
useStore.getState().loadBeenCountries()

// load the wantCountries when the app starts
useStore.getState().loadWantCountries()

export default useStore