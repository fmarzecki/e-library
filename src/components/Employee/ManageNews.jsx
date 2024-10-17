import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
  Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Notification from '../Alert/Notification';
import { postRequest, putRequest, getRequest, deleteRequest } from '../utilities/api'; // Import the request functions

const ManageNews = () => {
  const [news, setNews] = useState([]);
  const [editingPost, setEditingPost] = useState({ postId: 1, name: '', contents: ''});
  const [newPost, setNewPost] = useState({ name: '', contents: '' });
  const [notification, setNotification] = useState(null);
  const [editingPostIndex, setEditingPostIndex] = useState(null);

  // Fetch news data from the backend
  const fetchNews = async () => {
    try {
      const response = await getRequest('/news/getAll');  // Updated to use getRequest
      setNews(response.data.data);
    } catch (error) {
      console.error(error);
      setNotification({ message: 'Failed to fetch news.', severity: 'warning' });
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (idPost) => {
    try {
        await deleteRequest(`/news/delete/${idPost}`); // Use the correct endpoint format
        setNotification({ message: 'News post deleted successfully.', severity: 'success' });
        fetchNews(); // Refresh the news list after deletion
    } catch (error) {
        console.error(error);
        setNotification({ message: 'Failed to delete news post.', severity: 'warning' });
    }
};
  const handleSave = async () => {
    try {
      await putRequest(`/news/update`, editingPost);
      setNotification({ message: 'News post updated successfully.', severity: 'success' });
      fetchNews();
      setEditingPost({ postId: 1, name: '', contents: ''});
      setEditingPostIndex(null);
    } catch (error) {
      console.error(error);
      setNotification({ message: 'Failed to update news post.', severity: 'warning' });
    }
  };

  const handleEdit = (index, post) => {
    setEditingPostIndex(index);
    setEditingPost({ postId: post.postId, name: post.name, contents: post.contents, imageUrl: post.imageUrl });
  };

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setEditingPost((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleNewPostChange = (event, field) => {
    const { value } = event.target;
    setNewPost((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      await postRequest(`/news/add`, newPost);
      setNotification({ message: 'News post added successfully.', severity: 'success' });
      setNewPost({ name: '', contents: ''});
      fetchNews();
    } catch (error) {
      console.error(error);
      setNotification({ message: 'Failed to add news post.', severity: 'warning' });
    }
  };

  return (
    <>
      {notification && <Notification message={notification.message} severity={notification.severity} setOpenProp={setNotification} />}
      <Grid container>
        <Grid item xs={12} sx={{ marginBottom: '20px' }}>
          <Paper sx={{ padding: '1rem', margin: 'auto', width: '80%' }}>
            <Typography variant="h6">Add News Post</Typography>
            <TextField label="Title" value={newPost.name} onChange={(e) => handleNewPostChange(e, 'name')} fullWidth margin="normal" />
            <TextField label="Content" value={newPost.contents} onChange={(e) => handleNewPostChange(e, 'contents')} fullWidth multiline rows={4} margin="normal" />
            <Button onClick={handleAddPost} color="primary" variant="contained">Add</Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ padding: '1rem', margin: 'auto', width: '80%' }}>
            <Typography variant="h6">News Posts</Typography>
            {news.map((post) => (
              <Accordion key={post.postId}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  {post.name}
                </AccordionSummary>
                <AccordionDetails>
                  {editingPostIndex === post.postId ? (
                    <div>
                      <TextField label="Title" value={editingPost.name} onChange={(e) => handleInputChange(e, 'name')} fullWidth margin="normal" />
                      <TextField label="Content" value={editingPost.contents} onChange={(e) => handleInputChange(e, 'contents')} fullWidth multiline rows={4} margin="normal" />
                      <Button onClick={handleSave} color="primary" startIcon={<SaveIcon />}>Save</Button>
                      <Button onClick={() => setEditingPostIndex(null)} color="secondary">Cancel</Button>
                    </div>
                  ) : (
                    <div>
                      <Typography>{post.contents}</Typography>
                      <IconButton onClick={() => handleDelete(post.postId)} edge="end" aria-label="delete"><DeleteIcon /></IconButton>
                      <IconButton onClick={() => handleEdit(post.postId, post)} edge="end" aria-label="edit"><EditIcon /></IconButton>
                    </div>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ManageNews;
