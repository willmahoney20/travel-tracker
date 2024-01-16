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
    const livedCountries = useStore(state => state.livedCountries)
    const beenCountries = useStore(state => state.beenCountries)
    const wantCountries = useStore(state => state.wantCountries)

    const [minScale, setMinScale] = useState(1)
    const [maxScale] = useState(4)
    const [endXPosition, setEndXPosition] = useState(null)
    const [endYPosition, setEndYPosition] = useState(null)

    const [modalVisible, setModalVisible] = useState(false) // country code for the modal popup
    const [modalData, setModalData] = useState({ id: '', title: '' }) // object to hold modal id and title
    const positionX = useSharedValue(0) // the current x position of the world map
    const positionY = useSharedValue(0) // the current y position of the world map
    const prevX = useSharedValue(0) // the previous x position of the world map
    const prevY = useSharedValue(0) // the previous y position of the world map
    const scale = useSharedValue(1) // the current scale the user is zoomed in at
    const prevScale = useSharedValue(1) // the previous scale the user was zoomed in at
    
    const { height } = useWindowDimensions()
    const ratio = (height / ORIGINAL_SVG_HEIGHT)

    useEffect(() => {
        if(height){
            let scale_min = (height / ORIGINAL_SVG_HEIGHT)
            if(scale_min > 4) scale_min = 4
            
            scale.value = scale_min
        
            setMinScale(scale_min)
            setEndXPosition(ORIGINAL_SVG_WIDTH - 20)
            setEndYPosition(ORIGINAL_SVG_HEIGHT)
        }
    }, [])

    const panGesture = Gesture.Pan()
        .onUpdate(e => {
            // assign x and y axis pan limits, that take the zoom scale into account
            if(scale.value >= minScale && scale.value <= maxScale){
                let maxX = endXPosition * 0.24 + (endXPosition * 0.1 * scale.value)
                scale.value < 2 ? null : 
                    scale.value < 2.5 ? maxX -= 15 :
                        scale.value < 3 ? maxX -= 50 : 
                            scale.value < 3.25 ? maxX -= 85 : 
                                scale.value < 3.5 ? maxX -= 110 : 
                                    scale.value <= 3.75 ? maxX -= 140 :
                                        scale.value <= 4 ? maxX -= 160 : null

                let ratio_6 = ratio * ratio * ratio * ratio * ratio * ratio
                let maxY = ((endYPosition * 0.15 * scale.value) - endYPosition * 0.05)
                scale.value < 1.25 ? maxY -= (12 * (ratio_6)) : 
                    scale.value < 1.5 ? maxY -= (5 * ratio_6) : 
                        scale.value < 1.75 ? maxY -= (1 * ratio_6) :
                            scale.value < 2.75 ? null :
                                scale.value < 3.25 ? maxY -= (24 * ratio_6) :
                                    scale.value < 3.5 ? maxY -= (40 * ratio_6) :
                                        scale.value <= 4 ? maxY -= (72 * ratio_6) : null

                if(prevX.value + (e.translationX / scale.value) >= -maxX && prevX.value + (e.translationX / scale.value) <= maxX){
                    // we divide the current translation amount by scale so pan speeds remain consistent at all scale levels
                    positionX.value = prevX.value + (e.translationX / scale.value)
                } else {
                    if(prevX.value + (e.translationX / scale.value) < 0){
                        positionX.value = -maxX
                    } else {
                        positionX.value = maxX
                    }
                }
        
                if(prevY.value + (e.translationY / scale.value) >= -maxY && prevY.value + (e.translationY / scale.value) <= maxY){
                    // we divide the current translation amount by scale so pan speeds remain consistent at all scale levels
                    positionY.value = prevY.value + (e.translationY / scale.value)
                } else {
                    if(prevY.value + (e.translationY / scale.value) < 0){
                        positionY.value = -maxY
                    } else {
                        positionY.value = maxY
                    }
                }
            }
        })
        .onEnd(() => {
            // setting the values of x and y so we know where the position should start from on the next pan gesture
            prevX.value = positionX.value
            prevY.value = positionY.value
        })

    const pinchGesture = Gesture.Pinch()
        .onUpdate(e => {
            // check scale value is with the upper and lower limit of allowed scale values for this device
            if(prevScale.value * e.scale >= minScale && prevScale.value * e.scale <= maxScale){
                scale.value = prevScale.value * e.scale
            }
        })
        .onEnd(() => {
            prevScale.value = scale.value
        })

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
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

                <GestureDetector gesture={Gesture.Simultaneous(pinchGesture, panGesture)}>
                    <Animated.View style={[styles.worldMapContainer, animatedStyle]}>
                        <WorldMap
                            lived={livedCountries}
                            been={beenCountries}
                            want={wantCountries}
                            height={ORIGINAL_SVG_HEIGHT}
                            width={ORIGINAL_SVG_WIDTH}
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