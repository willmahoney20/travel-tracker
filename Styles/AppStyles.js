import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#edf2f4'
    },
    header: {
        flexDirection: 'column',
        width: '100%',
        padding: 10,
        paddingHorizontal: 15
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 700,
        margin: 0
    },

    // styles for the onboarding
    obCon: {
        flex: 1,
        justifyContent: 'space-between'
    },
    obBtn: {
        alignItems: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: '#E63946',
        borderRadius: 20,
    },
    obBtnText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
    },

    // styles for the info pages in settings
    ipPage: {
        flex: 1
    },
    ipSection: {
        marginTop: 15
    },
    ipTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 5
    },
    ipText: {
        fontSize: 15,
        fontWeight: '300',
        color: '#777',
        marginBottom: 5
    },
    ipList: {
        paddingLeft: 10,
    }
})