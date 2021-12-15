import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Radio ,RadioGroup, FormControl, FormLabel, FormControlLabel } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: [], mode: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: []});
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, username: user?.result?.username }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData }));
      clear();
    }
  };

  if (!user?.result?.username) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          <a href='/auth'>Sign In</a> to create your own Post or like another Post.
        </Typography>
      </Paper>
    );
  }

  const handleAdd = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDelete = (tagToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== tagToDelete) });
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post?.title}"` : 'Creating a Post'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <div style={{ paddingBottom: '10px', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(tag) => handleAdd(tag)}
            onDelete={(tag) => handleDelete(tag)}
          />
        </div>

        <FormControl component="fieldset" className={classes.radio}>
          <FormLabel component="legend">Game Mode</FormLabel>
          <RadioGroup 
            row aria-label="mode" 
            name="controlled-radio-buttons-group"
            value={postData.mode}
            onChange={(e) => setPostData({ ...postData, mode: e.target.value })}>

            <FormControlLabel value="ranked" control={<Radio />} label="Ranked" />
            <FormControlLabel value="normal" control={<Radio />} label="Normal" />
            <FormControlLabel value="aram" control={<Radio />} label="ARAM" />
            <FormControlLabel value="event" control={<Radio />} label="Event" />
          </RadioGroup>
        </FormControl>

        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;