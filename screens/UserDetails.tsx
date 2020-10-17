import {View, StyleSheet, Image, Text, ScrollView} from "react-native";
import React from "react";
import {AuthContext} from "../App";
import CapitalizedText from "../components/CapitalizedText";
import { parse } from "@babel/core";

const UserDetails = ({navigation, route}: any) => {
  const { signOut }: any = React.useContext(AuthContext);
  const item = route.params;

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
      <View style={styles.mainWrapper}> 
          <CapitalizedText style={styles.textMain}>{item.username}</CapitalizedText>
          <View style={styles.separator}></View>
          <View style={styles.textWrapper}>  
            <View style={styles.horizontalSplit}>
              <View style={styles.horizontalColumn}>
                <Text style={styles.text}>Prénom :</Text>
                <Text style={styles.text}>Nom :</Text>
              </View>
              <View style={styles.horizontalColumn}>
                <Text style={styles.text}>{item.first_name}</Text>
                <Text style={styles.text}>{item.last_name}</Text>
              </View>
            </View>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.textWrapper}>
            <View style={styles.horizontalSplit}>
              <View style={styles.horizontalColumnRoles}>
                <Text style={styles.text}>Rôle(s) :</Text>
              </View>
              <View style={styles.horizontalColumn}>
                {item.roles.map((elm: string) => <Text style={styles.text} key={elm}>{"▷ " + elm}</Text> )}
              </View>
            </View>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.textWrapper}>
            <View style={styles.horizontalSplit}>
              <View style={styles.horizontalColumn}>
                <Text style={styles.text}>Créé le :</Text>
                <Text style={styles.text}>Connecté le :</Text>
              </View>
              <View style={styles.horizontalColumn}>
                <Text style={styles.text}>{formatDate(item.created_at)}</Text>
                <Text style={styles.text}>{formatDate(item.last_seen_at)}</Text>
              </View>
            </View>
          </View>
        </View>
    </ScrollView>
  )
}

const marginElms = 8;

const styles = StyleSheet.create({
  horizontalColumnRoles: {
    width: "40%",
    flex:1,
  },
  horizontalColumn: {
    width: "40%",
    flex:1,
    justifyContent: "space-evenly",
  },
  separator: {
    height: 1,
    alignItems: "center",
    justifyContent: "center",
    width: '71%',
    backgroundColor: '#CED0CE',
    marginLeft: "10%",
    marginTop: 13,
    marginBottom: 5,
  },
  roleswrapper: {
    flex:1,
    flexDirection:"row",
  },

  center: {
    flexDirection: "row",
  },
  horizontalSplit: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: '80%',
    marginTop: '2%',
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
    textDecorationLine: "underline",
    marginLeft: -20,
  },
  textWrapper: {
    marginLeft: "10%",
  },
  mainWrapper: {
    width: '95%',
    maxWidth: 600,
    marginLeft: "7%",
    textAlign: "center",
    justifyContent: "space-around"
  }
});

export default UserDetails
