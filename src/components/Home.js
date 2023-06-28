import React, { useEffect, useState } from 'react'
import '../App.css'
import Box from '@mui/material/Box';
import { Button, Container, TextField, Typography } from '@mui/material';

import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Notes from './Notes';
import styled from '@emotion/styled';

const CustomButton = styled(Button)({
    color: "#61dafb",
    '&:hover': {
        backgroundColor: "#61dafb",
        color: "white"
    },

})

const Home = () => {

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [todos, setTodos] = useState([])

    //To set Todos in localStorage
    useEffect(() => {
        if (todos?.length) {
            localStorage.setItem("myTodos", JSON.stringify(todos))
        }
    }, [todos])

    //Get Todos from localstorage
    useEffect(() => {
        let storedTodos = localStorage.getItem("myTodos")
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos))
        }

    }, [])
    // console.log(todos[0].id === 1686460967782)
    const deleteNotes = (id) => {
        //retrive stored todos from localstorage
        const storedNotes = JSON.parse(localStorage.getItem("myTodos"))

        const updatedNotes = storedNotes.filter(elem => elem.id !== id)

        //set the updated Notes
        setTodos(updatedNotes)

        //get the updated noted from localstorage
        localStorage.setItem("myTodos", JSON.stringify(updatedNotes))
    }

    const updateData = (id, setTitle, setDesc, setOpen,title,desc) => {
        setTodos(
            todos.map((elem) => {
                console.log(title,desc)

                if (elem.id === id) {
                    setTitle(title)
                    setDesc(desc)
                    return{
                        ...elem,
                        id:id,
                        title:title,
                        desc:desc
                    }

                 

                }
                return elem
            })
        )
        localStorage.setItem("myTodos", JSON.stringify(todos))
        setOpen(false)
    }


    const addTodos = (e) => {
        e.preventDefault();
        const newTodo = {
            id: new Date().getTime(), // Generate a unique id using the timestamp
            title: title,
            desc: desc,
        };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setTitle("");
        setDesc("");

    };




    return (
        <>


            <Box 
            height={todos.length<=4?"100vh":""}
             sx={{
                width: "100%",
                // height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#404552"

            }}>

                <Typography variant="h4" gutterBottom sx={{
                    textAlign: "center",
                    margin: "2% 0",
                    color: "white",
                    fontSize: "1.8rem",

                }}>
                    Enter your ToDo
                </Typography>

                <Box component="form" onSubmit={addTodos} sx={{
                    // border: "1px solid  grey",
                    backgroundColor: "#282c34",
                    color: " #61dafb",
                    padding: "2% 0",
                    width: "25%",
                    marginBottom: "3%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    // boxShadow: '0px 1px 5px rgba(97, 218, 251, 0.4)',
                    boxShadow: '-2px -2px 23px 6px rgba(97,218,251,0.21)',
                    borderRadius: "3%"

                }}>

                    <TextField id="standard-basic" label="Title"
                        sx={{ margin: "10px 0", display: "block" }}
                        variant="standard"
                        value={title}
                        InputLabelProps={{
                            style: { color: '#61dafb' }, // Change label color
                        }}
                        InputProps={{
                            style: { color: 'white' }, // Change value color
                        }}
                        onChange={e => setTitle(e.target.value)} required
                    />
                    <TextField id="standard-basic" label="Description" variant="standard"
                        value={desc}
                        InputLabelProps={{
                            style: { color: '#61dafb' }, // Change label color
                        }}
                        InputProps={{
                            style: { color: 'white' }, // Change value color
                        }}
                        onChange={e => setDesc(e.target.value)} required
                    />

                    <CustomButton type='submit' variant="outlined" endIcon={<AddCircleRoundedIcon />}
                        sx={{ marginTop: "10%" }}>
                        Add

                    </CustomButton>
                </Box>

                <Container sx={{ marginBottom:"2%" }}>
                    <hr />
                    <Typography variant="h4" gutterBottom sx={{
                        textAlign: "center",
                        marginTop: "3%",
                        color: "white"
                    }}>
                        Your ToDos.....
                    </Typography>

                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "30px 25px",
                    }}>


                        {
                            todos.map((elem) => {
                                return (
                                    <Notes key={elem.id} title={elem.title} desc={elem.desc} id={elem.id} todos={todos}
                                        // preFilledData = {preFilledData}
                                        updateData={updateData}
                                        deleteNotes={deleteNotes}
                                    />
                                )
                            })
                        }
                    </Box>
                </Container>

            </Box>
        </>
    )
}

export default Home