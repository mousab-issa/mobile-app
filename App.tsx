import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { ErrorBoundary } from "./src/components";
import AppNavigator from "./src/navigation/AppStack";
import store from "./src/store";

const App = () => {
  return (
    <ErrorBoundary catchErrors="dev">
      <Provider store={store}>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
