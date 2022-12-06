import { Api } from "../utils";

export const getUserChatStatus = async (room: string) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    return await fetch(`${Api.URL}/api/Queue/GetRoomIsActive?room=${room}`, requestOptions)
    .then((res) => res.json()).catch((e) => { return { error: e } });
 }