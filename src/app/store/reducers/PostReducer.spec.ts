declare var require: any;
var deepFreeze = require('deep-freeze');
import { postsReducer, posts } from './../reducers/PostReducer';
import * as types from './../actions/PostActions';
import { Post } from 'src/app/entities/Post';

describe('posts reducer', () => {
    it('should return the initial state', () => {
        expect(postsReducer(undefined, {})).toEqual({isHappy: true, posts: posts});
    });
    
    it('Toggle isHappy', () => {
        const oldState = {isHappy: true, posts: posts};
        const action = { type: types.PostActions.SET_HAPPY, payload: false };
        
        deepFreeze(oldState);
        
        const result = postsReducer(oldState, action);

        expect(result).toEqual({isHappy: false, posts: posts});
    });

<<<<<<< HEAD
    it('Add post', () => {
        const oldState = {isHappy: true, posts: posts};
        const newPost = {id: '6', createdDate: new Date(2021, 4, 9), title: 'Space', text: 'Something about space' } as Post;
        const action = {type: types.PostActions.ADD_POST, payload: newPost};

        deepFreeze(oldState);

        const result = postsReducer(oldState, action);

        expect(result.posts.length).toEqual(oldState.posts.length + 1);
        expect(result.posts[result.posts.length-1]).toEqual(newPost);
    
    });

    it('Update post', () => {
        const oldState = {isHappy: true, posts: posts};
        const updatedPost = {id: '3', createdDate: new Date(2021, 2, 2), title: 'What other good questions are there?', text: 'Perhaps something about dinosaurs'} as Post;
        const action = {type: types.PostActions.UPDATE_POST, payload: updatedPost};

        deepFreeze(oldState);

        const result = postsReducer(oldState, action);
        const id = updatedPost.id -1

        const index = result.posts.findIndex(post => post.id === updatedPost.id);

        expect(result.posts[index]).toEqual(updatedPost);
    });

    it('Delete post', () => {
        const oldState = {isHappy: true, posts: posts};
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
=======
    it('Add a new post to empty posts array', () => {
        const oldState = { isHappy: false, posts: [] }
        const newPost: Post = {
            id: 8888,
            createdDate: new Date(),
            title: "test title",
            text: "test text",
            media: "empty media",
            collections: [],
            comments: []
        };
        deepFreeze(oldState);

        const actionObj = { type: types.PostActions.ADD_POST, payload: newPost };
        
         // Act
        const result = postsReducer(oldState, actionObj);

        // Assert (expect)
        expect(result.posts).toHaveSize(oldState.posts.length+1);
        expect(result.posts[result.posts.length-1]).toEqual(newPost);
    });

    it('Add a new post to non-empty posts array', () => {
        // Arrange, Act, Assert

        //Arrange
        const oldState = { isHappy: false, posts: posts };
        const newPost: Post = {
            id: 8888,
            createdDate: new Date(),
            title: "test title",
            text: "test text",
            media: "empty media",
            collections: [],
            comments: []
        };
        deepFreeze(oldState);

        const actionObj = { type: types.PostActions.ADD_POST, payload: newPost };
        
         // Act
        const result = postsReducer(oldState, actionObj);

        // Assert (expect)
        expect(result.posts).toHaveSize(oldState.posts.length+1);
        expect(result.posts[result.posts.length-1]).toEqual(newPost);
        // console.log(result.posts);
    });

    it('update a post in the posts array', () => {
        const oldState = { isHappy: false, posts: posts }
        const updatedPost: Post = {
            id: '3', 
            createdDate: new Date(2021, 2, 2), 
            title: 'What other good questions are there?', 
            text: 'abc' 
        } as Post;
        
        deepFreeze(oldState);

        const actionObj = { type: types.PostActions.UPDATE_POST, payload: updatedPost };
        
         // Act
        const result = postsReducer(oldState, actionObj);
        const post = result.posts.find(post => post.id === updatedPost.id);

        // Assert (expect)
        expect(post.text).toEqual("abc");
    });

>>>>>>> 80a5006a1c6b2280f19415677064299c5b4cfcff
});
