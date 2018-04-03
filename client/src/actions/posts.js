import axios from 'axios';

export const postToHandle = (post) => {
  const POST_TO_HANDLE = "POST_TO_HANDLE";
  return {
    type: POST_TO_HANDLE,
    payload: post
  };
}
/**
 * sets the posts state' isEdit flag to let the editor know it will be a new post or a post update 
 */
export const isEdit = (bool) => {
  return {
    type: 'IS_EDIT',
    payload: bool
  }
}

export const isConfirmDeletePostModalOpen = (bool) => {
  const IS_CONFIRM_DELETE_POST_MODAL_OPEN = "IS_CONFIRM_DELETE_POST_MODAL_OPEN";
  return {
    type: IS_CONFIRM_DELETE_POST_MODAL_OPEN,
    payload: bool
  };
}


export const deletePost = () => {
  return console.log('delete post');
}

export const postsHasErrored = (bool) => {
  const POSTS_HAS_ERRORED = "POSTS_HAS_ERRORED";
  return {
    type: POSTS_HAS_ERRORED,
    payload: bool
  };
}

export const postsAreLoading = (bool) => {
  const POSTS_ARE_LOADING = "POSTS_ARE_LOADING";
  return {
    type: POSTS_ARE_LOADING,
    payload: bool
  };
}
export const postsFetchDataSuccess = (posts) => {
  const POSTS_FETCH_DATA_SUCCESS = "POSTS_FETCH_DATA_SUCCESS";
  return {
    type: POSTS_FETCH_DATA_SUCCESS,
    payload: posts
  };
}

export const errorAfterFiveSeconds = () => {
  return (dispatch) => {
    setTimeout( () => {
      dispatch(postsHasErrored(true))
    }, 2000);
  };
}

export const postsFetchData = () => {
    return (dispatch) => {
        dispatch(postsAreLoading(true));
        axios.get('/api/posts')
            .then((response) => {
                console.log(response);
                if (response.status !== 200){
                    throw Error(response.statusText);
                }
                dispatch(postsAreLoading(false));
                return response;
            })
            .then((posts) => dispatch(postsFetchDataSuccess(posts.data.posts)))
            .catch(() => dispatch(postsHasErrored(true)));
  }
}

export const createPost = (data) => {
  return (dispatch) => {
    dispatch(postsAreLoading(true));
    axios.post('/api/posts', data)
      .then((response) => {
        if (response.status !== 200){
          throw Error(response.statusText);
        }
        dispatch(postsAreLoading(false));
        return response;
      })
      .then((posts) => {
        dispatch(postsFetchDataSuccess(posts.data.posts));
      })
      .catch((e) => {
          console.log(e);
          dispatch(postsHasErrored(true))
      });
  }
}

export const editPost = (post) => {
  return (dispatch) => {
    dispatch(postToHandle(post));
    dispatch(isEdit(true));
  }
}

export const updatePost = (post) => {
  return dispatch => {
    dispatch(postsAreLoading(true));
    axios.put('/api/posts/' + post._id, post)
      .then( response => {
        if (response.status !== 200)
          throw Error(response.statusText);
        dispatch(postsAreLoading(false));
        return (response);
      })
      .then( posts => {
        dispatch(postsFetchDataSuccess(posts.data.posts));
        dispatch(postToHandle({}));
        dispatch(isEdit(false));
      })
      .catch( () => dispatch(postsHasErrored(true)));
  }
}

export const cancelPostAction = () => {
  return dispatch => {
    dispatch(postToHandle({}));
    dispatch(isEdit(false));
  }
}