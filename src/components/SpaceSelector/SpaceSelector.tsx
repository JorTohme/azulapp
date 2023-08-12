import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView } from "react-native";
import Colors from "../../utils/Colors";
import Icons from "../../utils/Icons";

export default function SpaceSelector({ data, setSelectedSpace }) {
  const { width, height } = Dimensions.get("window");

  return (
    <ScrollView horizontal style={s.spaceSelector} contentContainerStyle={s.selectContainer} >
      {
        data.map((item, index) => (
          <TouchableOpacity style={s.selector} key={index}
          onPress={() => setSelectedSpace(item.id)}
          >
            <Text style={s.text}>{item.name}</Text>
          </TouchableOpacity>
        ))
      }
  </ScrollView>
  );
}

const s = StyleSheet.create({
  spaceSelector: {
    height: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightGray,
  },
  selectContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  selector: {
    width: 90,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: Colors.acent,
  },
  text: {
    color: Colors.white,
  },
})