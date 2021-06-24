import { tassign } from 'tassign';
import { PostState } from '../Store';
import { PostActions } from '../actions/PostActions';
import { Post } from 'src/app/entities/Post';

const comments = [{id: '1', text: 'No'}, {id:'2', text: 'way'}];
export const posts = [
    {id: '1', createdDate: new Date(2021, 0, 2), title: 'Is there life out there', text: 'Something' } as Post,
    {id: '2', createdDate: new Date(2021, 1, 2), title: 'Do androids dream of electric sheep?', text: 'Something' } as Post,
    {id: '3', createdDate: new Date(2021, 2, 2), title: 'What other good questions are there?', text: 'Something' } as Post,
    {id: '4', createdDate: new Date(2021, 3, 2), title: 'How many stars are there in the visible universe?', text: 'Something' } as Post,
    {id: '5', createdDate: new Date(2021, 4, 2), title: 'What lies beyond the visible universe?', text: 'Something', comments: comments} as Post
];

const INITIAL_STATE: PostState = {posts: posts};

export function postsReducer(state: PostState = INITIAL_STATE, action: any) {
 switch (action.type) {
    case PostActions.READ_POSTS:
        return tassign(state, {posts: action.payload});

    case PostActions.UPDATE_POST:
        const newArray = [...state.posts]; // copy of the array.
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        newArray[index] = action.payload;        
        
        return tassign(state, {posts: newArray});

        
    case PostActions.ADD_POST:
        return tassign(state, {posts: state.posts.concat(action.payload)});
        // return tassign(state, {posts: [...state.posts, action.payload]});
    
    case PostActions.DELETE_POST:
        let arrayCopy = [...state.posts];
        arrayCopy = arrayCopy.filter(post => post.id !== action.payload);
        return tassign(state, {posts: arrayCopy});

    default:
        return state;
    }
}
