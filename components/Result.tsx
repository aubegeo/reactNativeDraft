import React, { Children } from 'react'
import  { Text,  View , StyleSheet, ActivityIndicator, FlatList} from 'react-native'
import Style from '../Style'
import { Button, ListItem } from 'react-native-elements'
import axios from 'axios';
import WeatherRow from './weather/Row'

export default class Result extends React.Component {

    
    

    constructor(props){
        super(props);
        
        if(this.props.children && this.props.children.route 
            && this.props.children.route.params && this.props.children.route.params.city){
                this.state = {city:this.props.children.route.params.city, report:null};
            }
            setTimeout(()=> {
                this.fetchWeather();
            }, 1000);
        }

      
    
    fetchWeather(){
        if(this.state && this.state.city){
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=
        ${this.state.city},fr&appid=147c93777f56eec939aac1431fe16a71`)
        .then((response)=> this.setState({report:response.data}));
        }
        else {
            this.setState({city:'Saint-Malo', report:null})
            axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=
        ${this.state.city},fr&appid=147c93777f56eec939aac1431fe16a71`)
        .then((response)=> this.setState({report:response.data}));
        }
     /*axios.get(`https://pro.openweathermap.org/data/2.5/forecast/daily?q=
        ${this.state.city}&appid=b1b15e88fa797225412429c1c50c122a1`)
        .then((response)=> this.setState({report:response.data}));*/
    }

    submit(){
        this.props.children.navigation.goBack();
    }

    render(){

        if(this.state === null || this.state.report === null || this.state.city === null){
        return(
            
            <View><ActivityIndicator color={'red'} size='large' style={Style.loader}/>
                
                <Button icon={{name: 'squirrel', type: 'octicon', color:'yellow'}} buttonStyle={Style.button}  
                 onPress={() => this.submit()} title="Go back"/>
         
            </View>
        );
        } else {

            return(
                <View>
                    <Text style={[style.white,style.bold,style.alignCenterText]}>
                        Tu as choisi(e) la ville de {this.state.city}</Text>
                    
                    <FlatList
                        data={this.state.report.list}
                        renderItem={({item, index}) => <WeatherRow day={item} index={index} key={index}/>}
                        keyExtractor={({item,index}) => index}
                        
                        />
                    
                    <Button icon={{name: 'squirrel', type: 'octicon', color:'yellow'}} buttonStyle={Style.button}  
                     onPress={() => this.submit()} title="Go back"/>
        
                </View>
            );
        }

    }

    componentWillUn
    componentWillReceiveProps(nextProps) {
        if(nextProps.children && nextProps.children.route 
            && nextProps.children.route.params && nextProps.children.route.params.city){
                this.setState({city:nextProps.children.route.params.city, report:null});
            }
            setTimeout(()=> {
                this.fetchWeather();
            }, 1000);
        }
   
   
}

const style = StyleSheet.create({
    alignCenterText: {
        height:40, 
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
    view:{
        backgroundColor: '#A2273C',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#202340',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    temp:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 22

    }

})
