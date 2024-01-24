import { StyleSheet, View, Switch, SafeAreaView, Text } from 'react-native'
import AppStyles from '../Styles/AppStyles'
import useStore from '../store'

export default () => {
    const { themes, theme, darkMode, updateDarkMode, deviceSettings, updateDeviceSettings } = useStore()

    return (
        <View style={[AppStyles.container, { backgroundColor: themes[theme]['bg1'] }]}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={AppStyles.header}>
                    <View style={AppStyles.headerTop}>
                        <Text style={[AppStyles.headerTitle, { color: themes[theme]['c1'] }]}>Settings</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    <View styles={styles.options}>
                        <View style={styles.option}>
                            <View style={styles.optionMain}>
                                <Text style={[styles.optionTitle, { color: themes[theme]['c1'] }]}>Dark Mode</Text>
                                <Switch
                                    value={darkMode}
                                    onValueChange={() => updateDarkMode(!darkMode, deviceSettings)}
                                />
                            </View>
                        </View>
                        <View style={styles.option}>
                            <View style={styles.optionMain}>
                                <Text style={[styles.optionTitle, { color: themes[theme]['c1'] }]}>Use Device Settings</Text>
                                <Switch
                                    value={deviceSettings}
                                    onValueChange={() => updateDeviceSettings(!deviceSettings)}
                                />
                            </View>
                            <Text style={[styles.optionText, { color: themes[theme]['c2'] }]}>Set Dark Mode to use the Light or Dark selection located in your device Display & Birghtness settings.</Text>
                        </View>
                    </View>
                    <View style={[styles.footer, { borderTopColor: themes[theme]['bg3'] }]}>
                        <View style={styles.footerLinks}>
                            <Text style={[styles.footerText, { color: themes[theme]['c2'] }]}>Terms & Conditions</Text>
                            <Text style={[styles.footerText, { color: themes[theme]['c2'] }]}>Privacy Policy</Text>
                        </View>
                        <Text style={[styles.footerText, styles.footerMain, { color: themes[theme]['c1'] }]}>
                            &copy; {new Date().getFullYear()} Hoppin
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingBottom: 10
    },
    options: {
        paddingVertical: 15
    },
    option: {
        marginBottom: 15
    },
    optionMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    optionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    optionText: {
        fontSize: 14,
        fontWeight: '300',
        color: '#777',
        marginTop: 5
    },
    footer: {
        alignItems: 'center',
        paddingVertical: 20,
        borderTopColor: '#D9D9D9',
        borderTopWidth: 1,
    },
    footerLinks: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    footerText: {
        fontSize: 14,
        fontWeight: '300',
        marginHorizontal: 10
    },
    footerMain: {
        fontWeight: 'bold',
        marginTop: 10
    }
})