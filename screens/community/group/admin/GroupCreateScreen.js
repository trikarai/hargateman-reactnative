import React from "react";
import { View, Text, StyleSheet } from "react-native";

const GroupCreateScreen = () => {
  return (
    <View>
      <Text> create group screen</Text>
    </View>
  );
};

export default GroupCreateScreen;

GroupScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Create Group for Community",
  };
};

const styles = StyleSheet.create({});
