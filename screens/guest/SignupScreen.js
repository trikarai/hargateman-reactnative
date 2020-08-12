import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

import { Button } from "react-native-paper";

import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Colors from "../../constants/colors";

import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";

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

const SignupScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
    },
    inputValidities: {
      email: false,
      password: false,
      firtsName: false,
      lastName: false,
      phone: false,
    },
    formIsValid: false,
  });
  const signupHandler = async () => {
    try {
      await dispatch(
        authActions.signup(
          formState.inputValues.firstName,
          formState.inputValues.lastName,
          formState.inputValues.phone,
          formState.inputValues.email,
          formState.inputValues.password
        )
      );
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

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occured", error, [{ text: "OK" }]);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      {/* <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}> */}
        {/* <Card style={styles.authContainer}> */}
          <ScrollView  style={styles.authContainer}>
          <Image
              source={require("../../assets/signup.png")}
              style={styles.logo}
            />
            <Input
              id="firstName"
              label="First Name"
              errorText="Please Insert First Name"
              keyboardType="default"
              onInputChange={inputChangeHandler}
              initialValue=""
              required
              dense
            />
            <Input
              style={{
                marginTop:15,
              }}
              id="lastName"
              label="Last Name"
              errorText="Please Insert Last Name"
              keyboardType="default"
              onInputChange={inputChangeHandler}
              initialValue=""
              required
              dense
            />
            <Input
              style={{
                marginTop:15,
              }}
              id="phone"
              label="Phone"
              errorText="Please Phone Number"
              keyboardType="phone-pad"
              onInputChange={inputChangeHandler}
              initialValue=""
              required
              dense
            />
            <Input
              style={{
                marginTop:15,
              }}
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
              dense
            />
            <Input
              style={{
                marginTop:15,
              }}
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
              dense
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
              ) : (
                <Button
                  style={{
                    height: 50,
                    justifyContent: "center",
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                  mode="contained"
                  color={Colors.primary}
                  onPress={signupHandler}
                >Register
                </Button>
              )}
            </View>
          </ScrollView>
        {/* </Card> */}
      {/* </LinearGradient> */}
    </KeyboardAvoidingView>
  );
};

SignupScreen.navigationOptions = {
  headerTitle: "Sign Up",
};

const styles = StyleSheet.create({
  screen: {
    flex: 2,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "100%",
    // maxWidth: 400,
    // maxHeight: 2600,
    paddingLeft: 35,
    paddingRight: 35,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
  logo: {
    width: "100%",
    height: 220,
    marginBottom: 15,
    padding: 20,
    // marginTop: 80,
  },
});

export default SignupScreen;
