import { useState, useEffect } from 'react'
import { Platform, StyleSheet, useWindowDimensions, View } from 'react-native'
import { Gesture, GestureHandlerRootView, GestureDetector  } from 'react-native-gesture-handler'
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated'
import WorldMap from '../WorldMap/SVG.jsx'
import useStore from '../store.js'
import AppStyles from '../Styles/AppStyles.js'
import CountryModal from '../Components/CountryModal.js'

// SVG_RATIO is (width / height) of the original svg world map, we will use this ratio to get the width based on the screen height
const ORIGINAL_SVG_WIDTH = 1009.6727
const ORIGINAL_SVG_HEIGHT = 689.96301
const SVG_RATIO = (ORIGINAL_SVG_WIDTH / ORIGINAL_SVG_HEIGHT)

export default () => {
    // get the Zustand data and functions
    const { livedCountries, beenCountries, wantCountries } = useStore()

    const [modalVisible, setModalVisible] = useState(false) // country code for the modal popup
    const [modalData, setModalData] = useState({ id: '', title: '' }) // object to hold modal id and title
    const positionX = useSharedValue(0) // the current x position of the world map
    const positionY = useSharedValue(0) // the current y position of the world map
    const prevX = useSharedValue(0) // the previous x position of the world map
    const prevY = useSharedValue(0) // the previous y position of the world map
    
    const screenHeight = useWindowDimensions().height
    const screenWidth = useWindowDimensions().width
    const width = screenHeight * SVG_RATIO

    const panGesture = Gesture.Pan()
        .onUpdate(e => {
            let maxX = width - screenWidth === 0 ? 20 : ((width - screenWidth) / 2) + 20
            let maxY = 30

            if(prevX.value + e.translationX >= -maxX && prevX.value + e.translationX <= maxX){
                positionX.value = prevX.value + e.translationX
            } else {
                if(prevX.value + e.translationX < 0){
                    positionX.value = -maxX
                } else {
                    positionX.value = maxX
                }
            }
    
            if(prevY.value + e.translationY >= -maxY && prevY.value + e.translationY <= maxY){
                positionY.value = prevY.value + e.translationY
            } else {
                if(prevY.value + e.translationY < 0){
                    positionY.value = -maxY
                } else {
                    positionY.value = maxY
                }
            }
        })
        .onEnd(() => {
            // setting the values of x and y so we know where the position should start from on the next pan gesture
            prevX.value = positionX.value
            prevY.value = positionY.value
        })

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: positionX.value },
            { translateY: positionY.value }
        ]
    }))

    const openModal = (id, title) => {
        setModalVisible(true)
        setModalData({ id: id.toLowerCase(), title })
    }

    return (
        <View style={[AppStyles.container, styles.homeContainer]}>
            <GestureHandlerRootView>
                <CountryModal
                    visible={modalVisible}
                    id={modalData.id}
                    title={modalData.title}
                    handleClose={() => {
                        setModalVisible(false)
                        setModalData({ id: '', title: '' })
                    }}
                />

                <GestureDetector gesture={panGesture}>
                    <Animated.View style={[styles.worldMapContainer, animatedStyle]}>
                        <WorldMap
                            lived={livedCountries}
                            been={beenCountries}
                            want={wantCountries}
                            height={screenHeight}
                            width={width}
                            openModal={openModal}
                        />
                    </Animated.View>
                </GestureDetector>
            </GestureHandlerRootView>
        </View>
    )
}

const styles = StyleSheet.create({
    homeContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    worldMapContainer: {
      top: 24,
      marginHorizontal: 10
    }
})