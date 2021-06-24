declare var require: any;
var deepFreeze = require('deep-freeze');
import { postsReducer, posts } from './../reducers/PostReducer';
import * as types from './../actions/PostActions';
import { Post } from 'src/app/entities/Post';

describe('posts reducer', () => {
    it('should return the initial state', () => {
        expect(postsReducer(undefined, {})).toEqual({posts: posts});
    });

    it('Add post', () => {
        const oldState = {posts: posts};
        const newPost = {id: '6', createdDate: new Date(2021, 4, 9), title: 'Space', text: 'Something about space' } as Post;
        const action = {type: types.PostActions.ADD_POST, payload: newPost};

        deepFreeze(oldState);

        const result = postsReducer(oldState, action);

        expect(result.posts.length).toEqual(oldState.posts.length + 1);
        expect(result.posts[result.posts.length-1]).toEqual(newPost);
    
    });

    it('Update post', () => {
        const oldState = {posts: posts};
        const updatedPost = {id: '3', createdDate: new Date(2021, 2, 2), title: 'What other good questions are there?', text: 'Perhaps something about dinosaurs'} as Post;
        const action = {type: types.PostActions.UPDATE_POST, payload: updatedPost};

        deepFreeze(oldState);

        const result = postsReducer(oldState, action);

        const index = result.posts.findIndex(post => post.id === updatedPost.id);

        expect(result.posts[index]).toEqual(updatedPost);
    });

    it('Delete post', () => {
        const oldState = {posts: posts};
        const idToRemove = "2";
        const action = {type: types.PostActions.DELETE_POST, payload: idToRemove};

        deepFreeze(oldState);

        const result = postsReducer(oldState, action);

        const post = result.posts.find(post => post.id === idToRemove);
        expect(post).toEqual(undefined);
        //console.log(oldState.posts);
        //console.log(result.posts);
        expect(result.posts.length).toEqual(oldState.posts.length -1);

    });
});
