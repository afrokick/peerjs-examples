import React from 'react';
import { Box, TextField, Button, Paper, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    wrapper: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        position: 'relative',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: '-12px',
        marginTop: '-12px'
    },
}));

export const Connect = ({ connected, connecting, myId, remoteId, onConnectClick, onMyIdChange, onRemoteIdChange }) => {
    const classes = useStyles();

    return (
        <Paper>
            <Box m="5px">
                <TextField placeholder="Your nickname" value={myId} label="Your nickname" required disabled={connecting || connected} onChange={onMyIdChange} />
                <TextField placeholder="Remote nickname" value={remoteId} label="Remote nickname" required disabled={connecting || connected} onChange={onRemoteIdChange} />
            </Box>
            {!connected && <Box className={classes.wrapper}>
                <Button variant="contained" onClick={onConnectClick} disabled={connecting}>Connect</Button>
                {connecting && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Box>}
        </Paper>
    )
}