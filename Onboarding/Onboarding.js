import { useRef, useState, useEffect } from 'react'
import { StyleSheet, Modal, Animated, View, Dimensions, Pressable } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import Stage1 from './Stage1.js'
import Stage2 from './Stage2.js'
import Stage3 from './Stage3.js'
import Stage4 from './Stage4.js'
import useStore from '../store.js'

const { width, height } = Dimensions.get('window')

export default ({ visible, handleClose }) => {
    const { themes, theme, onboarding, updateOnboarding } = useStore()
    const [stage, setStage] = useState(1)
    const panY = useRef(new Animated.Value(height)).current
    const modalHeight = useRef(new Animated.Value(260)).current

    useEffect(() => {
        if(onboarding) setStage(onboarding)
    }, [])

    // handle the animation when the modal initially opens
    useEffect(() => {
        if(visible){
            Animated.timing(panY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false
            }).start()
        }
    }, [visible])

    // handle the height animation when the modal changes stages
    useEffect(() => {
        let newHeight = stage === 1 ? 260 : height - 100
        Animated.timing(modalHeight, {
            toValue: newHeight,
            duration: 300,
            useNativeDriver: false
        }).start()
    }, [stage])

    return (
        <Modal visible={visible} transparent={true} animationType='slide' onRequestClose={handleClose}>
            <View style={styles.modalContainer}>
                <Animated.View
                    style={[
                        styles.modal,
                        {
                            height: modalHeight,
                            transform: [{ translateY: panY }],
                            backgroundColor: themes[theme]['bg2']
                        }
                    ]}
                >
                    {stage > 1 &&
                    <View style={[styles.back, { backgroundColor: themes[theme]['bg2'] }]}>
                        <Pressable
                            onPress={() => {
                                updateOnboarding(stage - 1)
                                setStage(prev => prev - 1)
                            }}
                        >
                            <Entypo name='chevron-left' size={20} color={themes[theme]['c2']} />
                        </Pressable>
                    </View>}
                    {stage === 1 ?
                    <Stage1 themes={themes} theme={theme} updateStage={value => setStage(value)} />
                    : stage === 2 ? 
                    <Stage2 themes={themes} theme={theme} updateStage={value => setStage(value)} />
                    : stage === 3 ? 
                    <Stage3 themes={themes} theme={theme} updateStage={value => setStage(value)} />
                    : stage === 4 ? 
                    <Stage4 themes={themes} theme={theme} handleClose={handleClose} />
                    : null}
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modal: {
        alignItems: 'center',
        width: width,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 4,
        elevation: 5,
        padding: 20,
        paddingVertical: 30
    },
    back: {
        position: 'absolute',
        top: -42,
        left: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32, 
        borderRadius: 16,
        backgroundColor: '#fff'
    }
})