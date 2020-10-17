import {View, StyleSheet, Text, ScrollView, Button} from "react-native";
import React from "react";
import {AuthContext} from "../App";
import CapitalizedText from "../components/CapitalizedText";

const UserEditScreen = ({navigation, route}: any) => {
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
        
    </View>
  </ScrollView>
  )
}

const marginElms = 8;

const styles = StyleSheet.create({

});

export default UserEditScreen