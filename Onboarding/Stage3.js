import { useState } from 'react'
import { StyleSheet, View, Text, Pressable, TextInput, Dimensions, FlatList } from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { Image } from 'expo-image'
import FlagIcons from '../assets/FlagIcons.js'
import Countries from '../WorldMap/Countries.js'
import useStore from '../store.js'
import AppStyles from '../Styles/AppStyles.js'

const { width, height } = Dimensions.get('window')

export default ({ themes, theme, updateStage }) => {
    const { updateOnboarding, livedCountries, beenCountries, addBeen, removeBeen } = useStore()
    const [search, setSearch] = useState('')
    const [data, setData] = useState(Countries)

    const handleSearch = value => {
        setSearch(value)

        if(value !== ''){
            const lower_value = value.toLowerCase().trim()
            let arr = [...Countries].filter(item => {
                return item.title.toLowerCase().includes(lower_value) || item.id.includes(lower_value)
            })

            setData(arr)
        } else {
            setData([...Countries])
        }
    }

    const handleBeen = async id => {
        if(livedCountries.includes(id)) return 

        if(beenCountries.includes(id)){
            removeBeen(id)
        } else {
            addBeen(id)
        }
    }

    return (
        <View style={AppStyles.obCon}>
            <View>
                <Text style={[styles.title, { color: themes[theme]['c1'] }]}>Been</Text>
                <Text style={[styles.subtitle, { color: themes[theme]['c2'] }]}>Add the countries you've been to...</Text>
                
                <View>
                    <TextInput
                        value={search}
                        onChangeText={value => handleSearch(value)}
                        placeholder='Search...'
                        placeholderTextColor={themes[theme]['c3']}
                        autoCorrect={false}
                        style={[styles.searchInput, { backgroundColor: themes[theme]['bg3'] }]}
                    />
                    <View style={styles.searchIconCon}>
                        <Ionicons name='search' size={16} color={themes[theme]['c3']} style={styles.searchIcon} />
                    </View>
                    {search !== '' &&
                    <Pressable
                        onPress={() => {
                            setSearch('')
                            handleSearch('')
                        }}
                        style={[styles.searchIconCon, { right: 11, left: null }]}
                    >
                        <Ionicons name='close' size={16} color={themes[theme]['c3']} style={styles.searchIcon} />
                    </Pressable>}
                </View>
            </View>

            <View style={styles.countries}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <Pressable>
                            <View style={styles.country}>
                                <View style={styles.info}>
                                    <Image
                                        source={FlagIcons[item.id.toLowerCase()]}
                                        cachePolicy='memory'
                                        style={styles.flag}
                                    />
                                    <Text style={[styles.text, { color: themes[theme]['c1'] }]}>{item.title}</Text>
                                </View>
                                <Pressable onPress={() => handleBeen(item.id)}>
                                    {livedCountries.includes(item.id) ?
                                    <Entypo name='check' size={20} color={'#52b788'} /> :
                                    beenCountries.includes(item.id) ?
                                    <Entypo name='check' size={20} color={'#e63946'} /> :
                                    <Entypo name='plus' size={20} color={themes[theme]['c2']} />}
                                </Pressable>
                            </View>
                        </Pressable>
                    )}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <Pressable
                onPress={() => {
                    updateOnboarding(4)
                    updateStage(4)
                }}
            >
                <View style={AppStyles.obBtn}>
                    <Text style={AppStyles.obBtnText}>Continue</Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 5,
        color: '#e63946'
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '400',
        marginBottom: 10,
        color: '#777'
    },
    searchInput: {
        fontSize: 16,
        height: 38,
        paddingLeft: 30,
        borderRadius: 15,
        backgroundColor: '#DEE2E6',
        color: '#000'
    },
    searchIconCon: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 11,
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchIcon: {
        height: 16,
        width: 16,
        marginBottom: 1
    },
    countries: {
        width: width - 40,
        height: height - 330,
    },
    country: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 15,
        height: 40
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    flag: {
        width: 24,
        height: 16.2,
        marginRight: 8,
        borderRadius: 2
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        margin: 0,
        color: '#333'
    },
})