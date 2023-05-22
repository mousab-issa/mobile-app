import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppStack";

const App = () => {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
