import React, { useState } from 'react'
import { Image } from 'expo-image'
import { View, FlatList, TextInput, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Pressable, ScrollView, LayoutAnimation, UIManager } from 'react-native'
import AppStyles from '../Styles/AppStyles'
import FlagIcons from '../assets/FlagIcons'
import { Entypo } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import Countries from '../WorldMap/Countries'
import CountryModal from '../Components/CountryModal'
import ExploreData from '../assets/ExploreData'
import useStore from '../store'

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default () => {
    const { themes, theme, livedCountries, beenCountries, wantCountries } = useStore()
    const [contentTransitioning, setContentTransitioning] = useState(false)
    const [search, setSearch] = useState('')
    const [displayStyle, setDisplayStyle] = useState('grid') // options include 'grid' and 'list'
    const [data, setData] = useState(Countries)
    const [gridData, setGridData] = useState(ExploreData)
    const [modalVisible, setModalVisible] = useState(false) // country code for the modal popup
    const [modalData, setModalData] = useState({ id: '', title: '' }) // object to hold modal id and title
    const [rerender, setRerender] = useState(0)

    // filter the data based on the user's search, value is the current value of search and change is used when the user changes their content display type and we need to refilter the data
    const handleSearch = (value, change) => {
        setSearch(value)

        const lower_value = value.toLowerCase().trim()
        if((displayStyle === 'grid' && !change) || (displayStyle === 'list' && change)){
            let arr = [...ExploreData].map(x => {
                return {
                    continent: x.continent,
                    countries: x.countries.filter(y => y.title.toLowerCase().includes(lower_value) || y.id.includes(lower_value))
                }
            })
            
            setGridData(arr.filter(x => x.countries.length > 0))
            setRerender(prev => prev + 1) // used to force the gridData to re-render as it will sometimes fail due to the data being embedded
        } else {
            let arr = [...Countries].filter(item => {
                return item.title.toLowerCase().includes(lower_value) || item.id.includes(lower_value)
            })

            setData(arr)
            setRerender(prev => prev + 1) // used to force the gridData to re-render as it will sometimes fail due to the data being embedded
        }
    }

    const openModal = (id, title) => {
        setModalVisible(true)
        setModalData({ id: id.toLowerCase(), title })
    }

    const toggleContent = async () => {
        await handleSearch(search, true)

        // Enable LayoutAnimation
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    
        setDisplayStyle(prevStyle => prevStyle === 'grid' ? 'list' : 'grid')
        setTimeout(() => setContentTransitioning(false), 200)
    }

    return (
        <View style={[AppStyles.container, { backgroundColor: themes[theme]['bg1'] }]}>
            <CountryModal
                visible={modalVisible}
                id={modalData.id}
                title={modalData.title}
                handleClose={() => {
                    setModalVisible(false)
                    setModalData({ id: '', title: '' })
                }}
            />

            <SafeAreaView style={{ flex: 1 }}>
                <View style={AppStyles.header}>
                    <View style={AppStyles.headerTop}>
                        <Text style={[AppStyles.headerTitle, { color: themes[theme]['c1'] }]}>Explore</Text>
                        <Pressable onPress={() => {
                            if(!contentTransitioning){
                                setContentTransitioning(true)
                                toggleContent()
                            }
                        }}>
                            {displayStyle === 'grid' ?
                            <Ionicons name='grid-outline' size={22} color={themes[theme]['c1']} /> :
                            <Ionicons name='list' size={22} color={themes[theme]['c1']} />}
                        </Pressable>
                    </View>
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
                <KeyboardAvoidingView behavior='padding' style={styles.countries}>
                    {displayStyle === 'list' ?
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => openModal(item.id, item.title)}>
                                <View key={item.id} style={styles.country}>
                                    <View style={styles.info}>
                                        <Image
                                            source={FlagIcons[item.id.toLowerCase()]}
                                            cachePolicy='memory'
                                            style={styles.flag}
                                        />
                                        <Text style={[styles.title, { color: themes[theme]['c1'] }]}>{item.title}</Text>
                                    </View>
                                    <View>
                                        <Entypo name='chevron-right' size={20} color='#adb5bd' />
                                    </View>
                                </View>
                            </Pressable>
                        )}
                        keyExtractor={item => item.id}
                        style={{flex: 1}}
                        showsVerticalScrollIndicator={false}
                    />
                    : 
                    <ScrollView style={styles.gridCon}>
                        {gridData.map(grid_item => {
                            if(grid_item.countries.length < 1) return null
                            
                            return (
                                <View key={grid_item.continent} style={styles.gridRow}>
                                    <View style={styles.gridTitleCon}>
                                        <Text style={[styles.gridTitle, { color: themes[theme]['c1'] }]}>{grid_item.continent}</Text>
                                    </View>
                                    <FlatList
                                        data={grid_item.countries}
                                        keyExtractor={item => `${rerender + grid_item.continent + item.id}`}
                                        renderItem={({ item }) => {
                                            let fill = null
                                            livedCountries.includes(item.id) ? fill = '#52b788' : 
                                            beenCountries.includes(item.id) ? fill = '#e63946' : 
                                            wantCountries.includes(item.id) ? fill = '#ff8c61' : null
                                            
                                            return (
                                            <Pressable onPress={() => openModal(item.id, item.title)} style={styles.gridCard}>
                                                <View>
                                                    <View style={styles.gridImageCon}>
                                                        <Image
                                                            source={{uri: 'https://media-cdn.tripadvisor.com/media/photo-s/19/e0/73/43/los-angeles-is-beautiful.jpg'}}
                                                            cachePolicy='memory'
                                                            style={styles.gridImage}
                                                        />
                                                    </View>
                                                    <View style={styles.gridImageDetails}>
                                                        <Text style={[styles.gridText, { color: themes[theme]['c2'] }]} numberOfLines={1}>{item.title}</Text>
                                                        {fill && 
                                                        <View style={[styles.gridDot, { backgroundColor: fill }]}></View>}
                                                    </View>
                                                </View>
                                            </Pressable>
                                        )}}
                                        initialNumToRender={5}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={{ paddingRight: 15 }}
                                        style={{paddingHorizontal: 15, flex: 1}}
                                    />
                                </View>
                            )
                        })}
                    </ScrollView>}
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
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
        flex: 1,
        flexDirection: 'column'
    },
    country: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 16,
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
    title: {
        fontSize: 16,
        fontWeight: '600',
        margin: 0,
        color: '#333'
    },
    gridRow: {
        paddingVertical: 10
    },
    gridTitleCon: {
        paddingHorizontal: 15
    },
    gridTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 5
    },
    gridCard: {
        width: 140,
        marginRight: 10,
    },
    gridImage: {
        width: 140,
        height: 180,
        borderRadius: 15
    },
    gridImageDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        paddingHorizontal: 5
    },
    gridText: {
        fontSize: 14,
        fontWeight: '400',
        margin: 0,
        marginRight: 10,
        width: 112,
        overflow: 'hidden'
    },
    gridDot: {
        width: 8,
        height: 8,
        borderRadius: 4
    }
})