import React, { useState, useEffect, useRef } from "react";
import { Typography, TextField, Button, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/posts.js';
import useStyles from './styles.js';

const Comments = ({ post }) => {
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');

    const classes = useStyles();
    const dispatch = useDispatch();
    const commentsRef = useRef();
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleComment = async () => {
        const updateComments = await dispatch(commentPost(`${user?.result?.username}: ${comment}`, post._id));

        setComment('');
        setComments(updateComments);

        // Use block: 'center' otherwise View is pushed to top or bottom of component container on smaller screens.
        commentsRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }

    return(
        <>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    {comments.map((comment, index) => (
                        <Typography key={index} style={{ wordWrap: "break-word" }} gutterBottom variant="subtitle1">
                            <strong>{comment.split(': ')[0]}: </strong> {comment.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>

                {user?.result?.username ? ''
                    : <Paper className={classes.paper}>
                        <Typography variant="h6" align="center">
                        <a href='/auth'>Sign In</a> to leave a comment.
                        </Typography>
                    </Paper> }
                
                {user?.result?.username && (
                    <div className={classes.commentsForm}>
                        <Typography gutterBottom variant="h6">Write a Comment</Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="Please enter a comment here."
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <br />
                        <Button style={{ marginTop: '10px' }}
                                fullWidth disabled={!comment.length}
                                color="primary"
                                variant="contained"
                                onClick={handleComment}>
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </>
    )
};

export default Comments;