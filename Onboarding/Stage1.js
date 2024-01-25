import { useEffect } from 'react'
import { StyleSheet, Animated, View, Text, Pressable, Easing, Dimensions  } from 'react-native'
import { Image } from 'expo-image'
import FlagIcons from '../assets/FlagIconsLarge.js'
import AppStyles from '../Styles/AppStyles.js'
import useStore from '../store.js'

const width = Dimensions.get('window').width

const countries = ['ae', 'at', 'au', 'ba', 'be', 'ca', 'de', 'ee', 'fr', 'gb', 'ge', 'gr', 'hu', 'ie', 'na', 'no', 'ug', 'us', 've', 'ye']
const doubled = [...countries, ...countries]

export default ({ themes, theme, updateStage }) => {
    const { updateOnboarding } = useStore()
    const flagsPosition = new Animated.Value(0)

    useEffect(() => {
        const resetAnimation = Animated.timing(flagsPosition, {
            toValue: 0,
            duration: 0,
            easing: Easing.linear,
            useNativeDriver: true
        })

        const startAnimation = () => {
            // reset the flags to their original position
            resetAnimation.start(() => {
                Animated.timing(flagsPosition, {
                    toValue: -(42 * countries.length), // 42 is the width + margin of each flag
                    duration: 20 * 1000,
                    easing: Easing.linear,
                    useNativeDriver: true
                }).start(() => startAnimation())
            })
        }

        startAnimation()
    }, [])

    return (
        <View style={AppStyles.obCon}>
            <View>
                <Text style={[styles.title, { color: themes[theme]['c1'] }]}>WELCOME TO HOPPIN</Text>
                <Text style={[styles.subtitle, { color: themes[theme]['c2'] }]}>Start adding the countries you’ve lived in, been to, and finally, want to travel to...</Text>
            </View>
            <View style={styles.flagsCon}>
                <Animated.View style={[styles.flags, { transform: [{ translateX: flagsPosition }] }]}>
                    {doubled.map((country, index) => <Image
                        key={index}
                        source={FlagIcons[country]}
                        style={styles.flag}
                    />)}
                </Animated.View>
            </View>
            <Pressable
                onPress={() => {
                    updateOnboarding(2)
                    updateStage(2)
                }}
            >
                <View style={AppStyles.obBtn}>
                    <Text style={AppStyles.obBtnText}>Get Started</Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        marginBottom: 10,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '300',
        color: '#777',
        textAlign: 'center'
    },
    flagsCon: {
        width: width - 40,
        height: 30,
    },
    flags: {
        position: 'absolute',
        top: 0,
        left: -20,
        width: width,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    flag: {
        width: 34,
        height: 22.1,
        marginRight: 8,
        borderRadius: 3
    },
})