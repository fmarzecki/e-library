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
  List,
  ListItem,
  ListItemText,
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
  const [editingPost, setEditingPost] = useState(null);
  const [newPost, setNewPost] = useState({ workerId: 1, name: '', contents: '', imageUrl: '' });
  const [notification, setNotification] = useState(null);
  const [editingPostIndex, setEditingPostIndex] = useState(null);

  // POBIERANIE DANYCH Z BAZY
  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:8080/worker/getNewsPosts');
      setNews(response.data.data["News posts: "]);
    } catch (error) {
      console.error(error);
      setNotification({ message: 'Nie udało się pobrać wiadomości.', severity: 'warning' });
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);


  const handleDelete = async (postId) => {
    try {
      console.log("Usuwam")
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:8080/worker/addNewsPost', editingPost);
      setNotification({ message: 'Udało się zaktualizować ogłoszenie.', severity: 'success' });
      fetchNews();
      setEditingPost({
        contents: '',
        name: ''
      })
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (index, post) => {
    setEditingPostIndex(index);
    setEditingPost(post);
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
      await axios.post('http://localhost:8080/worker/addNewsPost', newPost);
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
          {news.map((post, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
                sx={{ fontWeight: 'bold' }}
              >
                {post.name}
              </AccordionSummary>
              <AccordionDetails>
                {editingPostIndex === index ? (
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
                      <IconButton onClick={() => handleDelete(post.newsPostId)} edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(index, post)} edge="end" aria-label="edit">
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
