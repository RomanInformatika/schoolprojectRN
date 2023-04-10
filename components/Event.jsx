import React, { useEffect } from 'react'
import { Period, filterAll, FormatParallel, FormatClass, getSecOffset, RightNow } from '../utils'
import { StyleSheet, FlatList, ActivityIndicator, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { sethiddenitems } from '../redux/userdataSlice';
import { setrefreshItems } from '../redux/filterSlice';

// import {Navi}
import { schedulePushNotification } from '../notification'
import * as Notifications from "expo-notifications";



export const Event = ({ item, navigation }) => {
    const det = item.item.Description2 != null ? '->' : ''
    const notificationOffset = 15

    useEffect(() => {
        const LR = async (fullDate) => {
            await schedulePushNotification(fullDate, item.item.Title);
        }

        if (item.item.fullDate != 'null') {
            const shdate = new Date(item.item.fullDate)
            if (shdate > RightNow) {
                shdate.setTime(shdate.getTime() - 180 * 60 * 1000 - notificationOffset * 60 * 1000)
                LR(shdate)
            }
        }




    }
        , [])

    
    const HideItemsD=useDispatch()
    const RefreshItemsD = useDispatch()

    const HideItem=()=>{
        console.log(item.item.Id)
        HideItemsD(sethiddenitems(item.item.Id))
        RefreshItemsD(setrefreshItems())
        // alert(item.item.Id)
    }

    const RemoveAlert = () => {
        Alert.alert('Предупреждение', 'Скрыть?',
        [
            {
                text: "Да",
                onPress: HideItem,
            }, {
                text: "Нет",
                onPress: () => {},
            }
        ], { cancelable: true, })
    }

    return (<View style={!item.item.Visibility.includes('Учащиеся') ? { ...styles.box, backgroundColor: '#8397fb' } : { ...styles.box }}>
        <View>
            <View>

                <FontAwesome name="eye-slash" size={24} color="black" onPress={RemoveAlert} />

            </View>
            <View>
                <View style={styles.data1}>
                    <Text style={styles.data}> {item.item.Time} {Period(item.item.DateStart, item.item.DateEnd)}</Text>
                </View>
                <View style={styles.where1}>
                    <Text style={styles.where}>{item.item.Address}</Text>
                </View>
            </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Details', item.item.Description2)}>
            <View style={styles.what1}><Text style={styles.what}>{det + item.item.Title}</Text></View>
        </TouchableOpacity>
        <View style={styles.line}>
            <View style={styles.who2}><Text style={styles.parallel}>{FormatParallel(item.item.Parallel)}</Text></View>
            <View style={styles.who3}><Text style={styles.class}>{FormatClass(item.item.Class)}</Text></View>
        </View>
        <View style={styles.who1}>
            <View style={styles.borderline}>
                <Text style={styles.who}>{item.item.MainMan.Title}</Text>
            </View>
        </View>

    </View>)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",

    },
    events: {

        backgroundColor: '#0A4563',
        justifyContent: "flex-start"
    },

    box: {
        backgroundColor: '#bee8ff',
        borderRadius: 10,
        margin: 10,
        padding: 5,
        borderLeftColor: '#ffffff',
        borderLeftWidth: 5,
        borderRightColor: '#ffffff',
        borderRightWidth: 5,


    },

    filter: {
        backgroundColor: '#bee8ff',
    },


    filterbtn: {
        borderRadius: 5,
        backgroundColor: '#787878',
        margin: 5,
        padding: 5
    },


    what: {
        fontSize: 18,
    },
    where: {
        fontSize: 14,
        fontStyle: 'italic',
        marginRight: 5,
    },
    who: {
        fontSize: 15,
        fontStyle: 'italic',
        marginRight: 5,
        marginLeft: 5,
    },
    data: {
        fontSize: 13,
        fontStyle: 'italic',
        marginRight: 5,

    },
    what1: {
        flex: 1,
        alignItems: 'flex-start',
        // marginTop: 10,
        fontWeight: 'bold',
        borderBottomColor: '#0A4563',
        borderBottomWidth: 3,
        borderRadius: 10,
        borderStyle: 'dotted',
    },
    where1: {
        flex: 1,
        alignItems: 'flex-end',
        marginTop: 5,
    },
    who1: {
        flex: 1,
        alignItems: 'flex-end',
        marginTop: 5,

    },
    data1: {
        flex: 1,
        alignItems: 'flex-end',
        marginTop: 5,
    },
    filter1: {
        backgroundColor: '#B5B8B1'
    },
    two: {
        flexDirection: "row",
    },
    line: {
        borderLeftColor: '#ffffff',
        borderLeftWidth: 3,
        borderStyle: 'solid',
        marginLeft: 15,
        borderRadius: 10,
        marginTop: 7,
    },
    who2: {
        marginLeft: 5,
        fontSize: 7,
    },
    who3: {
        marginLeft: 5,
        fontSize: 7,
    },
    parallel: {
        fontSize: 14,
    },
    class: {
        fontSize: 14,
    },
    borderline: {
        borderLeftColor: '#0A4563',
        borderLeftWidth: 3,
        borderRadius: 20,
        borderBottomColor: '#0A4563',
        borderBottomWidth: 3,
        borderRightColor: '#0A4563',
        borderRightWidth: 3,
        borderTopColor: '#0A4563',
        borderTopWidth: 3,
        backgroundColor: '#ffffff'

    }
});