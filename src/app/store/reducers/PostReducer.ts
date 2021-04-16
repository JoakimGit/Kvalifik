import { tassign } from 'tassign';
import { PostState } from '../Store';
import { PostActions } from '../actions/PostActions';
import { Post } from 'src/app/entities/Post';
import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from '@angular/platform-browser-dynamic';

export const posts = [
    {id: '1', createdDate: new Date(2021, 0, 2), title: 'Is there life out there', text: 'Something' } as Post,
    {id: '2', createdDate: new Date(2021, 1, 2), title: 'Do androids dream of electric sheep?', text: 'Something' } as Post,
    {id: '3', createdDate: new Date(2021, 2, 2), title: 'What other good questions are there?', text: 'Something' } as Post,
    {id: '4', createdDate: new Date(2021, 3, 2), title: 'How many stars are there in the visible universe?', text: 'Something' } as Post,
    {id: '5', createdDate: new Date(2021, 4, 2), title: 'What lies beyond the visible universe?', text: 'Something' } as Post
];

const INITIAL_STATE: PostState = {isHappy: true, posts: posts};

export function postsReducer(state: PostState = INITIAL_STATE, action: any) {
 switch (action.type) {
    case PostActions.UPDATE_POST:
        // [{id:'1',...},{2},{3},{4},{5}]
        // [{1},{2},{3new},{4},{5}]
        //state.posts[2] = action.payload; // mutate the original array.
        const newArray = [...state.posts]; // copy of the array.
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        newArray[index] = action.payload;
        return tassign(state, {posts: newArray});

        
    case PostActions.ADD_POST:
        // add the action.payload (post) to the array of posts, but without mutating the array.
<<<<<<< HEAD
        return tassign(state, {posts: state.posts.concat(action.payload)});
        // return tassign(state, {posts: [...state.posts, action.payload]});
    
    case PostActions.DELETE_POST:
        let arrayCopy = [...state.posts];
        arrayCopy = arrayCopy.filter(post => post.id !== action.payload);
        return tassign(state, {posts: arrayCopy});
=======
        // state.posts.push(action.payload);
        // return state;

        // return tassign(state, {posts: state.posts.concat(action.payload)});
        return tassign(state, {posts: [...state.posts, action.payload]});
>>>>>>> 80a5006a1c6b2280f19415677064299c5b4cfcff

  case PostActions.SET_HAPPY:
    // action.payload = true/false
    // state.isHappy = action.payload; // mutating the old state object.
    // return Object.assign({}, state, {isHappys: action.payload});

    // state.isHappy = action.payload;
    // return state;
    return tassign(state, { isHappy: action.payload });

   default:
    return state;
}
}
