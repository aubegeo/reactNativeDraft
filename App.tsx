import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import About from './components/About'
import Search from './components/Search';
import Result from './components/Result';
import { NavigationContainer, useBackButton } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Cat from './components/Cat';
import Currency from './components/Currency';


function AboutFun({navigation}) {
  return (
    <About children={navigation}/>
  );
}
 
function SearchFun({navigation}) {
    
  return (
    <Search children={navigation}/>
  );

}

function CatFun({navigation}) {
  return (
    <Cat children={navigation}/>
  );
}

function CurrencyFun({navigation}) {
  return (
    <Currency children={navigation}/>
  );
}

function ResultFun(children) {
  return (
    <Result children={children}/>
  );
}

export default function App() {
  

const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <StatusBar hidden={false}/>
    <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Méteo') {
              return (
                <HomeIconWithBadge
                  name={
                    focused
                      ? 'ios-sunny'
                      : 'ios-partly-sunny'  
                  }
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'About') {
              iconName = focused ? 'ios-heart' : 'ios-happy';
            } else if (route.name === 'Cats & Dogs') {
              iconName = focused ? 'logo-octocat' : 'logo-octocat';
            } else if (route.name === 'Result') {
              iconName = focused ? 'ios-bulb' : 'ios-cafe';
            } else if (route.name === 'Exchange') {
              iconName = focused ? 'logo-yen' : 'logo-usd';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'gray',
        }} 
      >
      <Tab.Screen name="Méteo" component={SearchFun}/>
      <Tab.Screen name="About" component={AboutFun} />  
      <Tab.Screen name="Cats & Dogs" component={CatFun} />
      <Tab.Screen name="Exchange" component={CurrencyFun} />
      <Tab.Screen name="Result" component={ResultFun} />

    </Tab.Navigator>
  </NavigationContainer>
  );
}

function HomeIconWithBadge(props) {
  // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
  return <IconWithBadge {...props} badgeCount={0} />;
}


function IconWithBadge({ name, badgeCount, color, size }) {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <Ionicons name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

const S = StyleSheet.create({
  container: { flexDirection: "row", height: 52, elevation: 2 },
  tabButton: { flex: 1,  justifyContent: "center", alignItems: "center" }
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
