import React, { useState, useEffect, useReducer, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ScrollView,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  View,
  Text,
  Picker,
} from "react-native";
import { ActivityIndicator, Card, Button } from "react-native-paper";
// import { Picker } from "@react-native-community/picker";

import baseUri from "../../config/baseUri";
import axios from "axios";
const regionUri = baseUri.api + "/guest";

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
  const [isLoadingProvince, setisLoadingProvince] = useState(initialState);
  const [isLoadingCities, setisLoadingCities] = useState(initialState);
  const [isLoadingDistricts, setisLoadingDistricts] = useState(initialState);
  const [isLoadingVillages, setisLoadingVillages] = useState(initialState);

  const [isError, setisError] = useState(initialState);
  const [ErrorMsg, setErrorMsg] = useState();

  const [province, setProvince] = useState(null);
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const [village, setVillage] = useState(null);

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.credentials.token);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: "",
      description: "",
      address: "",
      faq: "",
      phone: "",
    },
    inputValidities: {
      name: false,
      description: false,
      address: false,
      faq: false,
      phone: false,
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
        storeAction.createStore(
          formState.inputValues.name,
          formState.inputValues.description,
          formState.inputValues.address,
          formState.inputValues.faq,
          formState.inputValues.phone,
          province,
          city,
          district,
          village
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

  useEffect(() => {
    const fetchData = async () => {
      setisLoadingProvince(true);
      try {
        const response = await axios.get(regionUri + "/provinces", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const resData = response.data;
        if (resData.data.list) {
          setProvinces(resData.data.list);
        } else {
          setProvinces([]);
        }
      } catch (error) {
        console.log(error);
      }
      setisLoadingProvince(false);
    };
    fetchData();
  }, []);

  const loadCities = async (provinceId) => {
    setisLoadingCities(true);
    setDistricts([]);
    setVillages([]);
    try {
      const response = await axios.get(
        regionUri + "/provinces/" + provinceId + "/cities",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = response.data;
      if (resData.data.list) {
        setCities(resData.data.list);
      } else {
        setCities([]);
      }
    } catch (error) {
      console.log(error);
    }
    setisLoadingCities(false);
  };

  const loadDistricts = async (provinceId, cityId) => {
    setisLoadingDistricts(true);
    setVillages([]);
    try {
      const response = await axios.get(
        regionUri +
          "/provinces/" +
          provinceId +
          "/cities/" +
          cityId +
          "/districts",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = response.data;
      if (resData.data.list) {
        setDistricts(resData.data.list);
      } else {
        setDistricts([]);
      }
    } catch (error) {
      console.log(error);
    }
    setisLoadingDistricts(false);
  };
  const loadVillages = async (provinceId, cityId, districtId) => {
    setisLoadingVillages(true);
    try {
      const response = await axios.get(
        regionUri +
          "/provinces/" +
          provinceId +
          "/cities/" +
          cityId +
          "/districts/" +
          districtId +
          "/villages",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = response.data;
      if (resData.data.list) {
        setVillages(resData.data.list);
        setVillage(resData.data.list[0].id);
      } else {
        setVillages([]);
      }
    } catch (error) {
      console.log(error);
    }
    setisLoadingVillages(false);
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={3}
      style={styles.screen}
    >
      <ScrollView>
        <Card>
          <Card.Content>
            <Image
              source={require("../../assets/createnewstore.png")}
              style={styles.logo}
            />
            <Input
              style={styles.padtop}
              id="name"
              label="Store Name"
              errorText="Please Insert Store Name"
              keyboardType="default"
              initialValue=""
              onInputChange={inputChangeHandler}
              required
            />
            <Input
              style={styles.padtop}
              id="description"
              label="Store description"
              errorText="Please Insert Store description"
              keyboardType="default"
              initialValue=""
              onInputChange={inputChangeHandler}
              required
            />
            <Input
              style={styles.padtop}
              id="address"
              label="Store address"
              errorText="Please Insert Store address"
              keyboardType="default"
              initialValue=""
              onInputChange={inputChangeHandler}
            />
            <Input
              style={styles.padtop}
              id="faq"
              label="Store faq"
              errorText="Please Insert Store faq"
              keyboardType="default"
              initialValue=""
              onInputChange={inputChangeHandler}
              required
            />
            <Input
              style={styles.padtop}
              id="phone"
              label="Store phone"
              errorText="Please Insert Store phone"
              keyboardType="decimal-pad"
              initialValue=""
              onInputChange={inputChangeHandler}
              required
            />

            {isLoadingProvince ? (
              <ActivityIndicator />
            ) : (
            <View style={styles.headerPicker}>
              <Text  style={styles.padtop}>Province</Text>
              <Picker
                style={styles.pickpadtop}
                prompt="Province"
                selectedValue={province}
                onValueChange={(itemValue) => {
                  setProvince(itemValue);
                  loadCities(itemValue);
                }}
              >
                {provinces.map((item, key) => (
                  <Picker.Item
                    key={item.id}
                    label={item.name}
                    value={item.id}
                  />
                ))}
              </Picker>
            </View>
            )}
            {isLoadingCities ? (
              <ActivityIndicator />
            ) : (
            <View style={styles.headerPicker}>
              <Text  style={styles.padtop}>City</Text>
              <Picker
                style={styles.pickpadtop}
                prompt="City"
                selectedValue={city}
                onValueChange={(itemValue) => {
                  setCity(itemValue);
                  loadDistricts(province, itemValue);
                }}
              >
                {cities.map((item, key) => (
                  <Picker.Item
                    key={item.id}
                    label={item.name}
                    value={item.id}
                  />
                ))}
              </Picker>
            </View>
            )}
            {isLoadingDistricts ? (
              <ActivityIndicator />
            ) : (
            <View style={styles.headerPicker}>
              <Text  style={styles.padtop}>District</Text>
              <Picker
                style={styles.pickpadtop}
                prompt="District"
                selectedValue={district}
                onValueChange={(itemValue) => {
                  setDistrict(itemValue);
                  loadVillages(province, city, itemValue);
                }}
              >
                {districts.map((item, key) => (
                  <Picker.Item
                    key={item.id}
                    label={item.name}
                    value={item.id}
                  />
                ))}
              </Picker>
            </View>
            )}
            {isLoadingVillages ? (
              <ActivityIndicator />
            ) : (
            <View style={styles.headerPicker}>
              <Text  style={styles.padtop}>Villages</Text>
              <Picker
                style={styles.pickpadtop}
                prompt="Villages"
                selectedValue={village}
                onValueChange={(itemValue) => {
                  setVillage(itemValue);
                }}
              >
                {villages.map((item, key) => (
                  <Picker.Item
                    key={item.id}
                    label={item.name}
                    value={item.id}
                  />
                ))}
              </Picker>
            </View>
            )}
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
    marginTop: 25,
  },
  logo: {
    width: "100%",
    height: 220,
    marginBottom: 15,
    padding: 20,
    // marginTop: 80,
  },
  padtop: {
    marginTop: 15,
    color: Colors.grey3
  },
  pickpadtop: {
    height: 50,
  },
  headerPicker: {
    borderBottomColor: Colors.grey1,
    borderStyle: "solid",
    borderBottomWidth: 1,
  }
});
