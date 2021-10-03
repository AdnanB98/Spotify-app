import React, { FC } from 'react';
import './ErrorPage.css';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useHistory } from "react-router-dom";

interface ErrorProps {
    state: boolean;
    errorMessage: string;
    setState?: Function;
}
const ErrorPage: FC<ErrorProps> = (props) => {

    const history = useHistory();
    const handleClose = () => {
        history.push('/');
        props.setState(false);
    }

    // return (
    //     <div className="errorWrapper">
    //         <div>
    //             <h1 className="errorTitle">An Error has occurred</h1>
    //             <p className="errorMessage">{message}</p>
    //         </div>
    //     </div>
    // )

    return (
        <Dialog
            open={props.state}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"An Error has occurred"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.errorMessage}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Return to Login</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ErrorPage

