import * as React from 'react';
import { Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductsScreen from "./screens/ProductsScreen";
import EconomeScreen from "./screens/EconomeScreen";
import ProductImage from "./screens/ProductImage";
import ProductsDetails from "./screens/ProductsDetails";
import AddProduct from "./screens/AddProductScreen";
import AddPicture from "./screens/AddPictureScreen";

// @ts-ignore
export const AuthContext = React.createContext();
let retreivedToken: string;

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const Stack = createStackNavigator();
export default function App({ navigation }: any) {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: { type: string; token: any; }) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: undefined,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: undefined,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: { username: string; password: string; }) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        fetch('http://146.59.156.251:3000/auth/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: data.username.toLowerCase(),
            password: data.password.toLowerCase()
          })
        }).then(res => res.json())
          .then(json => {
            if(json.access_token !== undefined) {
              const save = async () => {
                try {
                  await AsyncStorage.setItem('token', json.access_token);
                } catch (err) {
                  alert(err);
                }
              }
              save();
              return dispatch({ type: 'SIGN_IN', token: json.access_token });
            }
            return dispatch({ type: 'SIGN_IN', token: undefined });
          });
      },
      signOut: () => {
        AsyncStorage.removeItem('token');
        dispatch({ type: 'SIGN_OUT', token: '' });
      },
      signUp: async (data: { username: string; password: string; }) => {
      },
    }),
    []
  );

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'Login'}>
            {state.isLoading ? (
              // We haven't finished checking for the token yet
              <Stack.Screen name="Splash" component={SplashScreen} />
            ) : typeof state.userToken == 'string' ? (
              // User is signed in
              // If logged in, goes into the first Stack.Screen
              <>
                <Stack.Screen name="Products" component={ProductsScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Econome" component={EconomeScreen} />
                <Stack.Screen name="ProductImage" component={ProductImage} />
                <Stack.Screen name="ProductsDetails" component={ProductsDetails} />
                <Stack.Screen name="Ajouter un produit" component={AddProduct} />
                <Stack.Screen name="Ajouter une photo" component={AddPicture} />
              </>
            ) : (
              // No token found, user isn't signed in
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  title: 'Login',
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}
