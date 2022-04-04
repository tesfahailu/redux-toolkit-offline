import { compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { offline } from "@redux-offline/redux-offline";
import offlineConfig from "@redux-offline/redux-offline/lib/defaults";
import { logger } from "./../util/logger";
import toggleNetworkStatus from "../util/toggleNetworkStatus";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import amountReducer from "../redux/increaseAmount.slice";

const { random } = Math;

const effect = ({ json }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (random() > 0.5) {
        resolve(json);
      } else {
        reject({ error: "Foo" });
      }
    }, random() * 1000);
  });

const composedEnhancer = applyMiddleware(thunkMiddleware);
const offlineStoreEnhancer = compose(
  offline({
    ...offlineConfig,
    persist: false,
    effect,
    detectNetwork: (callback) => {
      toggleNetworkStatus.toggleNetworkStatus = callback;
      callback(false);
    },
  }),
  applyMiddleware(logger)
);

export const store = configureStore({
  reducer: {
    amount: amountReducer,
  },
  enhancers: [composedEnhancer, offlineStoreEnhancer],
});
