import React from 'react';
import { Animated, Dimensions } from 'react-native';

export default class FadeInView extends React.Component {


    constructor(props) {
        super(props); 
        let {height, width} = Dimensions.get('window');
        this.state = {
            pan: new Animated.ValueXY({x:width,y:0})
        }
    }

    componentDidMount(){
     /*   Animated.spring(
            this.state.pan,
            {
                toValue:{x:0,y:0}
            }
        ).start();*/
       /*Animated.sequence([
            Animated.delay(this.props.delay),
            Animated.spring(
                this.state.pan,
                {
                   toValue:{x:0,y:0}
                }
            )
        ]).start();*/
         Animated.spring(
            this.state.pan,
            {
                delay: this.props.delay,
                toValue:{x:0,y:0}
            }
        ).start();
        /*Animated.timing(
            this.state.pan,
            {
                delay: this.props.delay,
                duration:3000,
                toValue:{x:0,y:0}
            }
        ).start();*/
    }
    render(){
        return (
          <Animated.View 
          style={{
              ...this.props.style,
              transform: this.state.pan.getTranslateTransform()
          }}>
              {this.props.children}

            </Animated.View>  
        );
    }

}