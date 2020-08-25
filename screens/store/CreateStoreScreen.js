import React, { useState, useEffect, useReducer, useCallback } from "react";
import { useDispatch } from "react-redux";
import { KeyboardAvoidingView, StyleSheet, Alert, View } from "react-native";
import { Card, Button } from "react-native-paper";

import Input from "../../components/UI/Input";
import Colors from "../../constants/colors";
import * as storeAction from "../../store/actions/store";

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

const CreateStore = (props) => {
  const initialState = false;
  const [isLoading, setisLoading] = useState(initialState);
  const [isError, setisError] = useState(initialState);
  const [ErrorMsg, setErrorMsg] = useState();

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: "",
    },
    inputValidities: {
      name: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (ErrorMsg) {
      Alert.alert("An Error Occured", ErrorMsg, [{ text: "OK" }]);
    }
  }, [ErrorMsg]);

  const createHandler = async () => {
    setErrorMsg(null);
    setisLoading(true);
    try {
      await dispatch(storeAction.createStore(formState.inputValues.name));
      props.navigation.goBack();
    } catch (err) {
      setErrorMsg(err.message);
      setisLoading(false);
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
      behavior="padding"
      keyboardVerticalOffset={5}
      style={styles.screen}
    >
      <View>
        <Card>
          <Card.Content>
            <Input
              id="name"
              label="Store Name"
              errorText="Please Insert Store Name"
              keyboardType="default"
              initialValue=""
              onInputChange={inputChangeHandler}
              required
            />
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                loading={isLoading}
                color={Colors.primary}
                onPress={createHandler}
              >
                Create
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateStore;
CreateStore.navigationOptions = (navData) => {
  return {
    headerTitle: "Create Personal Stores",
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
