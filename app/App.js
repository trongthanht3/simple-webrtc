import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  mediaDevices,
  RTCView,
} from 'react-native-webrtc';
import { connect, Provider } from 'react-redux';
import { joinRoom } from './src/store/actions/videoActions'


const App = (props) => {
  
  useEffect(() => {
    let isFront = true;
    mediaDevices.enumerateDevices().then(sourceInfos => {
      console.log(sourceInfos);
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if(sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
          videoSourceId = sourceInfo.deviceId;
        }
      }
      mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 640,
          height: 480,
          frameRate: 30,
          facingMode: (isFront ? "user" : "environment"),
          deviceId: videoSourceId
        }
      })
      .then(stream => {
        joinRoom(stream);
        console.log(stream);
      })
      .catch(error => {
        console.log(error)
      });
    });
  });

  return (
    <Provider store={store}>
      <View>
        <Text>fffff</Text>
      </View>
    </Provider>
  )
};

const mapStateToProps = ({video}) => ({
  video,
});

export default connect(mapStateToProps, {joinRoom})(App);
// export default App;
