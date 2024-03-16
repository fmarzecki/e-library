import { Box, Button, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import List from './List';
import axios from 'axios';


function Clicker({text}) {

    const [count, setCount] = useState(0);
    const [textArea, setTextArea] = useState("");
    const [catFact, setCatFact] = useState("");
    const refCounter = useRef(0);

    useEffect(() => {
        const button1 = document.getElementById('b1');
        const button2 = document.getElementById('b2');

        button1.addEventListener("click", handleOnClickRef);
        button2.addEventListener("click", handleOnClickRef);
        
        console.log("Event handler attached")

        return () => {
            button1.removeEventListener("click", handleOnClickRef);
            button2.removeEventListener("click", handleOnClickRef);
        }
            
    }, [])

    useEffect(() => {
        axios.get('https://catfact.ninja/fact')
            .then(response => {
            setCatFact(response.data.fact);
             })
            .catch(error => {
            console.error(error);
        });
    }, [])

    const buttonOnClick = () => {
        setCount(c => c+1);
    }

    const handleOnClickRef = () => {
        refCounter.current++;
    }

    const stopClicking = (
        <Grid item xs={12} textAlign='center'> 
          <Typography variant='h6'>
            {text}
          </Typography>
        </Grid>
      );
      
  return (
    <>
    <Grid container justifyContent="center" alignItems="center" spacing={1} 
        sx={
            {
                'button': {width: 1}
            }
        }
        >
        <Grid item xs={12} textAlign='center'>
            <Typography>
             {'\u00A0'} Clicked {count} times (useState) 
            </Typography>
            <Typography>
                Clicked {refCounter.current} times (useRef)
            </Typography>
        </Grid>

        <Grid item xs={6} >
            <Button id='b1' disabled={count%2===0} size='large' variant="outlined" onClick={buttonOnClick}>
                Click me
            </Button>
        </Grid>

        <Grid item xs={6}>
            <Button id='b2' disabled={count%2===1} size='large' variant="outlined" onClick={()=> setCount(count+1)}>
                Click me
            </Button>
        </Grid>
        {count > 7 && stopClicking}
    </Grid>

        <Grid >
            <Typography> 
                Top Tier owoców
            </Typography>
            <List />
        </Grid>

        <Grid container>
            <textarea placeholder='Zacznij pisać' onChange={(e) => setTextArea(e.target.value)}>
            </textarea>
            <Typography>
                {textArea}
            </Typography>
        </Grid>

        <Box>
            <Typography>
            <b>Cat fact from API:</b>  {catFact}
            </Typography>
        </Box>
        
    </>
  )
}

Clicker.prototypes = {
    text: PropTypes.string
}

Clicker.defaultProps = {
    text: "STOP PLEASE..."
}
export default Clicker