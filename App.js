// import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import Google Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAUbzH-mqrcCIGBW-FrJsZel_7P9ErECyo",
  authDomain: "chat-4ad5f.firebaseapp.com",
  projectId: "chat-4ad5f",
  storageBucket: "chat-4ad5f.appspot.com",
  messagingSenderId: "440234241007",
  appId: "1:440234241007:web:e14f99ed9605507e16a41a",
  measurementId: "G-1S5841S4N3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Create the navigator
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
