import { StyleSheet, Modal, View, Text, Image, Pressable, TouchableWithoutFeedback, Dimensions  } from 'react-native'
import Flags from '../assets/Flags.js'
import { Entypo } from '@expo/vector-icons'
import useStore from '../store.js'
import { FontAwesome } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

export default ({ visible, title, id, handleClose }) => {
    // get the Zustand data and functions
    const livedCountries = useStore(state => state.livedCountries)
    const addLived = useStore(state => state.addLived)
    const removeLived = useStore(state => state.removeLived)
    const beenCountries = useStore(state => state.beenCountries)
    const addBeen = useStore(state => state.addBeen)
    const removeBeen = useStore(state => state.removeBeen)
    const wantCountries = useStore(state => state.wantCountries)
    const addWant = useStore(state => state.addWant)
    const removeWant = useStore(state => state.removeWant)

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
        <Modal visible={visible} transparent={true} animationType='fade' onRequestClose={handleClose}>
            <View style={styles.modalContainer}>
                <TouchableWithoutFeedback onPress={handleClose}>
                    <View style={styles.modalBackground}></View>
                </TouchableWithoutFeedback>
                <View style={styles.modal}>
                    <Pressable style={styles.close} onPress={handleClose}>
                        <Entypo name='cross' size={24} color='#000' />
                    </Pressable>
                    <Text style={styles.title}>{title}</Text>
                    <Image source={Flags[id.toLowerCase()]} style={styles.flag} />
                    <View style={styles.btns}>
                        <View style={styles.btnCon}>
                            <Pressable onPress={handleLived}>
                                <View style={[styles.btn, { backgroundColor: livedCountries.includes(id) ? '#52b788' : '#ced4da'}]}>
                                    <Ionicons name='home-outline' size={20} color={livedCountries.includes(id) ? '#fff' : '#000'} />
                                </View>
                            </Pressable>
                            <Text style={styles.btnText}>Lived</Text>
                        </View>
                        <View style={styles.btnCon}>
                            <Pressable onPress={() => handleBeen(id)}>
                                <View style={[styles.btn, { backgroundColor: beenCountries.includes(id) ? '#e63946' : '#ced4da'}]}>
                                    <FontAwesome name='flag-o' size={20} color={beenCountries.includes(id) ? '#fff' : '#000'} />
                                </View>
                            </Pressable>
                            <Text style={styles.btnText}>Been</Text>
                        </View>
                        <View style={styles.btnCon}>
                            <Pressable onPress={() => handleWant(id)}>
                                <View style={[styles.btn, { backgroundColor: wantCountries.includes(id) ? '#ee6c4d' : '#ced4da'}]}>
                                    <Ionicons name='heart-outline' size={20} color={wantCountries.includes(id) ? '#fff' : '#000'} />
                                </View>
                            </Pressable>
                            <Text style={styles.btnText}>Want</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    modal: {
        position: 'absolute',
        top: (windowHeight / 2) - 160,
        left: (windowWidth / 2) - 120,
        margin: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 240,
        height: 320,
        padding: 40,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, .9)'
    },
    close: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1d3557',
        textAlign: 'center'
    },
    flag: {
        width: 160,
        height: 107,
        marginBottom: 20,
    },
    btns: {
        width: 160,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btnCon: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 42,
        height: 42,
        borderRadius: 21,
        marginBottom: 10
    },
    btnText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#000'
    }
})