import {View, StyleSheet, Image, Text, ScrollView} from "react-native";
import React from "react";
import {AuthContext} from "../App";
import CapitalizedText from "../components/CapitalizedText";
import { parse } from "@babel/core";

const UserDetails = ({navigation, route}: any) => {
  const { signOut }: any = React.useContext(AuthContext);
  const item = route.params;
  console.log(item.username);

const formatDate = (date : string) => {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hour = d.getHours().toString(),
    minutes = '' + d.getMinutes(),
    seconds = '' + d.getSeconds();

    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;
    if (hour.length < 2) 
      hour = '0' + hour;
    if (minutes.length < 2) 
      minutes = '0' + minutes;
    if (seconds.length < 2) 
      seconds = '0' + seconds;

  return ([day , month, year].join('-') + ', ' + [hour, minutes, seconds].join(':'));
}

  return (
    <ScrollView contentContainerStyle={{alignItems: "center"}}>
      <View style={styles.horizontalSplit}>
        <View style={styles.textWrapper}>
          <CapitalizedText style={styles.textMain}>{item.username}</CapitalizedText>
          <Text style={styles.text}>Prénom : {item.first_name}</Text>
          <Text style={styles.text}>Nom : {item.last_name}</Text>
          <View>
          <Text style={styles.text}>Rôles :</Text>
            {item.roles.map((elm: string) => <Text style={styles.text} key={elm}>{elm}</Text> )}
          </View>
          <Text style={styles.text}>Date de création : {formatDate(item.created_at)}</Text>
          <Text style={styles.text}>Dernière connection : {formatDate(item.last_seen_at)}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const marginElms = 8;

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
  },
  bottle: {
    flex: 1,
    width: '20%',
    height: 200,
    resizeMode: "contain"
  },
  label: {
    flex: 3,
    width: '80%',
    height: 250,
    resizeMode: "contain"
  },
  center: {
    flexDirection: "row",
    alignItems: "center"
  },
  horizontalSplit: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    width: '90%',
    marginTop: '2%'
  },
  text: {
    fontSize: 18,
    marginVertical: marginElms
  },
  textTitle: {
    fontSize: 26,
    marginVertical: marginElms,
    textDecorationLine: "underline"
  },
  textMain: {
    textAlign: "center",
    marginVertical: marginElms,
    fontSize: 40,
    textDecorationLine: "underline"
  },

  textWrapper: {
    width: '100%',
    textAlign: "center",
    alignItems: "center",
    justifyContent: "space-around"
  }
});

export default UserDetails
