import {ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Login from './app/screens/loginScreen/Login';
import Colors from './assets/utils/Colors';
import { ClerkProvider,SignedIn,SignedOut } from '@clerk/clerk-expo';
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './app/navigation/TabNavigation';

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
  

export default function App() {

  
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey='pk_test_Y2FyZWZ1bC1zdGlua2J1Zy01MS5jbGVyay5hY2NvdW50cy5kZXYk'>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.PEACH} barStyle="dark-content" hidden={false} />

        {/* sign in component */}
        <SignedIn>
          <NavigationContainer>
            <TabNavigation/>
          </NavigationContainer>
        </SignedIn>

        {/* sign out component */}
        <SignedOut>
        <Login/>
        </SignedOut>
    </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
});
