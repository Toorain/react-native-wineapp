import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage, { AsyncStorageStatic } from '@react-native-community/async-storage';
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

export const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const Stack = createStackNavigator();
export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: { type: string; token: string | undefined | any; }) => {
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
        userToken = await AsyncStorage.getItem('userToke');
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
        const loginCall = fetch('http://146.59.156.251:3000/auth/login', {
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
              return json.access_token;
            }
            return undefined;
          });

          dispatch({ type: 'SIGN_IN', token: loginCall });

      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data: { username: string; password: string; }) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        const loginCall = fetch('http://146.59.156.251:3000/auth/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: data.username.toLowerCase(),
            password: data.password.toLowerCase()
          })
        }).then(res => res.json())
          .then(json => {
            if(json.access_token !== undefined) {
              alert("I get a token : " + json.access_token);
              return json.access_token;
            }
            return undefined;
          });

        dispatch({ type: 'SIGN_IN', token: loginCall });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : typeof state.userToken == 'string' ? (
            // No token found, user isn't signed in
            <Stack.Screen name="Home" component={HomeScreen} />
          ) : (
            // User is signed in
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
  );
}
