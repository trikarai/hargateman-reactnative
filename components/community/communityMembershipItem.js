import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Button } from "react-native-paper";
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
        <View style={styles.status}>
          <View>
            {props.active ? <Text>Active</Text> : <Text>Not Active</Text>}
          </View>
          <View>
            {props.admin ? <Text>Admin</Text> : <Text>Not Admin</Text>}
          </View>
        </View>
        <View style={styles.action}>
          {props.active ? (
            <View>
              <Button
                style={styles.button}
                color={Colors.primary}
                mode="contained"
                onPress={props.onLeave}
              >
                Detail
              </Button>
              <Button
                style={styles.button}
                color={Colors.primary}
                mode="contained"
                onPress={props.onThread}
              >
                Thread
              </Button>
            </View>
          ) : (
            <View></View>
          )}
          {props.admin && props.active ? (
            <View>
              <Button
                style={styles.button}
                color={Colors.primary}
                mode="contained"
                onPress={props.onManage}
              >
                Manage
              </Button>
            </View>
          ) : (
            <View></View>
          )}
        </View>
        {/* </TouchableCmp> */}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  status: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
    marginVertical: 4,
  },
  action: { flex: 1, flexDirection: "row", marginTop: 10 },
  cardContainer: {
    width: "95%",
    padding: 20,
    margin: 10,
  },
  button: {
    margin: 3,
  },
});

export default CommunityItem;
