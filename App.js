import * as React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './Screens/HomeScreen'
import CountriesScreen from './Screens/CountriesScreen'
import ProgressScreen from './Screens/ProgressScreen'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const { Navigator, Screen } = createBottomTabNavigator()

export default () => {
    return (
        <NavigationContainer>
            <StatusBar barStyle='dark-content' />
            
            <Navigator
                initialRouteName='Progress'
                screenOptions={{
                    tabBarActiveTintColor: '#e63946',
                    tabBarInactiveTintColor: '#8d99ae',
                    headerShown: false,
                    tabBarStyle: { marginBottom: 6 }
                }}
            >
                <Screen
                    name='Home'
                    component={HomeScreen}
                    options={{ tabBarIcon: ({ color }) => <FontAwesome name='map-o' size={24} color={color} /> }}
                />
                <Screen
                    name='Countries'
                    component={CountriesScreen}
                    options={{ tabBarIcon: ({ color }) => <FontAwesome name='flag-o' size={24} color={color} /> }}
                />
                <Screen
                    name='Progress'
                    component={ProgressScreen}
                    options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name='progress-check' size={24} color={color} /> }}
                />
            </Navigator>
        </NavigationContainer>
    )
}