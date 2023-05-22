import React, { ReactElement } from "react";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import store from "../store";
import { SafeAreaProvider } from "react-native-safe-area-context";

const customRender = (ui: ReactElement, options = {}) =>
  render(
    <SafeAreaProvider>
      <Provider store={store}>{ui}</Provider>
    </SafeAreaProvider>,
    options
  );

export * from "@testing-library/react-native";

export { customRender as render };
