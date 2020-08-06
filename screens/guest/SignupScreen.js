import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

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
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="firstName"
              label="First Name"
              errorText="Please Insert First Name"
              keyboardType="default"
              onInputChange={inputChangeHandler}
              initialValue=""
              required
            />
            <Input
              id="lastName"
              label="Last Name"
              errorText="Please Insert Last Name"
              keyboardType="default"
              onInputChange={inputChangeHandler}
              initialValue=""
              required
            />
            <Input
              id="phone"
              label="phone"
              errorText="Please Phone Number"
              keyboardType="phone-pad"
              onInputChange={inputChangeHandler}
              initialValue=""
              required
            />
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
            />
            <Input
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
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
              ) : (
                <Button
                  title="Sign Up"
                  color={Colors.primary}
                  onPress={signupHandler}
                />
              )}
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

SignupScreen.navigationOptions = {
  headerTitle: "Sign Up",
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
    width: "80%",
    maxWidth: 400,
    maxHeight: 600,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default SignupScreen;
