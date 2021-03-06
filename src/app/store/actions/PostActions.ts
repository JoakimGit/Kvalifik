import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './../Store';
import { Post } from 'src/app/entities/Post';
import { PostsService } from 'src/app/services/posts.service';

@Injectable({ providedIn: 'root'})
export class PostActions {

    constructor (private ngRedux: NgRedux<AppState>, private postService: PostsService)
    {}

  static ADD_POST: string = 'ADD_POST';
  static UPDATE_POST: string = 'UPDATE_POST';
  static READ_POSTS: string = 'READ_POSTS';
  static DELETE_POST: string = 'DELETE_POST';

  readPosts() {
    this.postService.readPosts().subscribe((result: any) => {
      console.log("result from server");
      console.log(result);

      let posts: Post[] = [];
      for(let id in result) {
        let postObj = result[id];
        postObj.id = id;

        posts.push(postObj as Post);
      }

      this.ngRedux.dispatch({
        type: PostActions.READ_POSTS,
        payload: posts
      });
    });
  }

  addPost(newPost: Post) : void {
    this.postService.savePost(newPost).subscribe((result: any) => {
      console.log("result from saving");
      console.log(result);

      newPost.id = result.name;

      this.ngRedux.dispatch({
        type: PostActions.ADD_POST,
        payload: newPost
      });
    });
  }

  updatePost(updatedPost: Post): void {
    this.postService.updatePost(updatedPost).subscribe(result => {
      console.log("Updating post");
      console.log(result);      
      
      this.ngRedux.dispatch({
        type: PostActions.UPDATE_POST,
        payload: updatedPost
      });
    });
  }

  deletePost(id: string) : void {
    this.postService.deletePost(id).subscribe({
      next: () => {
        console.log('Delete successful');
      },
      error: error => {
        console.error('There was an error!', error);
      }      
    });

    this.ngRedux.dispatch({
      type: PostActions.DELETE_POST,
      payload: id
    });
  }
}
