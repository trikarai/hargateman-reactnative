import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { ActivityIndicator, Button, Card } from "react-native-paper";

import Colors from "../../../../constants/colors";
import Input from "../../../../components/UI/Input";
import * as groupAction from "../../../../store/actions/group";

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

const GroupCreateScreen = (props) => {
  const communityId = props.navigation.getParam("communityId");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: "",
      description: "",
    },
    inputValidities: {
      name: false,
      description: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occured", error, [{ text: "OK" }]);
    }
  }, [error]);

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

  const createHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(
        groupAction.createGroup(
          communityId,
          formState.inputValues.name,
          formState.inputValues.description
        )
      ).then(() => {
        props.navigation.navigate("CommunityGroup");
      });
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={1}
    >
      <ScrollView>
        <Card>
          <View style={{ flex: 1, flexDirection: "column", padding: 5 }}>
            <Input
              id="name"
              label="Group Name"
              errorText="Please Insert Group Name"
              keyboardType="default"
              initialValue=""
              onInputChange={inputChangeHandler}
              required
            />
            <Input
              id="description"
              label="Group description"
              errorText="Please Insert Group description"
              keyboardType="default"
              initialValue=""
              onInputChange={inputChangeHandler}
              required
            />
            <View style={{ flex: 1, flexDirection: "row" }}>
              {isLoading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
              ) : (
                <Button
                  style={{ margin: 10 }}
                  mode="contained"
                  color={Colors.primary}
                  onPress={createHandler}
                >
                  Submit
                </Button>
              )}
            </View>
          </View>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default GroupCreateScreen;

GroupCreateScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Create Group for Community",
  };
};

const styles = StyleSheet.create({});
