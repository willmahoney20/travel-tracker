import { useRef, useEffect } from 'react'
import { StyleSheet, Modal, Animated, PanResponder, View, Text, Pressable, TouchableWithoutFeedback, Dimensions, SafeAreaView  } from 'react-native'
import { Image } from 'expo-image'
import Flags from '../assets/Flags.js'
import { Entypo } from '@expo/vector-icons'
import useStore from '../store.js'
import { FontAwesome } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

const { width, height } = Dimensions.get('window')

export default ({ visible, title, id, handleClose }) => {
    // get the Zustand data and functions
    const { livedCountries, addLived, removeLived, beenCountries, addBeen, removeBeen, wantCountries, addWant, removeWant } = useStore()
    const panY = useRef(new Animated.Value(height)).current

    const handleOpen = () => {
        Animated.timing(panY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start()
    }

    const closeAnim = Animated.timing(panY, {
        toValue: height,
        duration: 500,
        useNativeDriver: false
    })

    useEffect(() => {
        if(visible) handleOpen()
    }, [visible])

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gestureState) => {
                if(gestureState.dy > 0){
                    panY.setValue(gestureState.dy)
                }
            },
            onPanResponderRelease: (e, gestureState) => {
                if(gestureState.dy > 100){
                    closeAnim.start(() => handleClose())
                } else {
                    handleOpen()
                }
            }
        })
    ).current

    const handleLived = async () => {
        if(beenCountries.includes(id)){
            await removeBeen(id)
        } else if(wantCountries.includes(id)){
            await removeWant(id)
        }

        if(livedCountries.includes(id)){
            removeLived(id)
        } else {
            addLived(id)
        }

        handleClose()
    }

    const handleBeen = async () => {
        if(livedCountries.includes(id)){
            await removeLived(id)
        } else if(wantCountries.includes(id)){
            await removeWant(id)
        }

        if(beenCountries.includes(id)){
            removeBeen(id)
        } else {
            addBeen(id)
        }

        handleClose()
    }

    const handleWant = async () => {
        if(livedCountries.includes(id)){
            await removeLived(id)
        } else if(beenCountries.includes(id)){
            await removeBeen(id)
        }

        if(wantCountries.includes(id)){
            removeWant(id)
        } else {
            addWant(id)
        }

        handleClose()
    }

    return (
        <Modal visible={visible} transparent={true} animationType='slide' onRequestClose={handleClose}>
            <TouchableWithoutFeedback onPress={handleClose}>
                <View style={styles.modalContainer}>
                    <Animated.View style={[styles.modal, { transform: [{ translateY: panY }] }]} {...panResponder.panHandlers}>
                        <View style={styles.imageCon}>
                            <Image source={{uri: 'https://images.pexels.com/photos/620337/pexels-photo-620337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}} cachePolicy='memory' style={styles.image} />
                            <Text style={styles.imageTitle}>{title}</Text>
                        </View>
                        
                        <View style={styles.btns}>
                            <View style={styles.btnCon}>
                                <Pressable onPress={handleLived}>
                                    <View style={[styles.btn, { backgroundColor: livedCountries.includes(id) ? '#52b788' : '#ced4da'}]}>
                                        <Ionicons name='home-outline' size={17} color={livedCountries.includes(id) ? '#fff' : '#000'} />
                                        <Text style={[styles.btnText, { color: livedCountries.includes(id) ? '#fff' : '#000' }]}>Lived</Text>
                                    </View>
                                </Pressable>
                            </View>
                            <View style={styles.btnCon}>
                                <Pressable onPress={() => handleBeen(id)}>
                                    <View style={[styles.btn, { backgroundColor: beenCountries.includes(id) ? '#e63946' : '#ced4da'}]}>
                                        <FontAwesome name='flag-o' size={17} color={beenCountries.includes(id) ? '#fff' : '#000'} />
                                        <Text style={[styles.btnText, { color: beenCountries.includes(id) ? '#fff' : '#000' }]}>Been</Text>
                                    </View>
                                </Pressable>
                            </View>
                            <View style={styles.btnCon}>
                                <Pressable onPress={() => handleWant(id)}>
                                    <View style={[styles.btn, { backgroundColor: wantCountries.includes(id) ? '#ee6c4d' : '#ced4da'}]}>
                                        <Ionicons name='heart-outline' size={17} color={wantCountries.includes(id) ? '#fff' : '#000'} />
                                        <Text style={[styles.btnText, { color: wantCountries.includes(id) ? '#fff' : '#000' }]}>Want</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
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
        padding: 20
    },
    image: {
        width: width - 40,
        height: 240,
        borderRadius: 20
    },
    imageTitle: {
        position: 'absolute',
        bottom: 15,
        left: 15,
        fontSize: 50,
        fontWeight: 'bold',
        lineHeight: 52,
        color: '#fff',
        textShadowColor:'#777',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    btns: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: width - 40,
        paddingTop: 20,
    },
    btnCon: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 42,
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    btnText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#000',
        marginLeft: 5
    }
})