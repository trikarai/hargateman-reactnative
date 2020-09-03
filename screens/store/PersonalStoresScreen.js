import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Image, FlatList, View, StyleSheet, Alert } from "react-native";
import { Card, ActivityIndicator, Button, Text } from "react-native-paper";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "./../../components/UI/HeaderButton";
import PersonalStoreItem from "./../../components/store/PersonalStoreItem";

import Colors from "../../constants/colors";

import * as storeActions from "../../store/actions/store";

const PersonalStoresScreen = (props) => {
  const initialState = false;
  const [isLoading, setisLoading] = useState(initialState);
  const [isRefreshing, setisRefreshing] = useState(initialState);
  const [isError, setisError] = useState(initialState);
  const [ErrorMsg, setErrorMsg] = useState("");

  const stores = useSelector((state) => state.store.stores);

  const dispatch = useDispatch();

  const loadStores = useCallback(async () => {
    setErrorMsg(null);
    setisRefreshing(true);
    try {
      await dispatch(storeActions.fetchStores());
    } catch (error) {
      setErrorMsg(err.message);
      setisError(true);
    }
    setisRefreshing(false);
  }, [dispatch, setisRefreshing, setisError, setErrorMsg]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadStores);
    return () => {
      willFocusSub.remove();
    };
  }, [loadStores]);

  useEffect(() => {
    if (ErrorMsg) {
      Alert.alert("An Error Occured", ErrorMsg, [{ text: "OK" }]);
    }
  }, [ErrorMsg]);

  useEffect(() => {
    setisLoading(true);
    loadStores().then(() => {});
    setisLoading(false);
  }, [dispatch, loadStores, setisLoading]);

  const gotoGoodsHandler = (storeId) => {
    props.navigation.navigate("StoreGoods", { storeId: storeId });
  };

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>An Error Occured</Text>
        <Button mode="contained" onPress={loadStores}>
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
      <View style={{ margin: 5 }}>
        <Card style={{
          margin: 20,
          padding: 10,
        }}>
        <View style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
          <Image
            source={require("../../assets/store.png")}
            style={styles.logo}
          />
        </View>
        <Button
          style={{ margin: 5 }}
          mode="contained"
          color={Colors.primary}
          onPress={() => {
            props.navigation.navigate("CreateStore");
          }}
        >
          Create New Store
        </Button>
        </Card>
        {/* <Text>{JSON.stringify(stores)}</Text> */}
        <FlatList
          onRefresh={loadStores}
          refreshing={isRefreshing}
          data={stores}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <PersonalStoreItem
              id={itemData.item.id}
              name={itemData.item.name}
              gotoGoods={() => {
                gotoGoodsHandler(itemData.item.id);
              }}
            />
          )}
        />
      </View>
    );
  }
};

export default PersonalStoresScreen;

PersonalStoresScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Personal Stores",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
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
