import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Button } from "react-native-paper";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native-gesture-handler";
import Colors from "../../constants/colors";
import Card from "../../components/UI/Card";

const CommunityApplicantItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.cardContainer}>
      <View style={styles.screen}>
        <View>
          <Text style={styles.title}>{props.name}</Text>
        </View>
        <View style={styles.status}>
          <View>
            <Text> {props.appliedTime}</Text>
          </View>
        </View>
        <View style={styles.action}>
          <Button
            style={styles.button}
            color={Colors.primary}
            mode="contained"
            onPress={props.onAccept}
          >
            Accept
          </Button>

          <Button
            style={styles.button}
            color={Colors.primary}
            mode="contained"
            onPress={props.onReject}
          >
            Reject
          </Button>
        </View>
      </View>
    </Card>
  );
};

export default CommunityApplicantItem;

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
  action: {
    marginTop: 10,
  },
  cardContainer: {
    width: "95%",
    padding: 20,
    margin: 10,
  },
  button: {
    margin: 3,
  },
});
