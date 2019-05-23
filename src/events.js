import { useEffect } from 'react';
import { useStore } from './StoreContext';
import socket from './socket';

const useEvents = () => {
    const { addPlayer } = useStore();

    useEffect(() => {
        socket.on('add player', addPlayer);
    }, [addPlayer]);
};

export default useEvents;
