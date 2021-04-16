import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './../Store';
import { Post } from 'src/app/entities/Post';

@Injectable({ providedIn: 'root'})
export class PostActions {

    constructor (private ngRedux: NgRedux<AppState>) 
    {} 

  static SET_HAPPY: string = 'SET_HAPPY'; 
  static ADD_POST: string = 'ADD_POST'; 
  static UPDATE_POST: string = 'UPDATE_POST'; 
  static DELETE_POST: string = 'DELETE_POST'; 

  setType(isHappy: boolean): void {
    
    this.ngRedux.dispatch({
        type: PostActions.SET_HAPPY,
        payload: isHappy
    });
  }

  addPost(newPost: Post) : void {
    this.ngRedux.dispatch({
        type: PostActions.ADD_POST,
        payload: newPost
    });
  }
  updatePost(updatedPost: Post) : void {
    this.ngRedux.dispatch({
        type: PostActions.UPDATE_POST,
        payload: updatedPost
    });
  }

  deletePost(id: string) : void {
    this.ngRedux.dispatch({
      type: PostActions.DELETE_POST,
      payload: id
    });
  }

}
