import { Text, View, ScrollView } from 'react-native'
import AppStyles from '../Styles/AppStyles'

export default ({ themes, theme }) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={AppStyles.ipPage}>
            <View style={AppStyles.ipSection}>
                <Text style={[AppStyles.ipTitle, { color: themes[theme]['c1'] }]}>Introduction</Text>
                <Text style={[AppStyles.ipText, { color: themes[theme]['c2'] }]}>Welcome to hopper. This privacy policy outlines how we handle your data in our app.</Text>
            </View>
            <View style={AppStyles.ipSection}>
                <Text style={[AppStyles.ipTitle, { color: themes[theme]['c1'] }]}>Data Storage and Use</Text>
                <View style={AppStyles.ipList}>
                    <Text style={[AppStyles.ipText, { color: themes[theme]['c2'] }]}><Text style={{fontWeight: 'bold'}}>- Local Storage: </Text>All data you input into hopper is stored locally on your device using Async Storage. We do not have access to this data.</Text>
                    <Text style={[AppStyles.ipText, { color: themes[theme]['c2'] }]}><Text style={{fontWeight: 'bold'}}>- Data Types: </Text>The app may store travel locations, dates, notes, and other travel-related information that you input.</Text>
                </View>
            </View>
            <View style={AppStyles.ipSection}>
                <Text style={[AppStyles.ipTitle, { color: themes[theme]['c1'] }]}>No Data Sharing</Text>
                <Text style={[AppStyles.ipText, { color: themes[theme]['c2'] }]}>Since the data is stored on your device, we do not collect, share, or sell any of your personal information.</Text>
            </View>
            <View style={AppStyles.ipSection}>
                <Text style={[AppStyles.ipTitle, { color: themes[theme]['c1'] }]}>Data Security</Text>
                <Text style={[AppStyles.ipText, { color: themes[theme]['c2'] }]}>Your data's security is dependent on your device's security measures. We recommend protecting your device with appropriate security features.</Text>
            </View>
            <View style={AppStyles.ipSection}>
                <Text style={[AppStyles.ipTitle, { color: themes[theme]['c1'] }]}>Changes to This Policy</Text>
                <Text style={[AppStyles.ipText, { color: themes[theme]['c2'] }]}>We may update this policy from time to time. Any changes will be posted on this page.</Text>
            </View>
            <View style={AppStyles.ipSection}>
                <Text style={[AppStyles.ipTitle, { color: themes[theme]['c1'] }]}>Contact Us</Text>
                <Text style={[AppStyles.ipText, { color: themes[theme]['c2'] }]}>For any questions or concerns about this privacy policy, please contact us at willmahoney.co.</Text>
            </View>
        </ScrollView>
    )
}