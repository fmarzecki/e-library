import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getRequest } from '../utilities/api'; // Adjust the path as necessary

function News() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await getRequest('/news/getAll'); // Use your defined getRequest function

                if (response.data.success) {
                    setNews(response.data.data); // Assuming the data structure is correct
                } else {
                    throw new Error('Failed to fetch news');
                }
            } catch (err) {
                console.error(err);
                setError('Error fetching news posts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {news.map(post => (
                <Accordion key={post.postId}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ fontWeight: 'bold' }}>
                        {post.name}
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>{post.contents}</div>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}

export default News;
