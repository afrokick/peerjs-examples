import React from 'react';
import { Button } from '@material-ui/core';

export const NewMessageInput = ({ onFileSelected }) => {
    const onChange = (ev) => {
        const [file] = ev.target.files || [];

        if (!file) return;

        onFileSelected(file);
    };

    return (
        <>
            <input
                accept="*/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={onChange}
            />
            <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">Upload</Button>
            </label>
        </>
    );
}