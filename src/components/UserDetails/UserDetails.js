import React, { useState, useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Grid } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { getPostsByUser } from '../../actions/posts';
import Post from '../Posts/Post/Post';
import useStyles from './styles';
import image from '../../images/party.jpg';
import { fetchUser } from '../../api/index';

function UserDetails() {
    const { posts, isLoading } = useSelector((state) => state.posts);
    const [user, setUser] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();

    useEffect(async() => {
        try {
            const { data } = await fetchUser(id);
            setUser(data);

            dispatch(getPostsByUser(id));
        } catch (error) {
            console.log(error);
        }
    }, [id]);

    if (isLoading) {
        return (
        <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size="7em" />
        </Paper>
        );
    }

    return (
        <Paper style={{ margin: '1em auto', padding: '1em', borderRadius: '15px', maxWidth: '1400px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{user['username']}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography gutterBottom variant="body1" component="p"> TODO: User description/message </Typography>
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={image} alt='background' />
                </div>
            </div>

            <Typography gutterBottom variant="h5">{user['username']}'s Post: </Typography>
            <Divider style={{ margin: '1em 0' }}/>
            {!!posts.length && (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts?.map((post) => (
                <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                    <Post post={post} setCurrentId={id} />
                </Grid>
                ))}
            </Grid>
            )}
        </Paper>
    );
}

export default UserDetails
