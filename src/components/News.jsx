import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
              sx={{fontWeight: 'bold'}}>
                Poszukiwane wolontariusze do biblioteki!
            </AccordionSummary>
            <AccordionDetails>
              Szukamy entuzjastycznych wolontariuszy, którzy chcieliby pomóc w naszej bibliotece! Jeśli kochasz książki i masz trochę czasu wolnego, dołącz do naszego zespołu. Oferujemy przyjazne środowisko pracy i możliwość rozwijania umiejętności. 
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              sx={{fontWeight: 'bold'}}
            >
              Konkurs czytelniczy dla dzieci i młodzieży!
            </AccordionSummary>
            <AccordionDetails>
            Zapraszamy wszystkie dzieci i młodzież do wzięcia udziału w naszym konkursie czytelniczym! Czytanie to nie tylko przyjemność, ale także sposób na rozwój intelektualny. Przyjdź do naszej biblioteki, zarejestruj się i bierz udział w wyzwaniach czytelniczych.
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              sx={{fontWeight: 'bold'}}
            >
              Warsztaty pisania dla osób w każdym wieku!
            </AccordionSummary>
            <AccordionDetails>
            Marzysz o napisaniu własnej książki? Chcesz poprawić swoje umiejętności pisarskie? Dołącz do naszych warsztatów pisania organizowanych w bibliotece! 
            </AccordionDetails>
          </Accordion>


        </div>
      );
}

export default News