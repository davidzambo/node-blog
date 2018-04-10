import axios from 'axios';

export const postToHandle = (post) => {
  const POST_TO_HANDLE = "POST_TO_HANDLE";
  return {
    type: POST_TO_HANDLE,
    payload: post
  };
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

export const setArchives = (archives) => {
    return {
        type: "SET_ARCHIVES",
        payload: archives
    }
};

export const fetchArchives = () => {
    return dispatch => {
        axios.get('/api/archives')
            .then( response => dispatch(setArchives(response.data.result)))
            .catch( err => console.log(err));
    }
}

// export const postsFetchData = () => {
//     return (dispatch) => {
//         dispatch(postsAreLoading(true));
//         axios.get('/api/posts')
//             .then((response) => {
//                 console.log(response);
//                 if (response.status !== 200){
//                     throw Error(response.statusText);
//                 }
//                 dispatch(postsAreLoading(false));
//                 return response;
//             })
//             .then((posts) => dispatch(postsFetchDataSuccess(posts.data.posts)))
//             .catch(() => dispatch(postsHasErrored(true)));
//   }
// }
//
// export const createPost = (data) => {
//   return (dispatch) => {
//     dispatch(postsAreLoading(true));
//     axios.post('/api/posts', data)
//       .then((response) => {
//         if (response.status !== 200){
//           throw Error(response.statusText);
//         }
//         dispatch(postsAreLoading(false));
//         return response;
//       })
//       .then((posts) => {
//         dispatch(postsFetchDataSuccess(posts.data.posts));
//       })
//       .catch((e) => {
//           console.log(e);
//           dispatch(postsHasErrored(true))
//       });
//   }
// }
