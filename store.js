import { Appearance } from 'react-native'
import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useStore = create(set => ({
    // props for onboarding
    onboarding: 1,
    updateOnboarding: value => {
        try {
            set(state => {
                AsyncStorage.setItem(
                    'onboarding',
                    JSON.stringify(value)
                )
                
                return { onboarding: value }
            })
        } catch (err) {
            console.error('Error updating the onboarding value:', err)
        }
    },
    loadOnboarding: async () => {
        try {
            const onboardingValue = await AsyncStorage.getItem('onboarding')

            set({ onboarding: onboardingValue ? JSON.parse(onboardingValue) : 0 })
        } catch (err) {
            console.error('Error loading onboarding progress from AsyncStorage:', err)
        }
    },
    
    // props for themes
    themes: {
        'dark': {
            'bg1': '#232323',
            'bg2': '#000',
            'bg3': '#444',
            'c1': '#fff',
            'c2': '#ccc',
            'c3': '#999',
            'map_fill': '#444'
        },
        'light': {
            'bg1': '#EDF2F4',
            'bg2': '#FFF',
            'bg3': '#D9D9D9',
            'c1': '#000',
            'c2': '#777',
            'c3': '#6c757d',
            'map_fill': '#ced4da'
        }
    },
    theme: 'light', // use darkMode value to set this when the app loads

    // props for settings
    darkMode: false,
    updateDarkMode: (value, device) => {
        try {
            set(state => {
                let update = {}

                // check to see if we need to turn off deviceSettings
                if(device){
                    update.deviceSettings = false
                    AsyncStorage.setItem(
                        'deviceSettings',
                        JSON.stringify(false)
                    )
                }

                AsyncStorage.setItem(
                    'darkMode',
                    JSON.stringify(value)
                )

                let new_theme = value ? 'dark' : 'light'
                AsyncStorage.setItem(
                    'theme',
                    JSON.stringify(new_theme)
                )

                update.darkMode = value
                update.theme = new_theme

                return update
            })
        } catch (err) {
            console.error('Error updating dark mode:', err)
        }
    },
    deviceSettings: false,
    updateDeviceSettings: value => {
        try {
            set(state => {
                let update = {}

                // if true, we need to get the users device preferences and use these for darkMode
                if(value){
                    const deviceValue = Appearance.getColorScheme()
                    if(deviceValue !== null){
                        let darkModeValue = deviceValue === 'dark' ? true : false
                        set({ darkMode: darkModeValue })
                        set({ theme: deviceValue })
    
                        AsyncStorage.setItem(
                            'darkMode',
                            JSON.stringify(darkModeValue)
                        )
    
                        AsyncStorage.setItem(
                            'theme',
                            JSON.stringify(deviceValue)
                        )

                        update.darkMode = darkModeValue
                        update.theme = deviceValue
                    }
                }
    
                AsyncStorage.setItem(
                    'deviceSettings',
                    JSON.stringify(value)
                )

                update.deviceSettings = value

                return update
            })
        } catch (err) {
            console.error('Error updating device settings:', err)
        }
    },
    loadSettings: async () => {
        try {
            const deviceSettingsValue = await AsyncStorage.getItem('deviceSettings')

            // if value is true, then we need to set the correct darkMode value based on the users device settings, otherwise get their app preference
            if(JSON.parse(deviceSettingsValue)){
                const deviceValue = Appearance.getColorScheme()
                if(deviceValue !== null){
                    set({ darkMode: deviceValue === 'dark' ? true : false })
                    set({ theme: deviceValue })
                }
            } else {
                const darkModeValue = await AsyncStorage.getItem('darkMode')
                if(darkModeValue !== null){
                    set({ darkMode: JSON.parse(darkModeValue) })
                    set({ theme: JSON.parse(darkModeValue) ? 'dark' : 'light' })
                }
            }

            if(deviceSettingsValue !== null) set({ deviceSettings: JSON.parse(deviceSettingsValue) })
        } catch (err){
            console.error('Error fetching device settings value:', err)
        }
    },

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

useStore.getState().loadOnboarding()
useStore.getState().loadSettings()

// load the livedCountries when the app starts
useStore.getState().loadLivedCountries()

// load the beenCountries when the app starts
useStore.getState().loadBeenCountries()

// load the wantCountries when the app starts
useStore.getState().loadWantCountries()

export default useStore