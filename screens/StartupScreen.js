import React, { useEffect } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { useDispatch } from "react-redux";

import { ActivityIndicator } from "react-native-paper";

import Colors from "./../constants/colors";
import * as authAction from "../store/actions/auth";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }
      const transformData = JSON.parse(userData);

      const credentials = transformData.credentials;
      const data = transformData.data;
      const validUntil = credentials.valid_until;

      if (validUntil < Math.round(new Date().getTime() / 1000)) {
        props.navigation.navigate("Auth");
        return;
      }
      props.navigation.navigate("Product");
      dispatch(authAction.authenticate(credentials, data));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
