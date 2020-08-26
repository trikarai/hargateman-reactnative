import React, { useState, useEffect, useReducer, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Alert,
  View,
} from "react-native";
import { Card, Button } from "react-native-paper";

import Input from "../../../components/UI/Input";
import Colors from "../../../constants/colors";
import * as goodActions from "../../../store/actions/good";

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

const AddGood = (props) => {
  const storeId = props.navigation.getParam("storeId");
  const initialState = false;
  const [isLoading, setisLoading] = useState(initialState);
  const [isError, setisError] = useState(initialState);
  const [ErrorMsg, setErrorMsg] = useState();

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: "",
      description: "",
      faq: "",
      price: 0,
      stock: 0,
      shippingWeight: 0,
      minimumOrder: 0,
      condition: "",
      //   productId: "",
    },
    inputValidities: {
      name: false,
      description: false,
      faq: false,
      stock: false,
      price: false,
      shippingWeight: false,
      minimumOrder: false,
      condition: false,
      //   productId: false,
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
      await dispatch(
        goodActions.addGood(
          storeId,
          formState.inputValues.name,
          formState.inputValues.description,
          formState.inputValues.faq,
          formState.inputValues.price,
          formState.inputValues.stock,
          formState.inputValues.shippingWeight,
          formState.inputValues.minimumOrder,
          formState.inputValues.condition
        )
      );
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
      <ScrollView>
        <Card>
          <Card.Content>
            <Input
              id="name"
              label="Good Name"
              errorText="Please Insert Good Name"
              keyboardType="default"
              initialValue=""
              onInputChange={inputChangeHandler}
              required
            />
            <Input
              id="description"
              label="Good description"
              errorText="Please Insert Good description"
              keyboardType="default"
              initialValue=""
              onInputChange={inputChangeHandler}
              required
            />
            <Input
              id="faq"
              label="Good faq"
              errorText="Please Insert Good faq"
              keyboardType="default"
              initialValue=""
              onInputChange={inputChangeHandler}
              required
            />
            <Input
              id="price"
              label="Good price"
              errorText="Please Insert Good price"
              keyboardType="decimal-pad"
              initialValue=""
              onInputChange={inputChangeHandler}
              required
            />
            <Input
              id="stock"
              label="Good stock"
              errorText="Please Insert Good stock"
              keyboardType="decimal-pad"
              initialValue=""
              onInputChange={inputChangeHandler}
              required
            />
            <Input
              id="shippingWeight"
              label="Good shippingWeight"
              errorText="Please Insert Good shippingWeight"
              keyboardType="decimal-pad"
              initialValue=""
              onInputChange={inputChangeHandler}
              required
            />
            <Input
              id="minimumOrder"
              label="Good minimumOrder"
              errorText="Please Insert Good minimumOrder"
              keyboardType="decimal-pad"
              initialValue=""
              onInputChange={inputChangeHandler}
              required
            />
            <Input
              id="condition"
              label="Good condition"
              errorText="Please Insert Good condition"
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddGood;

AddGood.navigationOptions = (navData) => {
  return {
    headerTitle: "Add Good",
  };
};

const styles = StyleSheet.create({});
