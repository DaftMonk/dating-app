import { RootStackParamList } from "@app-types/navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { ChatScreen } from "screens/ChatScreen";
import { MatchesScreen } from "screens/MatchesScreen";
import * as Font from "expo-font";
import { useEffect } from "react";
import { fonts } from "@constants";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const fetchFonts = () => {
    return Font.loadAsync({
      "Proxima-Nova-Regular": require("@fonts/Proxima-Nova-Regular.otf"),
      "Proxima-Nova-Bold": require("@fonts/Proxima-Nova-Bold.otf"),
      "Proxima-Nova-Semibold": require("@fonts/Proxima-Nova-Semibold.otf"),
    });
  };

  useEffect(() => {
    fetchFonts();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <SafeAreaView style={{ backgroundColor: "white" }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Matches" component={MatchesScreen} />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={({ route }) => ({
              title: route.params.name,
            })}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
