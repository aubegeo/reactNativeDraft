import React, { Children } from 'react'
import  { TextInput,  View , Keyboard} from 'react-native'
import style from '../Style'
import { Button } from 'react-native-elements'

export default class Search extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            city:''
        }
        
    }

    setCity(city){
        this.setState({city})
    }

    submit(){

        if(this.state.city !==''){
            
            Keyboard.dismiss();
            this.props.children.navigate('Result', {city:this.state.city});
        }

    }

    render(){
        return(
            <View>
                <TextInput underlineColorAndroid='transparent'
                style={{height:40, borderColor:'gray', borderWidth:1, marginVertical: 60, marginHorizontal:20, padding:10}} 
                onChangeText={(text) => this.setCity(text)}  onSubmitEditing={() => this.submit()}
                value={this.state.city}/>
                <Button icon={{name: 'squirrel', type: 'octicon', color:'yellow'}} buttonStyle={style.button}  
                 onPress={() => this.submit()} title="Rechercher"/>
         
            </View>
        );

 
    }
   
}
