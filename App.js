import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";

import { AppLoading } from "expo";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";

import productsReducer from "./store/reducers/products";
import communitiesReducer from "./store/reducers/community";
import cartReducer from "./store/reducers/carts";
import authReducer from "./store/reducers/auth";
import groupReducer from "./store/reducers/group";

import ShopNavigator from "./navigation/ShopNavigator";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2ba84a",
  },
};

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer,
  communities: communitiesReducer,
  group: groupReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetcFonts = () => {
  return Font.loadAsync({
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetcFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <PaperProvider>
        <ShopNavigator />
      </PaperProvider>
    </Provider>
  );
}
