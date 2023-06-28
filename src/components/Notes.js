import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, TextField, Typography } from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import styled from '@emotion/styled';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import styles from './Button.module.css'
const DeleteBtn = styled(Button)(({ size }) => ({
    color: "white",
    backgroundColor: "#ed3524",
    marginLeft: "10px",
    '&:hover': {
        color: "white",
        backgroundColor: "#ed3524",

    },
    position: "relative",
    bottom: "-16px",
    fontSize: size === "small" ? "10px" : size === "medium" ? "16px" : "20px",
    padding: size === "small" ? "5px" : size === "medium" ? "8px" : "10px",
}));


const EditButton = styled(Button)(({ size }) => ({
    color: "white",
    backgroundColor: "#247bed",
    '&:hover': {
        color: "white",
        backgroundColor: "#247bed",

    },
    position: "relative",
    bottom: "-16px",
    fontSize: size === "small" ? "10px" : size === "medium" ? "16px" : "20px",
    padding: size === "small" ? "5px" : size === "medium" ? "8px" : "10px",
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


const Notes = ({ title, desc, deleteNotes, updateData, id, todos }) => {

    //for edit button dialog
    const [open, setOpen] = React.useState(false);
    const [uTitle, setUtitle] = useState("")
    const [uDesc, setUdesc] = useState("")
    const [editItemId, setEditITemId] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);

        const editedElem = todos.find((elem) => {
            return elem.id === id
        })
        setUtitle(editedElem.title)
        setUdesc(editedElem.desc)
        setEditITemId(editedElem.id)
    };

    // const handleClose = () => {
    //     setOpen(false);
    // };
    const handleClose = (event, reason) => {
        console.log(reason)
        if (reason && reason == "backdropClick")
            return;
        setOpen(false)
    }




    return (
        <>

            {/* modal */}
            <Dialog
                disableBackdropClick disableEscapeKeyDown
                open={open}
                // keepMounted
                aria-describedby="alert-dialog-slide-description"
                TransitionComponent={Transition}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        backgroundColor: '#282c34',
                        color: "white"
                    },
                }}

            >
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        name="title"
                        margin="dense"
                        id="name"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={uTitle}
                        onChange={e => setUtitle(e.target.value)}
                        InputLabelProps={{
                            style: { color: '#61dafb' }, // Change label color
                        }}
                        InputProps={{
                            style: { color: 'white' }, // Change value color
                        }}
                    />
                    <TextField
                        value={uDesc}
                        onChange={e => setUdesc(e.target.value)}
                        margin="dense"
                        name='desc'
                        id="name"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        InputLabelProps={{
                            style: { color: '#61dafb' }, // Change label color
                        }}
                        InputProps={{
                            style: { color: 'white' }, // Change value color
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} size="small"
                        sx={{
                            color: "white",
                            backgroundColor: "#ed3524",
                            '&:hover': {
                                color: "white",
                                backgroundColor: "#ed3524",

                            },
                        }}
                    >Cancel</Button>
                    <Button size="small" onClick={() => updateData(editItemId, setUtitle, setUdesc, setOpen, uTitle, uDesc)}
                        sx={{
                            color: "white",
                            backgroundColor: "#247bed",
                            '&:hover': {
                                color: "white",
                                backgroundColor: "#247bed",

                            },
                        }}
                    >Update</Button>
                </DialogActions>
            </Dialog>
            {/* modal over */}
            <Card sx={{
                minWidth: 260, minHeight: 120, backgroundColor: "#282c34",
                color: " #61dafb",
                // padding:"10px"

            }}>
                <CardContent>

                    <Typography variant="h5" sx={{
                        marginBottom: "10px",
                    }}>
                        {title}
                    </Typography>

                    <Typography variant="p" sx={{
                        color: "white",
                        '&:hover': {
                            backgroundColor: "#61dafb",
                            color: "white"
                        },
                    }}>
                        {desc}
                        <br />
                    </Typography>

                    <EditButton onClick={handleClickOpen} size="small" variant="standard" endIcon={<EditOutlinedIcon />}>Edit</EditButton>
                    <DeleteBtn onClick={() => deleteNotes(id)} size="small" variant="standard" endIcon={<DeleteForeverRoundedIcon />}>Delete</DeleteBtn>
                </CardContent>

            </Card>
        </>
    )
}

export default Notes