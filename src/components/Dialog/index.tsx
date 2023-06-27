import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

type Props = {
    title:string;
    open: boolean;
    message: string;
    callback?: () => void
}

const DialogComponent = (props: Props) => {
    const [open, setOpen] = React.useState(props.open);

    const theme = useTheme();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.callback?.()
    };
    return (
        <Dialog
            fullScreen={useMediaQuery(theme.breakpoints.down('md'))}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogComponent