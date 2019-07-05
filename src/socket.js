import io from 'socket.io-client';

const socket = io('localhost:3001');

export const send = (type, data, callback) => {
    const confirm = response => {
        callback(response);
        socket.off(type, confirm);
    };
    socket.on(type, confirm);
    socket.emit(type, data);
};

export default socket;
