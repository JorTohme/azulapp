import { useState } from "react";
import { StyleSheet, View, Text, StatusBar, Animated, TouchableOpacity } from "react-native";
import SideMenu from "../SideMenu/SideMenu";
import Colors from "../../utils/Colors";


export default function Header({title}) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.blue} />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <Text style={styles.text}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.text}>{title}</Text>
      </View>
      <SideMenu visible={visible} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.blue,
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    zIndex: 10,
  },
  text: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "right",
  }
  
});