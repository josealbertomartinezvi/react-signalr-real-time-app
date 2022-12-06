import { HubConnectionBuilder } from "@microsoft/signalr";
import { useCallback, useContext, useEffect, useState } from "react";
import { SignalrContext } from "../context";
import { SignalrActions } from "../context/signalr/SignalrContext";
import { Channels } from "../utils";


const useSignalr = ( path: string ) => {

    const { dispatch, signalr } = useContext(SignalrContext);

    const buildConnection = useCallback(() => {

        const connection = new HubConnectionBuilder()
            .withUrl(path)
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(() => {
                dispatch({
                    type: SignalrActions.UPDATE_CONNECTION,
                    payload: {
                        connectionInfo: connection
                    }
                });
            })
            .catch(error => { });


    },[path]);

    useEffect(() => {
        buildConnection();
    }, [buildConnection]);


    useEffect(() => {

        signalr.connectionInfo?.on(Channels.RECIVE_MESSAGES,(user, message, floridaCurrentTime, fileID, isFile,room, fileUrl) => {

            console.log(user, message, floridaCurrentTime, fileID, isFile,room, fileUrl);
            alert(message);
        })

    }, [signalr.connectionInfo])


    return {

    };

};

export default useSignalr;