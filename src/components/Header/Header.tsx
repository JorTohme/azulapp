import { StyleSheet, View, Text, StatusBar } from "react-native";
import Colors from "../../utils/Colors";

export default function Header(props) {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.blue} />
      <View style={styles.container}>
        <Text style={styles.text}>{props.title}</Text>
      </View>
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