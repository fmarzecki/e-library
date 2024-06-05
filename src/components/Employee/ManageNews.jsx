import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  IconButton,
  ListItemSecondaryAction,
  Paper,
  Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Notification from '../Alert/Notification';

const ManageNews = () => {
  const [news, setNews] = useState([]);
  const [editingPost, setEditingPost] = useState({ workerId: 1, postId: 1, name: '', contents: '', imageUrl: '' });
  const [newPost, setNewPost] = useState({ workerId: 1, name: '', contents: '', imageUrl: '' });
  const [notification, setNotification] = useState(null);
  const [editingPostIndex, setEditingPostIndex] = useState(null);

  // POBIERANIE DANYCH Z BAZY
  const fetchNews = async () => {
    try {
      let apiKey = localStorage.getItem('apiKey')
      const response = await axios.get(`http://localhost:8080/worker/getNewsPosts/apiKey=${apiKey}`);
      setNews(response.data.data["News posts: "]);
    } catch (error) {
      console.error(error);
      setNotification({ message: 'Nie udało się pobrać wiadomości.', severity: 'warning' });
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);


  const handleDelete = async (idPost) => {
    try {
      let apiKey = localStorage.getItem('apiKey')
      await axios.delete(`http://localhost:8080/worker/deleteNewsPost/postId=${idPost}/apiKey=${apiKey}`);
      setNotification({ message: 'Udało się usunąć ogłoszenie.', severity: 'success' });
    } catch (error) {
      setNotification({ message: 'Nie udało się zaktualizować ogłoszenie.', severity: 'warning' });
      console.error(error);
    }
  };


  const handleSave = async () => {
    try {
      let apiKey = localStorage.getItem('apiKey')
      await axios.put(`http://localhost:8080/worker/updateNewsPost/apiKey=${apiKey}`, editingPost);
      setNotification({ message: 'Udało się zaktualizować ogłoszenie.', severity: 'success' });
      fetchNews();
      setEditingPost(prevState => ({
        ...prevState,
        contents: '',
        name: ''}));
      setEditingPostIndex(-1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (index, post) => {
    setEditingPostIndex(index);
    setEditingPost(prevState => ({
      ...prevState,
      postId: index,
      contents: post.contents,
      name: post.name}));
  };

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setEditingPost(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleNewPostChange = (event, field) => {
    const { value } = event.target;
    setNewPost(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      let apiKey = localStorage.getItem('apiKey')
      await axios.post(`http://localhost:8080/worker/addNewsPost/apiKey=${apiKey}`, newPost);
      setNotification({ message: 'Udało się dodać ogłoszenie.', severity: 'success' });
      setNewPost({
        workerId: 1,
        name: '',
        contents: '',
        imageUrl: ''
      });
    } catch (error) {
      console.log("To jest error: ", error);
      setNotification({ message: 'Nie udało się dodać ogłoszenia.', severity: 'warning' });
    }
  };

  return (
    <>
      {notification && (
        <Notification message={notification.message} severity={notification.severity} setOpenProp={setNotification} />
      )}
      <Grid container>
        <Grid item xs={12} sm={12} md={12} sx={{ marginBottom: "20px"}} minWidth={200}>
          <Paper sx={{ padding: "1rem", margin: 'auto', width: "80%", }}>
          <Typography variant="h6" gutterBottom>
            Dodaj ogłoszenie
          </Typography>
          <div>
            <TextField
              label="Tytuł"
              value={newPost.name}
              onChange={(e) => handleNewPostChange(e, 'name')}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Zawartość"
              value={newPost.contents}
              onChange={(e) => handleNewPostChange(e, 'contents')}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
            <Button onClick={handleAddPost} color="primary" variant="contained">Dodaj</Button>
          </div>
        </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} minWidth={200}>
          <Paper sx={{ padding: "1rem", margin: 'auto', width: "80%", }}>
          <Typography variant="h6" gutterBottom>
            Ogłoszenia
          </Typography>
          <div>
          {news.map((post) => (
            <Accordion key={post.postId}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${post.postId}-content`}
                id={`panel${post.postId}-header`}
                sx={{ fontWeight: 'bold' }}
              >
                {post.name}
              </AccordionSummary>
              <AccordionDetails>
                {editingPostIndex === post.postId ? (
                  <div>
                    <TextField
                      fullWidth
                      label="Nazwa"
                      value={editingPost.name}
                      onChange={(e) => handleInputChange(e, 'name')}
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      label="Zawartość"
                      value={editingPost.contents}
                      onChange={(e) => handleInputChange(e, 'contents')}
                      multiline
                      rows={4}
                      margin="normal"
                    />
                    <Button onClick={() => handleSave()} color="primary" startIcon={<SaveIcon />}>Zapisz</Button>
                    <Button onClick={() => setEditingPostIndex(null)} color="secondary">Anuluj</Button>
                  </div>
                ) : (
                  <div>
                    <Typography>{post.contents}</Typography>
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => handleDelete(post.postId)} edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(post.postId, post)} edge="end" aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </div>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
          </div>
        </Paper>
        </Grid>
      </Grid>
    </>
  );
}
export default ManageNews;
