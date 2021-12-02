import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from '@material-ui/core';
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

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return(
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comment Section</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} style={{ wordWrap: "break-word" }} gutterBottom variant="subtitle1">
                            <strong>{c.split(': ')[0]}: </strong> {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                
                {user?.result?.username && (
                    <div style={ {width: '70%'}}>
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
        </div>
    )
};

export default Comments;