import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  Text,
  Image,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ImageBackground,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Button } from "react-native-paper";

import Input from "../../components/UI/Input";
import Colors from "../../constants/colors";

import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";
import { BorderlessButton } from "react-native-gesture-handler";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occured", error, [{ text: "OK" }]);
    }
  }, [error]);

  const loginHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(
        authActions.login(
          formState.inputValues.email,
          formState.inputValues.password
        )
      );
      props.navigation.navigate("Product");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={1}
      style={styles.screen}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require("../../assets/Background_1.png")}
          resizeMode="cover"
          style={styles.background}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/logo-b.png")}
              style={styles.logo}
            />
          </View>

          <View style={styles.authContainer}>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
              mode="outlined"
              returnKeyType="next"
            />
            <Input
              ref={(input) => {}}
              style={styles.topInput}
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
              mode="outlined"
            />
            <View style={styles.forgotPassword}>
              <Text style={styles.label}>Forgot your password?</Text>
            </View>
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
              ) : (
                <Button
                  style={{
                    height: 50,
                    justifyContent: "center",
                  }}
                  mode="contained"
                  color={Colors.primary}
                  onPress={loginHandler}
                >
                  login
                </Button>
              )}
            </View>
            {!isLoading ? (
              <View style={styles.row}>
                <Text style={styles.label}>Don’t have an account? </Text>
                <Button
                  style={styles.signap}
                  color={Colors.primary}
                  mode="text"
                  onPress={() => {
                    props.navigation.navigate("Signup");
                  }}
                >
                  Sign Up
                </Button>
              </View>
            ) : (
              <View></View>
            )}
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  header: () => null,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    // maxWidth: 400,
    // maxHeight: 400,
    flex: 1,
    paddingLeft: 35,
    paddingRight: 35,
    // marginTop: 100,
  },
  buttonContainer: {
    marginTop: 10,
  },
  topInput: {
    marginTop: 20,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  label: {
    color: "#6d6d6d",
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
    marginLeft: "20%",
  },
  signap: {
    marginTop: 2,
  },
  logo: {
    width: 192,
    height: 90,
    marginBottom: 45,
    marginTop: 80,
  },
  background: {
    flex: 1,
    width: "100%",
  },
});

export default AuthScreen;
