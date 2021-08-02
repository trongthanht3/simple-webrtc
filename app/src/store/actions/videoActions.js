import IO from 'socket.io-client';
import Peer from 'react-native-peerjs';

import {
    ADD_STREAM,
    MY_STREAM,
    ADD_REMOTE_STREAM,
} from './types';

// APP URI
export const API_URI = 'http://10.0.2.2:9000';

// Socket config
export const socket =  IO('$(API_URI)', {
    forceNew: true,
});

socket.on('connection', () => console.log('Connected client!'));

// Peer config
const peerServer = new Peer(undefined, {
    host: '10.0.2.2',
    secure: false,
    // port: 9000,
    path: '/newpeer'
})

peerServer.on('error', console.log)

export const joinRoom = (stream) => async (dispatch) => {
    const roomID = "vietnamcongsan"

    dispatch({type: MY_STREAM, payload: stream})
};

connectToNewUser = () => {};