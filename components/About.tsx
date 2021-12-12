import React from 'react'
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native'
 
import SearchFun from '../App';
import { NavigationContainer } from '@react-navigation/native';
import Search from './Search';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Button } from 'react-native-elements'



export default class About extends React.Component {

    constructor(props){
        super(props);
    }
    search () {
        this.props.children.navigate('Méteo');
        //this.props.children.navigation.navigate('Search')

    };

    render(){

        return (
            <View style={styles.view}>
                <Text style={styles.title}>Application Brouillon en React Native :</Text>
                <Text style={styles.text}>
                    Made with <Text style={styles.love}>♡</Text>.
                </Text>
                
            
                <Button buttonStyle={{ backgroundColor:'black'}} icon={{name: 'envira', type: 'font-awesome', color:'green'}} title={'Méteo'} onPress={()=> this.search()}/>
            </View>
            
        );
//<ActivityIndicator style={styles.view} color="#FF0000" size="large"/>
            
    }

}

const styles = StyleSheet.create({
    view: {
        margin:20
    },
    title: {
        fontSize: 22 ,
       marginBottom: 20
     }, 
     text: {
        fontSize: 22 ,
        marginBottom: 20,
        left: 20
     },
     love: {
        fontSize: 22 ,
       marginBottom: 20,
       color:'red'
     },
  });
  