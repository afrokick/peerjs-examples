import React from 'react';
import { Message } from './message';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

export const Messages = ({ messages }) => {
    const classes = useStyles();

    return (
        <>
            <h3>Lets start conversation...</h3>
            <List className={classes.root}>
                {messages.map(message => {
                    return <Message key={String(message.ts.getTime())} message={message} classes={classes} />
                })}
            </List>
        </>)
}