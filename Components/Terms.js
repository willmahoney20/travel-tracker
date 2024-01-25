import { Text, View, ScrollView } from 'react-native'
import AppStyles from '../Styles/AppStyles'

export default ({ themes, theme }) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={AppStyles.ipPage}>
            <View style={AppStyles.ipSection}>
                <Text style={[AppStyles.ipTitle, { color: themes[theme]['c1'] }]}>Acceptance of Terms</Text>
                <Text style={[AppStyles.ipText, { color: themes[theme]['c2'] }]}>By accessing or using hopper, you agree to be bound by these terms and conditions.</Text>
            </View>
            <View style={AppStyles.ipSection}>
                <Text style={[AppStyles.ipTitle, { color: themes[theme]['c1'] }]}>Use of the App</Text>
                <View style={AppStyles.ipList}>
                    <Text style={[AppStyles.ipText, { color: themes[theme]['c2'] }]}><Text style={{fontWeight: 'bold'}}>- Purpose: </Text>The app is designed for tracking travel and is intended for personal and non-commercial use.</Text>
                    <Text style={[AppStyles.ipText, { color: themes[theme]['c2'] }]}><Text style={{fontWeight: 'bold'}}>- Restrictions: </Text>You may not use the app for any unlawful purpose or in any way that interrupts, damages, or impairs the app's functionality.</Text>
                </View>
            </View>
            <View style={AppStyles.ipSection}>
                <Text style={[AppStyles.ipTitle, { color: themes[theme]['c1'] }]}>Intellectual Property</Text>
                <Text style={[AppStyles.ipText, { color: themes[theme]['c2'] }]}>All rights, title, and interest in and to hopper and its contents are the property of willmahoney.co.</Text>
            </View>
            <View style={AppStyles.ipSection}>
                <Text style={[AppStyles.ipTitle, { color: themes[theme]['c1'] }]}>No Warranty</Text>
                <Text style={[AppStyles.ipText, { color: themes[theme]['c2'] }]}>The app is provided "as is" without any warranties of any kind.</Text>
            </View>
            <View style={AppStyles.ipSection}>
                <Text style={[AppStyles.ipTitle, { color: themes[theme]['c1'] }]}>Limitation of Liability</Text>
                <Text style={[AppStyles.ipText, { color: themes[theme]['c2'] }]}>Hopper will not be liable for any damages or loss resulting from your use of the app.</Text>
            </View>
            <View style={AppStyles.ipSection}>
                <Text style={[AppStyles.ipTitle, { color: themes[theme]['c1'] }]}>Amendments</Text>
                <Text style={[AppStyles.ipText, { color: themes[theme]['c2'] }]}>We reserve the right to modify these terms at any time. Your continued use of the app constitutes acceptance of those changes.</Text>
            </View>
            <View style={AppStyles.ipSection}>
                <Text style={[AppStyles.ipTitle, { color: themes[theme]['c1'] }]}>Contact Us</Text>
                <Text style={[AppStyles.ipText, { color: themes[theme]['c2'] }]}>For any questions or concerns about these terms, please contact us at willmahoney.co.</Text>
            </View>
        </ScrollView>
    )
}