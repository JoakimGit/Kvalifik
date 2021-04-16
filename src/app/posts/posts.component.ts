import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Post } from '../entities/Post';
import { PostActions } from '../store/actions/PostActions';
import { AppState } from '../store/Store';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public tempData: Post[];
  public isHappy: boolean;
  
  constructor(private router: Router, private tempDataService: DataService,
    private ngRedux: NgRedux<AppState>, private postActions: PostActions) { }

  ngOnInit(): void {
    this.ngRedux.select(state => state.posts).subscribe(res => {
      this.isHappy = res.isHappy;
      this.tempData = res.posts;
    });
 
    // this.tempData = this.tempDataService.getPosts();
  }
  setHappy(happy: boolean) : void {
    this.postActions.setType(happy);
  }
  editPost(id: any) {
    this.router.navigate(['neweditpost', {myId: id}]);
  }

  deletePost(id: any) {
    this.postActions.deletePost(id);
  }

  
}
