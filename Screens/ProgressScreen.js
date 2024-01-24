import { useEffect, useRef, useState } from 'react'
import { FlatList, View, Text, StyleSheet, SafeAreaView, Animated, useWindowDimensions } from 'react-native'
import useStore from '../store'
import AppStyles from '../Styles/AppStyles'
import Countries from '../WorldMap/Countries'
import SVG from '../WorldMap/SVG'

export default () => {
    const { livedCountries, beenCountries, wantCountries } = useStore()
    const [oneColorIndex, setOneColorIndex] = useState(0)
    const [oneColors] = useState(['been', 'lived', 'want'])
    const [cards, setCards] = useState([])
    const scrollX = useRef(new Animated.Value(0)).current
    
    const { width } = useWindowDimensions()
    const SVG_RATIO = (1009.6727 / 689.96301)

    useEffect(() => {
        let arr = [
            { title: 'Countries', total: 0, visited: 0, description: 'A passport full of stamps'  },
            { title: 'Continents', total: 7, visited: 0, description: 'Explore all 7 continents' },
            { title: 'Africa', total: 0, visited: 0, description: 'Rich wildlife and safari adventures' },
            { title: 'Asia', total: 0, visited: 0, description: 'Ancient history and modern technology' },
            { title: 'Europe', total: 0, visited: 0, description: 'Historic architecture and art treasures' },
            { title: 'North America', total: 0, visited: 0, description: 'Bustling cities and natural wonders' },
            { title: 'South America', total: 0, visited: 0, description: 'Rich history of ancient civilizations' },
            { title: 'Oceania', total: 0, visited: 0, description: 'Stunning coral reefs and island paradises' },
            { title: 'Antarctica', total: 0, visited: 0, description: 'Scientific research and exploration' }
        ]
        
        let continents = []
        arr[0].total = Countries.length

        // add the data for continent cards
        for(let i = 0; i < Countries.length; i++){
            if(livedCountries.includes(Countries[i].id) || beenCountries.includes(Countries[i].id)){
                arr[0].visited++

                if(!continents.includes(Countries[i].continent)){
                    continents.push(Countries[i].continent)
                    arr[1].visited++
                }
            }

            for(let j = 0; j < arr.length; j++){
                if(Countries[i].continent === arr[j].title){
                    arr[j].total ++
                    if(livedCountries.includes(Countries[i].id) || beenCountries.includes(Countries[i].id)){
                        arr[j].visited++
                    }
                }
            }
        }
        
        setCards(arr)
    }, [livedCountries, beenCountries])

    return (
        <View style={AppStyles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={AppStyles.header}>
                    <View style={AppStyles.headerTop}>
                        <Text style={AppStyles.headerTitle}>Progress</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    <FlatList
                        data={cards}
                        keyExtractor={item => item.title}
                        ListHeaderComponent={() => (
                            <View>
                                <FlatList
                                    data={oneColors}
                                    renderItem={({ item }) => (
                                        <SVG
                                            width={width - 20}
                                            height={(width - 20) / SVG_RATIO}
                                            lived={livedCountries}
                                            been={beenCountries}
                                            want={wantCountries}
                                            oneColor={item}
                                            openModal={() => null}
                                        />
                                    )}
                                    horizontal
                                    showsHorizontalScrollIndicator
                                    pagingEnabled
                                    bounces={false}
                                    keyExtractor={item => item}
                                    onScroll={Animated.event(
                                        [ { nativeEvent: { contentOffset: { x: scrollX } } } ],
                                        { useNativeDriver: false }
                                    )}
                                    scrollEventThrottle={32}
                                />
                            </View>
                        )}
                        renderItem={({ item }) => (
                            <View style={styles.box}>
                                <View style={styles.start}>
                                    <Text style={styles.title}>{item.title}</Text>
                                </View>
                                <View style={styles.center}>
                                    <Text style={styles.value}>{item.visited}</Text>
                                    <Text style={[styles.value, { marginHorizontal: 10, fontSize: 36 }]}>/</Text>
                                    <Text style={styles.value}>{item.total}</Text>
                                </View>
                                <View style={styles.center}>
                                    <Text style={styles.text}>{item.description}</Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    box: {
        flexDirection: 'column',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 15,
        marginHorizontal: 10
    },
    start: {
        alignItems: 'flex-start',
    },
    center: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    value: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#e63946'
    },
    text: {
        fontSize: 15,
        fontWeight: '500',
        color: '#8d99ae'
    }
})