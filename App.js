import { createStore, combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./components/Navigation";
import Home from "./screens/Home";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import profileReducer from "./store/reducers/ProfileReducer";
import chatReducer from "./store/reducers/ChatReducer";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import useFonts from "./hooks/useFonts";

const rootReducer = combineReducers({
  profile: profileReducer,
  chat: chatReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [IsReady, SetIsReady] = useState(false);
  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading 
        startAsync={LoadFonts} 
        onFinish={() => SetIsReady(true)} 
        onError={() => {}} 
      />
    )
  }

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

