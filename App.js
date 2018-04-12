
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const NUM_WALLPAPERS = 5 ;


export default class SplashWalls extends Component {
    constructor(props){
      super(props)

      this.state= {
        wallsJSON: [],
        isLoading: true
      }
    }

    componentDidMount(){
      this.fetchWallsJSON()
    }

    fetchWallsJSON(){
      let url = 'https://unsplash.it/list';
      fetch(url)
        .then(response=> response.json())
        .then(jsonData => {
          console.log(jsonData)
          this.setState({isLoading: false})
        })
        .catch(error => console.log('Fetch error' + error))
    }

    renderLoadingMessage() {
    return (

      <View style={styles.loadingContainer}>
        <ActivityIndicator
          animating={true}
          color={'#fff'}
          size={'small'}
          style={{margin: 15}} />
          <Text style={{color: '#fff'}}>Contacting Unsplash</Text>

      </View>
    );
  }

      renderResults() {
     return (

     <View>
         <Text>
           Data loaded
         </Text>

    </View>
     );
    }

  render() {
    let {isLoading} = this.state;
    if(isLoading)
      return this.renderLoadingMessage();
    else {
       return this.renderResults()
    }
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  }
});
