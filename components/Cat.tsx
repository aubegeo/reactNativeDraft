import React, { Children } from 'react'
import  { Text,  View , StyleSheet, Image, ActivityIndicator} from 'react-native'
import Style from '../Style'
import { Button, ListItem } from 'react-native-elements'
import axios from 'axios';
import { Icon, InlineIcon } from '@iconify/react';
import catFootprint from '@iconify/icons-icons8/cat-footprint';

export default class Cat extends React.Component {

    
    

    constructor(props){
        super(props);
        
        this.state = { report:null};
           
            setTimeout(()=> {
                this.fetchCat();
            }, 1000);
        }

      
    
    fetchCat(){

       if(this.getRandomInt(10) % 2 === 0){
        axios.get(`https://dog.ceo/api/breeds/image/random`)
        .then((response)=> 
            {
                this.setState({report:response.data.message});
            });
        } 
        else if(this.getRandomInt(10) % 5 === 0){
            axios.get(`http://shibe.online/api/shibes`)
            .then((response)=> 
                {
                    this.setState({report:response.data[0]});
                });
            } 
        else  {
        axios.get(`https://api.thecatapi.com/v1/images/search`)
        .then((response)=> 
            {
                this.setState({report:response.data[0].url});
            });
        }
        
    }

    componentWillUnmount(){
        this.state = null;
    }

    submit(){
        this.props.children.goBack();
    }

    reload(){
        this.state.report = null;
       
        setTimeout(()=> {
            this.fetchCat();
        }, 1000);
    }

    render(){
        if(this.state === null || this.state.report === null){
            return(
                   <View>
                     <ActivityIndicator color={'red'} size='large' style={Style.loader}/>
                    
                    <Button icon={{name: 'squirrel', type: 'octicon', color:'yellow'}} buttonStyle={Style.button}  
                    onPress={() => this.submit()} title="Go back"/>
            
                </View>
                );
        }else{
               return(
                        
                        <View>
                            <Image
                                style={style.imageWH}
                                source={{
                                uri: this.state.report,
                                }}
                            />
                        <Button buttonStyle={Style.button}
                        onPress={() => this.reload()} title="  Reload"
                        icon={() => (
                            <Image source={require('./icons/foot-print.svg')}
                            style={[{width: 25,height: 25,tintColor: 'yellow'}]}/>
                        )}/>
                    
                            <Button icon={{name: 'squirrel', type: 'octicon', color:'yellow'}} buttonStyle={Style.button}  
                            onPress={() => this.submit()} title="Go back"/>
                    
                        </View>
                    );
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
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
    imageWH: {
        width: window.innerWidth,
        minHeight: 350,
        padding:0,
        margin:10
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

