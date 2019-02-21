import {
    initialStatePosts
} from "./state";

export default (state = initialStatePosts, action) => {

    switch (action.type) {
        case "REQUEST_ADD_POST":

            console.warn(action.post)

            if (state.posts.length > 0) {
                if (state.posts.filter(post => post.id === action.post.id).length > 0) {
                    posts = state.posts.map(post => post.id === action.post.id ? action.post : post)

                    return {
                        ...state,
                        posts
                    }
                }

            }


            return {
                ...state,
                posts: [...state.posts, action.post]
            };
            break;

        case "REQUEST_POSTS":

            return {
                ...state,
                posts: action.posts
            }
            break;

        case "REQUEST_DELETE_POST":
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.id)
            }
            break;

        default:
            return state
    }
    return state
}