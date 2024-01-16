import React, { useState } from 'react'
import { View, FlatList, TextInput, Text, Image, StyleSheet, SafeAreaView, KeyboardAvoidingView, Pressable } from 'react-native'
import AppStyles from '../Styles/AppStyles'
import FlagIcons from '../assets/FlagIcons'
import { Entypo } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import Countries from '../WorldMap/Countries'
import CountryModal from '../Components/CountryModal'

export default () => {
    const [search, setSearch] = useState('')
    const [data, setData] = useState(Countries)
    const [modalVisible, setModalVisible] = useState(false) // country code for the modal popup
    const [modalData, setModalData] = useState({ id: '', title: '' }) // object to hold modal id and title

    const handleSearch = value => {
        setSearch(value)

        const lower_value = value.toLowerCase()
        let arr = [...Countries].filter(item => {
            return item.title.toLowerCase().includes(lower_value) || item.id.includes(lower_value)
        })
        setData(arr)
    }

    const openModal = (id, title) => {
        setModalVisible(true)
        setModalData({ id: id.toLowerCase(), title })
    }

    return (
        <View style={AppStyles.container}>
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
                    <View style={styles.searchCon}>
                        <TextInput
                            value={search}
                            onChangeText={value => handleSearch(value)}
                            placeholder='Search...'
                            style={styles.searchInput}
                        />
                        <Ionicons name='search' size={16} color='#adb5bd' style={styles.searchIcon} />
                    </View>
                </View>
                <KeyboardAvoidingView behavior='padding' style={styles.countries}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => openModal(item.id, item.title)}>
                                <View key={item.id} style={styles.country}>
                                    <View style={styles.info}>
                                        <Image source={FlagIcons[item.id.toLowerCase()]} style={styles.flag} />
                                        <Text style={styles.title}>{item.title}</Text>
                                    </View>
                                    <View>
                                        <Entypo name='chevron-small-right' size={20} color='#adb5bd' />
                                    </View>
                                </View>
                            </Pressable>
                        )}
                        keyExtractor={item => item.id}
                    />
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    searchCon: {
        flex: 1
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        height: 45,
        paddingLeft: 30,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#ced4da',
        backgroundColor: '#e9ecef',
        color: '#000'
    },
    searchIcon: {
        position: 'absolute',
        top: 9,
        left: 11
    },
    countries: {
        flex: 1,
        flexDirection: 'column'
    },
    country: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
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
        fontWeight: 600,
        margin: 0,
        color: '#333'
    }
})