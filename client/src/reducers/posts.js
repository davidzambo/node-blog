const initialState = {
  posts: [],
  hasErrored: false,
  isLoading: false,
  isConfirmDeletePostModalOpen: false,
  postToHandle: {},
  isEdit: false,
}


export const posts = (state = initialState, action) => {
  switch (action.type) {
    case 'POSTS_HAS_ERRORED':
      return { ...state, hasErrored: action.payload };

    case 'POSTS_ARE_LOADING':
      return { ...state, isLoading: action.payload };

    case 'POSTS_FETCH_DATA_SUCCESS':
      return { ...state, posts: action.payload };

    case 'IS_CONFIRM_DELETE_POST_MODAL_OPEN': 
      return { ...state, isConfirmDeletePostModalOpen: action.payload };

    case 'POST_TO_HANDLE':
      return { ...state, postToHandle: action.payload };

    case 'IS_EDIT':
      return { ...state, isEdit: action.payload};

    default:
      return state;
  }
}

// const posts = (state = initialState, action) => {
//   switch (action.type){
//     case 'CREATE_POST':
//       console.log(action);
//       return {...state, 
//         posts: [...state.posts, action.payload]
//       };
//     case 'DESTROY_POST':
//       console.log(action);    
//       return {
//         ...state,
//         posts: [...state.posts].filter(post => post.id !== action.payload.id)
//       }
//     default:
//       return state;
//   }
// };

// export const postsHasErrored = (state = false, action) => {
//   switch (action.type){
//     case 'POSTS_HAS_ERRORED':
//       return action.hasErrored;

//     default:
//       return state;
//   }
// }


// export const postsAreLoading = (state = false, action) => {
//   switch (action.type) {
//     case 'POSTS_ARE_LOADING':
//       return action.isLoading;

//     default:
//       return state;
//   }
// }

// export const posts = (state = [], action) => {
//   switch (action.type) {
//     case 'POSTS_FETCH_DATA_SUCCESS':
//       return action.posts;

//     default:
//       return state;
//   }
// }

// export const postToDelete = (state = '', action) => {
//   switch (action.type){
//     case 'CONFIRM_DELETE_POST':
//       return action.postToDelete;
    
//     default:
//       return state;
//   }
// }

// export const isConfirmDeletePostModalOpen = (state = false, action) => {
//   switch (action.type){
//     case 'IS_CONFIRM_DELETE_POST_MODAL_OPEN':
//       return action.isConfirmDeletePostModalOpen;
//     default:
//       return state;
//   }
// }


// const posts = (state = initialState, action) => {
//   switch (action.type){
//     case 'CREATE_POST':
//       console.log(action);
//       return {...state, 
//         posts: [...state.posts, action.payload]
//       };
//     case 'DESTROY_POST':
//       console.log(action);    
//       return {
//         ...state,
//         posts: [...state.posts].filter(post => post.id !== action.payload.id)
//       }
//     default:
//       return state;
//   }
// };
