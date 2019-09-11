import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core/';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles({
    orangeAvatar: {
        margin: 5,
        color: '#fff',
        backgroundColor: deepOrange[500],
    },
    purpleAvatar: {
        margin: 5,
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
});

const UserAvatar = ({ isLocal, nickname }) => {
    const classes = useStyles();
    const name = isLocal ? 'Me' : nickname;

    return (
        <Avatar className={isLocal ? classes.orangeAvatar : classes.purpleAvatar}>{name}</Avatar>

    );
};

export const Message = ({ message, classes }) => {
    const { nickname, text, ts, isLocal } = message;

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <UserAvatar isLocal={isLocal} nickname={nickname} />
            </ListItemAvatar>
            <ListItemText
                primary={text}
                secondary={<>{ts.toLocaleString()}</>}
            />
        </ListItem>
    )
}