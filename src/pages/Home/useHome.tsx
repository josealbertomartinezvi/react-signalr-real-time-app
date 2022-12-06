import { ChangeEvent, SyntheticEvent, useContext, useState } from "react";
import { SignalrContext } from "../../context";
import { SignalrActions, UserType } from "../../context/signalr/SignalrContext";
import { useSignalr } from "../../hooks";
import { getUserChatStatus } from "../../services";
import { Api, Channels, Queues } from "../../utils";

const useHome = ( ) => {

    useSignalr(`${Api.URL}/chat`)

    const { signalr, dispatch } = useContext(SignalrContext);

    const [form, setForm] = useState<UserType>({
        name: '',
        email: '',
    });

    const [newMessage, setNewMessage] = useState<string>('');

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const createRoom = async (event: SyntheticEvent) => {
        event.preventDefault();

        if( form.name?.trim() === '' || form.email?.trim() === '') {
            alert("Ingrese datos");
            return;
        }

        try {
            const room = `${Queues.SUPPORT}-${form.email}`;
            const response = await getUserChatStatus(room);

            dispatch({
                type: SignalrActions.UPDATE_CONNECTION,
                payload: {
                    roomState: response,
                    user: {
                        name: form.name,
                        email: form.email,
                    },
                    room
                }
            });

            await signalr.connectionInfo?.send("JoinRoom", { 
                user: form.name, room, queue: Queues.SUPPORT 
            });

        } catch (error) {
            console.log(error);
        }

    }
    

    const sendMessage = async (event: SyntheticEvent) => {
        event.preventDefault();

        try {
            await signalr.connectionInfo?.invoke(Channels.SEND_MESSAGES, newMessage, '', false);
            setNewMessage('')
        } catch (error) {
            
        }

    }

    return {
        createRoom,
        sendMessage,
        onChange,
        signalr,
        form,
        newMessage, 
        setNewMessage
    };

};

export default useHome;