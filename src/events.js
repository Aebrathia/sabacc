import { useEffect } from 'react';
import { useStore } from './StoreContext';
import socket from './socket';

const useEvents = () => {
    const { addPlayer, setReady } = useStore();

    useEffect(() => {
        socket.on('add player', addPlayer);
        socket.on('opponent is ready', setReady);
    }, [addPlayer, setReady]);
};

export default useEvents;
