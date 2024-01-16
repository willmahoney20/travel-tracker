import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, useWindowDimensions } from 'react-native'
import useStore from '../store'
import AppStyles from '../Styles/AppStyles'
import Countries from '../WorldMap/Countries'
import SVG from '../WorldMap/SVG'

export default () => {
    const livedCountries = useStore(state => state.livedCountries)
    const beenCountries = useStore(state => state.beenCountries)
    const wantCountries = useStore(state => state.wantCountries)
    const [oneColor, setOneColor] = useState('been')
    const [cards, setCards] = useState([])
    
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
                <ScrollView>
                    <View style={styles.mapCon}>
                        <View style={styles.mapTitleCon}>
                            <Text
                                style={[
                                    styles.mapTitle,
                                    { color: oneColor === 'iived' ? '#52b788' : oneColor === 'been' ? '#e63946' : oneColor === 'want' ? '#ff8c61' : '#000' }
                                ]}
                            >
                                {oneColor}
                            </Text>
                        </View>
                        <View style={styles.svgCon}>
                            <SVG
                                width={width - 20}
                                height={(width - 20) / SVG_RATIO}
                                lived={livedCountries}
                                been={beenCountries}
                                want={wantCountries}
                                oneColor={oneColor}
                                openModal={false}
                            />
                        </View>
                    </View>

                    <View style={styles.progressCon}>
                        {cards.map(({ title, total, visited, description }) => (
                            <View style={styles.box} key={title}>
                                <View style={styles.start}>
                                    <Text style={styles.title}>{title}</Text>
                                </View>
                                <View style={styles.center}>
                                    <Text style={styles.value}>{visited}</Text>
                                    <Text style={[styles.value, { marginHorizontal: 10, fontSize: 36 }]}>/</Text>
                                    <Text style={styles.value}>{total}</Text>
                                </View>
                                <View style={styles.center}>
                                    <Text style={styles.text}>{description}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    mapCon: {
        paddingTop: 20,
        paddingHorizontal: 10
    },
    mapTitleCon: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        borderBottomColor: '#ced4da',
        borderBottomWidth: 1
    },
    mapTitle: {
        fontSize: 50,
        fontWeight: 100
    },
    progressCon: {
        flexDirection: 'column',
        padding: 20,
        paddingTop: 10
    },
    box: {
        flexDirection: 'column',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 10
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
        fontWeight: 500,
        color: '#8d99ae'
    }
})