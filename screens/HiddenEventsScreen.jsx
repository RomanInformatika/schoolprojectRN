import { StyleSheet, FlatList, ActivityIndicator, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

// import { Text,} from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useSelector } from 'react-redux';
import { ISOdateParse, filterAll, FormatParallel, FormatClass,DataClean } from '../utils'
import { ClassSwitch } from '../components/classwitch'
import { FilterBar } from '../components/filterBar'
import { Event } from '../components/Event'

import Notification, { schedulePushNotification } from '../notification'


export default function HiddenEventsScreen({ navigation }) {
  const result = useSelector((state) => state.userdata.items)
  const HiddenItems=useSelector(state=>state.userdata.hiddenItems)
  let [response, setResponse] = useState();
  const refreshItems = useSelector((state) => state.filter.refreshItems)

  useEffect(() => {
    const b={"className": "", "myClassToggle": false, "parallels": {"1": true, "10": true, "11": true, "2": true, "3": true, "4": true, "5": true, "6": true, "7": true, "8": true, "9": true}, "refreshItems": true, "value": "Все"}
    setResponse(filterAll(result, b, 'Учитель',HiddenItems,true));

  }, [refreshItems]);



  return (

    <View style={styles.container}>
      <View style={styles.events}>
        <FlatList
          data={response?.value}
          renderItem={(item) => <Event navigation={navigation} item={item} />}
          keyExtractor={(item) => item.ID}
          vertical
          refreshing={true}
        />


      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
    flexDirection: "column",

  },
  events: {

    backgroundColor: '#659DBD',
    justifyContent: "flex-start"
  },

  box: {
    backgroundColor: '#9fdafc',
    borderRadius: 10,
    margin: 5,
    padding: 5,
    borderLeftColor: '#FBEEC1',
    borderLeftWidth: 5,
    borderRightColor: '#FBEEC1',
    borderRightWidth: 5,

  },

  filter: {
    backgroundColor: '#c4eaff',
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
    borderBottomColor: '#fad8bb',
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
    borderLeftColor: '#FBEEC1',
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
    borderLeftColor: '#f2bf57',
    borderLeftWidth: 3,
    borderRadius: 20,
    borderBottomColor: '#f2bf57',
    borderBottomWidth: 3,
    borderRightColor: '#f2bf57',
    borderRightWidth: 3,
    borderTopColor: '#f2bf57',
    borderTopWidth: 3,
    backgroundColor: '#FBEEC1'

  }
});