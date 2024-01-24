import { Text, View, ScrollView } from 'react-native'
import AppStyles from '../Styles/AppStyles'

export default () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={AppStyles.ipPage}>
            <View style={AppStyles.ipSection}>
                <Text style={AppStyles.ipTitle}>Acceptance of Terms</Text>
                <Text style={AppStyles.ipText}>By accessing or using hopper, you agree to be bound by these terms and conditions.</Text>
            </View>
            <View style={AppStyles.ipSection}>
                <Text style={AppStyles.ipTitle}>Use of the App</Text>
                <View style={AppStyles.ipList}>
                    <Text style={AppStyles.ipText}><Text style={{fontWeight: 'bold', color: '#444'}}>- Purpose: </Text>The app is designed for tracking travel and is intended for personal and non-commercial use.</Text>
                    <Text style={AppStyles.ipText}><Text style={{fontWeight: 'bold', color: '#444'}}>- Restrictions: </Text>You may not use the app for any unlawful purpose or in any way that interrupts, damages, or impairs the app's functionality.</Text>
                </View>
            </View>
            <View style={AppStyles.ipSection}>
                <Text style={AppStyles.ipTitle}>Intellectual Property</Text>
                <Text style={AppStyles.ipText}>All rights, title, and interest in and to hopper and its contents are the property of willmahoney.co.</Text>
            </View>
            <View style={AppStyles.ipSection}>
                <Text style={AppStyles.ipTitle}>No Warranty</Text>
                <Text style={AppStyles.ipText}>The app is provided "as is" without any warranties of any kind.</Text>
            </View>
            <View style={AppStyles.ipSection}>
                <Text style={AppStyles.ipTitle}>Limitation of Liability</Text>
                <Text style={AppStyles.ipText}>Hopper will not be liable for any damages or loss resulting from your use of the app.</Text>
            </View>
            <View style={AppStyles.ipSection}>
                <Text style={AppStyles.ipTitle}>Amendments</Text>
                <Text style={AppStyles.ipText}>We reserve the right to modify these terms at any time. Your continued use of the app constitutes acceptance of those changes.</Text>
            </View>
            <View style={AppStyles.ipSection}>
                <Text style={AppStyles.ipTitle}>Contact Us</Text>
                <Text style={AppStyles.ipText}>For any questions or concerns about these terms, please contact us at willmahoney.co.</Text>
            </View>
        </ScrollView>
    )
}