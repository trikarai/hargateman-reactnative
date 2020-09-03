import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, StyleSheet, Text, View, Alert, FlatList } from "react-native";
import { Card, ActivityIndicator, Button } from "react-native-paper";

import Colors from "../../../constants/colors";

import * as goodActions from "../../../store/actions/good";

import GoodItem from "../../../components/good/GoodItem";

const StoreGoodsScreen = (props) => {
  const storeId = props.navigation.getParam("storeId");
  const initialState = false;
  const [isLoading, setisLoading] = useState(initialState);
  const [isRefreshing, setisRefreshing] = useState(initialState);
  const [isError, setisError] = useState(initialState);
  const [ErrorMsg, setErrorMsg] = useState();

  const goods = useSelector((state) => state.good.goods);

  const dispatch = useDispatch();

  const loadGoods = useCallback(async () => {
    try {
      setErrorMsg(null);
      setisRefreshing(true);
      await dispatch(goodActions.fetchGoods(storeId));
    } catch (error) {
      setErrorMsg(error.message);
      setisError(true);
    }
    setisRefreshing(false);
  }, [dispatch, setisError, setErrorMsg, setisRefreshing]);

  useEffect(() => {
    if (ErrorMsg) {
      Alert.alert("An Error Occured", ErrorMsg, [{ text: "OK" }]);
    }
  }, [ErrorMsg]);

  useEffect(() => {
    setisLoading(true);
    loadGoods().then(() => {});
    setisLoading(false);
  }, [dispatch, loadGoods, setisLoading]);

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>An Error Occured</Text>
        <Button mode="contained" onPress={loadGoods}>
          Try Again
        </Button>
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
          size="large"
          animating={true}
          color={Colors.primary}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Card style={{
          margin: 20,
          padding: 10,
        }}>
        <View style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
          <Image
            source={require("../../../assets/addproduct-x1.png")}
            style={styles.logo}
          />
        </View>
        <Button
          style={{ margin: 5 }}
          mode="contained"
          // icon="plus"
          color={Colors.primary}
          onPress={() => {
            props.navigation.navigate("AddGood", { storeId: storeId });
          }}
        >
          Add New Product
        </Button>
        </Card>
        <FlatList
          onRefresh={loadGoods}
          refreshing={isRefreshing}
          data={goods}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <GoodItem
              name={itemData.item.name}
              price={itemData.item.price}
              stock={itemData.item.stock}
              condition={itemData.item.condition}
              listed={itemData.item.listed}
              createdTime={itemData.item.createdTime}
              product={itemData.item.product}
            />
          )}
        />
      </View>
    );
  }
};

export default StoreGoodsScreen;

StoreGoodsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Store Products",
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
    // width: "10%",
    // height: 220,
    marginBottom: 15,
    padding: 20,
    // marginTop: 80,
  },
});
