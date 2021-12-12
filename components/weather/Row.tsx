import React from 'react'
import {View,Text, StyleSheet, Image} from 'react-native'
import PropTypes from 'prop-types'
import moment from 'moment'
import Style from '../../Style'
import 'moment/locale/fr'
import FadeInView from '../animation/fadeinView'
moment.updateLocale('fr');

export default class Row extends React.Component {

  static propTypes= {
    day: PropTypes.object,
    index : PropTypes.number
    }

    constructor(props){
        super(props);
        console.log(props)
        this.state = {};

    }

    day(){
       let day = moment(this.props.day.dt * 1000).format('ddd');
       return (<Text style={[style.white,style.bold]}>{day.toUpperCase()}</Text>);
    }

    date(){
        let day = moment(this.props.day.dt * 1000).format('DD/MM HH');
        return (<Text style={[style.white]}>{day}h</Text>);
    }

    icon(size = 50){
        const type = this.props.day.weather[0].main.toLowerCase();
        let image;
        switch (type){
            case 'mist':
                image = require('./icons/fog.png');
                break;
            case 'fog':
                image = require('./icons/fog.png');
                break;
            case 'haze':
                image = require('./icons/haze.png');
                break;
            case 'thunderstorm':
                image = require('./icons/thunderstorm.png');
                break;
            case 'snow':
            image = require('./icons/snow.png');
            break;
            case 'clouds':
                image = require('./icons/cloud.png');
                break;
            case 'drizzle':
                image = require('./icons/rain.png');
                break;
            case 'rain':
                image = require('./icons/rain.png');
                break;
            default:
                image = require('./icons/sun.png');
                break;
            }
        return (<Image source={image} style={{width: size, height: size, tintColor:'white'}}/>);
    }

    
    getWindDirWithDegre(){
       const winddir = this.props.day.wind.deg;
        //'Rounds the wind direction out into 17 sectors. Sectors 1 and 17 are both N.
        let sector = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"]

        let winddirection = sector[Math.round((winddir % 360)/ 22.5)+1];
        return  winddirection ? winddirection : "N";
    }

        
    getWindSpeed(){
        const windspeed = this.props.day.wind.speed;
        
         return Math.round(windspeed * 3.6);
         
     }

    render() {
        if(this.props.index === 0){
            return (
                <FadeInView delay={this.props.index * 50}>
                    <View style={[style.flex,style.view, style.firstView]}>
                   
                        <View>
                            <Text>{this.day()} {this.date()}</Text>
                            {this.icon()}
                        </View>

                        <View>
                            <Image source={require('./icons/wind.png')} style={{width: 20, height: 20, tintColor:'white'}}/>
                            <Text style={[style.wind]}> 
                                {this.getWindDirWithDegre()} {this.getWindSpeed()} km/h 
                                </Text> 
                        </View>  
                        <View>
                            <Text style={[style.temp, {fontSize:30}]}>
                                {Math.round(parseFloat(this.props.day.main.temp-(273.15)).toFixed(2))} °C
                            </Text>
                        </View>  
                      
                    </View>

                </FadeInView>
            );

        } else {
            return (
                <FadeInView delay={this.props.index * 50}>
                    <View style={[style.flex,style.view]}>
                        <View >
                            {this.icon()}
                            <Text style={{marginLeft:10}}>{this.day()} {this.date()}</Text>
                        </View>
                        <View>
                            <Text style={[style.temp]} >
                                {Math.round(parseFloat(this.props.day.main.temp-(273.15)).toFixed(2))} °C
                            </Text>
                        </View>
                        <View>
                        <Text style={[style.wind]}><Image source={require('./icons/wind.png')} 
                             style={{width: 20, height: 20, tintColor:'white'}}/> {this.getWindDirWithDegre()}</Text> 
                             <Text style={[style.wind]}>{this.getWindSpeed()} km/h 
                            </Text>  
                        </View>   
                    </View>
                </FadeInView>
            );
        }

    }

}

const style = StyleSheet.create({
    white: { 
        color:'#FFF'
    },
    bold: {
        fontWeight: 'bold'
    },
    flex: {
        flex: 1, 
        flexDirection:'row',
        alignItems:'center',
        
    },
    firstView: {
        backgroundColor: '#e54b65'
    },
    view:{
        backgroundColor: '#394163',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#202340',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        flexWrap:"wrap"
    },
    temp:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20
    },
    wind:{
        color: '#FFF',
        fontSize: 15,
        flexWrap:"wrap"
        
    }

})
