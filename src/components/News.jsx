import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { fontWeight } from '@mui/system';

function News() {
    const [catFact, setCatFact] = useState("");

    useEffect(() => {
        axios.get('https://catfact.ninja/fact')
            .then(response => {
            setCatFact(response.data.fact);
             })
            .catch(error => {
            console.error(error);
        });
    }, [])

  return (
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{fontWeight: 'bold'}}
            >
              <Typography bold>
                <b>Popularny streamer twitch.tv Jaskier sponsorem naszej biblioteki</b>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography >
                Kamil "Jaskier" Rojek, streamer, filantrop, zdecydował się wspierać działania naszej biblioteki, dzięki niemu, nasza strona internetowa zostanie odświeżona i unowocześniona.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              sx={{fontWeight: 'bold'}}
            >
              Braki w kabanosach...
            </AccordionSummary>
            <AccordionDetails>
              Bibliotekarze zaczynają narzekać na braki w kabanosach pobliskiego sklepu "Żabka", jak to określają "Nie ma co jeść".
            </AccordionDetails>
          </Accordion>
        </div>
      );
}

export default News