import { StyleSheet, Modal, Text, View, Pressable, SafeAreaView } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import Terms from './Terms.js'
import PrivacyPolicy from './PrivacyPolicy.js'

export default ({ themes, theme, visible, page, handleClose }) => {
    return (
        <Modal
            visible={visible}
            transparent={false}
            animationType='slide'
            presentationStyle='fullScreen'
            onRequestClose={handleClose}
        >
            <View style={{ flex: 1, backgroundColor: themes[theme]['bg2'] }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.modalContainer}>
                        <View style={styles.header}>
                            <Pressable onPress={handleClose} style={{ width: 32 }}>
                                <Entypo name='chevron-left' size={22} color={themes[theme]['c2']} />
                            </Pressable>
                            <Text style={[styles.title, { color: themes[theme]['c1'] }]}>{page}</Text>
                            <View style={{ width: 32 }}></View>
                        </View>

                        {page === 'Terms & Conditions' ? 
                        <Terms themes={themes} theme={theme} /> : 
                        page === 'Privacy Policy' ?
                        <PrivacyPolicy themes={themes} theme={theme} /> : null}
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        padding: 20,
        paddingVertical: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000'
    }
})