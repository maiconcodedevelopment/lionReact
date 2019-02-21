import {
    createStore,
    combineReducers
} from "redux"
import Posts from "./actions/Posts";

let ActionsCombine = combineReducers({
    posts: Posts
})

export let storeRedux = createStore(ActionsCombine)