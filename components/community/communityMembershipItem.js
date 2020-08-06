import React from "react";
import { View, Text, StyleSheet, Button, Platform } from "react-native";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native-gesture-handler";
import Colors from "../../constants/colors";
import Card from "../../components/UI/Card";

const CommunityItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.cardContainer}>
      <View style={styles.screen}>
        {/* <TouchableCmp onPress={props.onViewDetail} useForegroud> */}
        <View>
          <Text style={styles.title}>{props.name}</Text>
        </View>
        <View>
          {props.active ? <Text>Active</Text>: <Text>Not Active</Text>}
        </View>
        <View>
          {props.admin ? <Text>Admin</Text>: <Text>Not Admin</Text>}
        </View>
        <View style={styles.action}>
          <Button
            color={Colors.primary}
            title="View Detail"
            onPress={props.onLeave}
          />
        </View>
        {/* </TouchableCmp> */}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    marginVertical: 4,
  },
  action: {},
  cardContainer: {
    width: "95%",
    padding: 20,
    margin: 10,
  },
});

export default CommunityItem;
