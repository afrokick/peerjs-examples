import React from 'react';
import { peerjs } from 'peerjs';
import { Box, Container, Paper } from '@material-ui/core';
import { Messages } from './messages';
import { Connect } from './connect';
import { NewMessageInput } from './input';
import { Message } from '../models/message';

const getRandomNumber = (length = 5) => [...Array(length)].map(i => (~~(Math.random() * 36)).toString(36)).join('');

const saveByteArray = (function () {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    return function (data, name) {
        var blob = new Blob(data, { type: "octet/stream" }),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

export class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            myId: `user_${getRandomNumber()}`,
            remoteId: '',
            messages: [],
            connecting: false,
            connected: false,
            sending: false,
        }

        this.peer = null;
        this.dc = null;
    }

    addMessage(message) {
        this.setState({
            messages: [...this.state.messages, message]
        })
    }

    onMyIdChange = ({ target }) => {
        this.setState({
            myId: target.value
        })
    }

    onRemoteIdChange = ({ target }) => {
        this.setState({
            remoteId: target.value,
        })
    }

    onConnectClick = () => {
        console.log('start connecting...');
        this.setState({ connecting: true })

        this.peer = new peerjs.Peer(this.state.myId, { debug: 3 });
        this.peer.on('open', this.onConnectedToPeerJS);
        this.peer.on('connection', this.onIncomingDataConnection);

        window.pc = this.peer; //for test purpose
    }

    onConnectedToPeerJS = () => {
        if (!this.state.remoteId) return;

        this.dc = this.peer.connect(this.state.remoteId, { reliable: true });

        this.subscribeToDCEvents();
    }

    subscribeToDCEvents = () => {
        window.dc = this.dc; //for test purpose

        this.dc.on('open', () => {
            console.log(`DC opened!`);

            this.setState({
                connecting: false,
                connected: true,
            });
        });
        this.dc.on('close', () => {
            console.log(`DC closed!`);
        });
        this.dc.on('data', (data) => {
            console.log(`DC data:`, data);

            if (!data || !data.name) return;

            this.addMessage(new Message({
                nickname: this.dc.peer,
                ts: new Date(),
                text: `file ${data.name} received`,
                isLocal: false,
            }));

            const sampleBytes = data.file;

            saveByteArray([sampleBytes], data.name);
        });
        this.dc.on('error', (error) => {
            console.error(`DC error:${error}`);
        });
    }

    onIncomingDataConnection = (dc) => {
        console.log(`Incoming dc:`, dc);

        this.dc = dc;

        this.setState({
            remoteId: dc.peer,
        })

        this.subscribeToDCEvents();
    }

    onFileSelected = (file) => {
        console.log(file);
        this.addMessage(new Message({
            nickname: this.state.myId,
            ts: new Date(),
            text: `file ${file.name} was send`,
            isLocal: true,
        }));

        setTimeout(() => {
            console.log(`start sending...`);
            this.dc.send({ file, name: file.name });
        }, 500);
    }

    render() {
        const { myId, remoteId, connecting, connected, messages } = this.state;

        return <Container maxWidth="sm">
            <Box>
                <Connect
                    myId={myId}
                    remoteId={remoteId}
                    connecting={connecting}
                    connected={connected}
                    onConnectClick={this.onConnectClick}
                    onMyIdChange={this.onMyIdChange}
                    onRemoteIdChange={this.onRemoteIdChange} />
            </Box>
            {connected && (<Box marginTop="10px">
                <Paper>
                    <Box padding="5px">
                        <Messages messages={messages} />
                    </Box>
                    <Box padding="5px">
                        <NewMessageInput onFileSelected={this.onFileSelected} />
                    </Box>
                </Paper>
            </Box>)}
        </Container>
    }
}