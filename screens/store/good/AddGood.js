import React, { useState, useEffect, useReducer, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Alert,
  View,
  Image,
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
      behavior="height"
      keyboardVerticalOffset={5}
      style={styles.screen}
    >
      <ScrollView>
        <Card>
          <Card.Content>
            <Image
              source={require("../../../assets/addproduct.png")}
              style={styles.logo}
            />
            <Input
              style={styles.padtop}
              id="name"
              label="Product Name"
              errorText="Please Insert Product Name"
              keyboardType="default"
              initialValue=""
              onInputChange={inputChangeHandler}
              required
            />
            <Input
              style={styles.padtop}
              id="description"
              label="Product description"
              errorText="Please Insert Product description"
              keyboardType="default"
              initialValue=""
              onInputChange={inputChangeHandler}
              required
            />
            <Input
              style={styles.padtop}
              id="faq"
              label="Product FAQ"
              errorText="Please Insert Product FAQ"
              keyboardType="default"
              initialValue=""
              onInputChange={inputChangeHandler}
              required
            />
            <Input
              style={styles.padtop}
              id="price"
              label="Product price"
              errorText="Please Insert Product price"
              keyboardType="decimal-pad"
              initialValue=""
              onInputChange={inputChangeHandler}
              required
            />
            <Input
              style={styles.padtop}
              id="stock"
              label="Product stock"
              errorText="Please Insert Product stock"
              keyboardType="decimal-pad"
              initialValue=""
              onInputChange={inputChangeHandler}
              required
            />
            <Input
              style={styles.padtop}
              id="shippingWeight"
              label="Product shipping weight"
              errorText="Please Insert Product shipping weight"
              keyboardType="decimal-pad"
              initialValue=""
              onInputChange={inputChangeHandler}
              required
            />
            <Input
              style={styles.padtop}
              id="minimumOrder"
              label="Product minimum order"
              errorText="Please Insert Product minimum order"
              keyboardType="decimal-pad"
              initialValue=""
              onInputChange={inputChangeHandler}
              required
            />
            <Input
              style={styles.padtop}
              id="condition"
              label="Product condition"
              errorText="Please Insert Product condition"
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
                Add
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
    headerTitle: "Add Product",
  };
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 25,
  },
  padtop: {
    marginTop: 15,
    color: Colors.grey3
  },
  logo: {
    width: "100%",
    height: 220,
    marginBottom: 15,
    padding: 20,
    // marginTop: 80,
  },
});
