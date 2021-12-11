import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import { getPosts, getPostsBySearch } from '../actions/posts';
import useStyles from './styles';

const Paginate = ({ page, search, tags, isSearch }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (page) {
      if(isSearch) {
        dispatch(getPostsBySearch({ page, search, tags: tags.join(',') }));
      } else {
        dispatch(getPosts(page));
      }
    }
  }, [dispatch, page]);

  return (
    <>
    {/* Cannot use if-else statement inside JSX render */}
    {isSearch
    ? (<Pagination
        classes={{ ul: classes.ul }}
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
          <PaginationItem {...item} component={Link} to={`/posts/search?page=${item.page}&searchQuery=${search || 'none'}&tags=${tags.join(',')}`} />
        )}/>)
    : (<Pagination
        classes={{ ul: classes.ul }}
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
          <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
        )}/>)
    }
    </>
  );
};

export default Paginate;