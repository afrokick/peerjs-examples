import React, { useState } from 'react';
import { Input } from '@material-ui/core';

export const NewMessageInput = ({ onSendClick }) => {
    const [text, setText] = useState('');

    const onKeyPress = (ev) => {
        if (ev.key !== 'Enter') return

        ev.preventDefault();

        onSendClick(text);

        setText('');
    }
    return <Input placeholder="Enter text..." value={text} onChange={(ev) => setText(ev.target.value)} onKeyPress={onKeyPress} />
}