import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Grid } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';

import Comments from './Comments.js';
import Post from '../Posts/Post/Post';
import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
import image from '../../images/5v5.jpg';

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      // get all posts that uses the same game mode and tags.
      dispatch(getPostsBySearch({ search: post?.mode, tags: post?.tags.join(',') }));
    }
  }, [post]);

  if (!post) return null;

  const openUser = (userID) => history.push(`/user/${userID}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  // filter out User of main post from recommeneded posts.
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id).slice(0,4);

  return (
    <Paper style={{ margin: '1em auto', padding: '1em', borderRadius: '15px', maxWidth: '1400px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.mode.toUpperCase()}: {post?.title}</Typography>
          <Typography variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography variant="h6">Created by: <span style={{cursor: 'pointer', textDecoration: 'underline'}} onClick={() => openUser(post.creator)}>{post.username}</span></Typography>
          <Typography gutterBottom variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Typography variant="body1" component="p">{post.message}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          
          <Typography gutterBottom variant="h6">Comment Section</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Comments post={post} />

          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={image} alt='background' />
        </div>
      </div>

      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {!!recommendedPosts.length && (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {recommendedPosts?.map((post) => (
                <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                    <Post post={post} setCurrentId={id} />
                </Grid>
                ))}
            </Grid>
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;