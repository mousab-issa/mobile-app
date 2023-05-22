import { SafeAreaProvider } from "react-native-safe-area-context";
import { ErrorBoundary } from "./src/components";
import AppNavigator from "./src/navigation/AppStack";

const App = () => {
  return (
    <ErrorBoundary catchErrors="dev">
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
};

export default App;
