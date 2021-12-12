import React from 'react';
import {
  Text,
  TextInput,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  View,
  Keyboard,
} from 'react-native';

import { Button } from 'react-native-elements'

import { Chevron } from 'react-native-shapes';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

import axios from 'axios';
import Style from '../Style';
// import RNPickerSelect, { defaultStyles } from './debug';

const sports = [
  {
    label: 'Euro',
    value: 'EUR',
  },
  {
    label: 'Dollar',
    value: 'USD',
  },
  {
    label: 'Yuan',
    value: 'CNY',
  },
];

export default class Currency extends React.Component {
  constructor(props) {
    super(props);

    this.inputRefs = {
      firstTextInput: null,
      favSport0: null,
      favSport1: null
    };

    this.state = {
      numbers:1,
      favSport0: undefined,
      favSport1: undefined,
    };

  
  }

     
  fetchCurrency(){
    // https://free.currconv.com/api/v7/convert?apiKey=0e6e46c00fc85cbff604&q=USD_CNY
    if(this.state && this.state.favSport0 && this.state.favSport1 && this.state.numbers){
        axios.get(`https://free.currconv.com/api/v7/convert?apiKey=0e6e46c00fc85cbff604&compact=ultra&q=${this.state.favSport0}_${this.state.favSport1}`)
         .then((response)=> 
             {
                    let reporting = this.state.numbers * response.data[`${this.state.favSport0}_${this.state.favSport1}`]
                   this.setState({report:reporting});
             }
             )
         .catch((error) =>
             {
                 console.log(error);
                    let reporting = "erreurAPI";
                  this.setState({report:reporting});
             }
             );
        }
    }
     




  render() {
    const placeholder = {
      label: 'Select a currency...',
      value: null,
      color: 'red',
    };

    if(this.state && this.state.report){
            if(this.state && this.state.report != "erreurAPI"){
            return (
            <View style={styles.container}>
               <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContentContainer}>
                      <Text style={[styles.alignCenterText, styles.white, styles.resultCalc]}>
                        {this.state.numbers}{` `}
                        {this.state.favSport0}{` = `}
                        {this.state.report * this.state.numbers}{` `}
                        {this.state.favSport1}{` `}
                    </Text>
                    <View paddingVertical={5} />
                    <Button
                    buttonStyle={Style.button}
                    title="New"
                    onPress={() => {
                    this.setState({
                         numbers:1,
                        favSport0: undefined,
                        favSport1: undefined,
                        report:undefined
                    });
                    }}
                />
                </ScrollView>
          </View>);
        }else{
         return (
                    <View style={styles.container}>
                       <ScrollView
                      style={styles.scrollContainer}
                      contentContainerStyle={styles.scrollContentContainer}>
                              <Text style={[styles.alignCenterText, styles.white, styles.resultCalc]}>
                                Erreur API Indisponible
                            </Text>
                            <View paddingVertical={5} />
                            <Button
                            buttonStyle={Style.button}
                            title="New"
                            onPress={() => {
                            this.setState({
                                 numbers:1,
                                favSport0: undefined,
                                favSport1: undefined,
                                report:undefined
                            });
                            }}
                        />
                        </ScrollView>
                  </View>);
                  }
    }else{

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}>
        
          <View paddingVertical={5} />

          <Text>Convertir</Text>
          {/* and value defined */}
          <RNPickerSelect
            placeholder={placeholder}
            items={sports}
            onValueChange={value => {
              this.setState({
                favSport0: value,
              });
            }}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}
            value={this.state.favSport0}
            useNativeAndroidPickerStyle={false}
            textInputProps={{ underlineColor: 'yellow' }}
            Icon={() => {
              return <Ionicons name="md-arrow-down" size={24} color="red" />;
            }}
          />

          
         <View paddingVertical={5} />

         <Text>En</Text>
          {/* and value defined */}
          <RNPickerSelect
            placeholder={placeholder}
            items={sports}
            onValueChange={value => {
              this.setState({
                favSport1: value,
              });
            }}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}
            value={this.state.favSport1}
            useNativeAndroidPickerStyle={false}
            textInputProps={{ underlineColor: 'yellow' }}
            Icon={() => {
              return <Ionicons name="md-arrow-down" size={24} color="red" />;
            }}
          />

          <View paddingVertical={5} />

          <Text>Combien</Text>
          <TextInput
            keyboardType="numeric"
            ref={el => {
              this.inputRefs.firstTextInput = el;
            }}
            returnKeyType="next"
            enablesReturnKeyAutomatically
            onChange={(value) => {
                this.setState({
                    numbers: value.nativeEvent.text,
                });
            }}
            onSubmitEditing={(value) => {
                Keyboard.dismiss();
                this.setState({
                    numbers: value.nativeEvent.text,
                });
            }}
            style={
              Platform.OS === 'ios'
                ? pickerSelectStyles.inputIOS
                : pickerSelectStyles.inputAndroid
            }
            blurOnSubmit={false}
          />

          <View paddingVertical={10} />

          <Button
          buttonStyle={Style.button} 
            title="Calculer"
            onPress={() => {
              this.fetchCurrency();           
            }}
          />
            
          <View paddingVertical={5} />
          
        </ScrollView>
      </View>
    );
    }
  }
}

const styles = StyleSheet.create({
  resultCalc:{
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 25

  },
  alignCenterText: {
    textAlign:"center",
    height:60, 
    marginTop: 20, 
    marginHorizontal:0, 
    padding:10,  
    backgroundColor: '#A2273C',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#202340',
},
white: { 
    color:'#FFF'
},
bold: {
    fontWeight: 'bold'
},
  container: {
    flex: 1,
  }, 
  imageWH: {
      width: window.innerWidth,
      minHeight: 350,
      padding:0,
      margin:10
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  scrollContentContainer: {
    paddingTop: 40,
    paddingBottom: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
