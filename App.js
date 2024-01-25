import React, { useState, useEffect } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MapScreen from './Screens/MapScreen'
import ExploreScreen from './Screens/ExploreScreen'
import ProgressScreen from './Screens/ProgressScreen'
import SettingsScreen from './Screens/SettingsScreen'
import { FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import useStore from './store'
import Onboarding from './Onboarding/Onboarding'

const { Navigator, Screen } = createBottomTabNavigator()

export default () => {
    const { onboarding, themes, theme } = useStore()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if(onboarding !== 'complete') setVisible(true)
    }, [])

    return (
        <NavigationContainer>
            <StatusBar barStyle={(theme === 'dark' ? 'light' : 'dark') + '-content'} />

            <Onboarding visible={visible} handleClose={() => setVisible(false)} />
            
            <Navigator
                initialRouteName='Map'
                screenOptions={{
                    tabBarActiveTintColor: '#e63946',
                    tabBarInactiveTintColor: theme === 'dark' ? '#666' : '#8d99ae',
                    headerShown: false,
                    tabBarStyle: {
                        paddingBottom: 4,
                        backgroundColor: themes[theme]['bg2'],
                        borderTopWidth: 0
                    },
                    lazy: false
                }}
            >
                <Screen
                    name='Map'
                    component={MapScreen}
                    options={{ tabBarIcon: ({ color }) => <FontAwesome name='map-o' size={24} color={color} /> }}
                />
                <Screen
                    name='Explore'
                    component={ExploreScreen}
                    options={{ tabBarIcon: ({ color }) => <FontAwesome name='flag-o' size={24} color={color} /> }}
                />
                <Screen
                    name='Progress'
                    component={ProgressScreen}
                    options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name='progress-check' size={24} color={color} /> }}
                />
                <Screen
                    name='Settings'
                    component={SettingsScreen}
                    options={{ tabBarIcon: ({ color }) => <Ionicons name='settings-outline' size={24} color={color} /> }}
                />
            </Navigator>
        </NavigationContainer>
    )
}