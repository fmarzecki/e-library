import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function News() {
    const [news, setNews] = useState([
      {name: "Blad wczytywania danych", contents: "Blad wczytywania danych"},
    ]);

    useEffect(() => {
      axios.get('http://localhost:8080/worker/getNewsPosts')
          .then(response => {
            console.log(response)
          setNews(response.data.data["News posts: "]);
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
                {post.contents}
                {post.contents}
              </AccordionDetails>
            </Accordion>
          )})}
        </div>
      );
}

export default News