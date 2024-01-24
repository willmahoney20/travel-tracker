import { Text, View, ScrollView } from 'react-native'
import AppStyles from '../Styles/AppStyles'

export default () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={AppStyles.ipPage}>
            <View style={AppStyles.ipSection}>
                <Text style={AppStyles.ipTitle}>Introduction</Text>
                <Text style={AppStyles.ipText}>Welcome to hopper. This privacy policy outlines how we handle your data in our app.</Text>
            </View>
            <View style={AppStyles.ipSection}>
                <Text style={AppStyles.ipTitle}>Data Storage and Use</Text>
                <View style={AppStyles.ipList}>
                    <Text style={AppStyles.ipText}><Text style={{fontWeight: 'bold', color: '#444'}}>- Local Storage: </Text>All data you input into [Your App Name] is stored locally on your device using Async Storage. We do not have access to this data.</Text>
                    <Text style={AppStyles.ipText}><Text style={{fontWeight: 'bold', color: '#444'}}>- Data Types: </Text>The app may store travel locations, dates, notes, and other travel-related information that you input.</Text>
                </View>
            </View>
            <View style={AppStyles.ipSection}>
                <Text style={AppStyles.ipTitle}>No Data Sharing</Text>
                <Text style={AppStyles.ipText}>Since the data is stored on your device, we do not collect, share, or sell any of your personal information.</Text>
            </View>
            <View style={AppStyles.ipSection}>
                <Text style={AppStyles.ipTitle}>Data Security</Text>
                <Text style={AppStyles.ipText}>Your data's security is dependent on your device's security measures. We recommend protecting your device with appropriate security features.</Text>
            </View>
            <View style={AppStyles.ipSection}>
                <Text style={AppStyles.ipTitle}>Changes to This Policy</Text>
                <Text style={AppStyles.ipText}>We may update this policy from time to time. Any changes will be posted on this page.</Text>
            </View>
            <View style={AppStyles.ipSection}>
                <Text style={AppStyles.ipTitle}>Contact Us</Text>
                <Text style={AppStyles.ipText}>For any questions or concerns about this privacy policy, please contact us at willmahoney.co.</Text>
            </View>
        </ScrollView>
    )
}