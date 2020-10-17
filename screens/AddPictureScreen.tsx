import {View, StyleSheet } from "react-native";
import React from "react";
import {AuthContext} from "../App";

const AddPicture = ({navigation}: any) => {
  const { signOut }: any = React.useContext(AuthContext);

  return (
    <View>

    </View>
  );
}

const styles = StyleSheet.create({
});

export default AddPicture
