import { ChangeEvent } from 'react';
import useHome from './useHome';

const Home = () => {

    const { createRoom, sendMessage, onChange, signalr, form, newMessage, setNewMessage } = useHome();

    return (
        <div className="App">
            <h1>Hola {signalr.user.name}</h1>
            <h3>Room: {signalr.room}</h3>
            <div className="card">
                <p>
                    <b>Signalr Server:</b> <span>{signalr.connectionInfo?.state}</span>
                </p>
                <form onSubmit={createRoom}>
                    <label>Name: </label>
                    <input
                        type="text"
                        name='name'
                        value={form.name}
                        onChange={onChange}
                    />
                    <br />
                    <label>Email: </label>
                    <input
                        type="email"
                        name='email'
                        value={form.email}
                        onChange={onChange}
                    />
                    <br />
                    <button type='submit' disabled={signalr.roomState === 0 || signalr.roomState === 1}>
                        Create Room
                    </button>
                </form>
            </div>
            {
                signalr.roomState === 0 || signalr.roomState === 1 &&             
                <div className="card">
                    <form onSubmit={sendMessage}>
                        <input
                            type="text"
                            name='message'
                            value={newMessage}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
                        />
                        <br />
                        <button type='submit'>
                            Send Message
                        </button>
                    </form>
                </div>
            }
        </div>
    )
}

export default Home;