import React, { useEffect } from 'react';
import HomeStack from './src/routes/HomeStack';
import { StyleSheet,StatusBar } from 'react-native'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawer from './src/routes/CustomDrawer';
import { Provider } from 'react-redux'
import { store, persistor } from './src/store/store'
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';


import { PersistGate } from 'redux-persist/integration/react'
import { mainBlueColor } from './src/utils.js/colors';


const Drawer = createDrawerNavigator();

export default function App() {

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('New Notification!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);



  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken()
    }
  }

  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
  }

  return (

  
    <Provider store={store}>
       
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar  backgroundColor={mainBlueColor} barStyle='light-content'/>
        <NavigationContainer >
       
          <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} initialRouteName="Home"
            options={{ headerStyle: styles.RemoveHeader }} screenOptions={{
              headerShown: false
            }}>
            <Drawer.Screen name="InitialHome" component={HomeStack} />
          </Drawer.Navigator>
         
        </NavigationContainer>
        
      </PersistGate>
      
    </Provider>
   
  );
}

const styles = StyleSheet.create({


})


