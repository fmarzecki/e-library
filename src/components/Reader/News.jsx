import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function News() {
    const [news, setNews] = useState([
      {name: "Poszukiwane wolontariusze do biblioteki!", content: "Szukamy entuzjastycznych wolontariuszy, którzy chcieliby pomóc w naszej bibliotece! Jeśli kochasz książki i masz trochę czasu wolnego, dołącz do naszego zespołu. Oferujemy przyjazne środowisko pracy i możliwość rozwijania umiejętności."},
      {name: "Konkurs czytelniczy dla dzieci i młodzieży!", content: "Zapraszamy wszystkie dzieci i młodzież do wzięcia udziału w naszym konkursie czytelniczym! Czytanie to nie tylko przyjemność, ale także sposób na rozwój intelektualny. Przyjdź do naszej biblioteki, zarejestruj się i bierz udział w wyzwaniach czytelniczych."},
      {name: "Warsztaty pisania dla osób w każdym wieku!", content: "Marzysz o napisaniu własnej książki? Chcesz poprawić swoje umiejętności pisarskie? Dołącz do naszych warsztatów pisania organizowanych w bibliotece! "},
    ]);

    useEffect(() => {
        axios.get('http://localhost:8080/news/getFirstTen')
            .then(response => {
            setNews(response.data.data.news);
             })
            .catch(error => {
            console.error(error);
        });
    }, [])

  return (
        <div>
          {news.map( post => {
            return (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{fontWeight: 'bold'}}>
                {post.name}
              </AccordionSummary>
              <AccordionDetails>
                {post.content}
              </AccordionDetails>
            </Accordion>
          )})}
        </div>
      );
}

export default News