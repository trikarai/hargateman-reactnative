import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CommunityThreadCommentsScreen = (props) => {
  return (
    <View>
      <Text>Thread Comments</Text>
    </View>
  );
};

export default CommunityThreadCommentsScreen;
CommunityThreadCommentsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Thread Comments",
  };
};
const styles = StyleSheet.create({});
