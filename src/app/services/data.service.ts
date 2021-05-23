import { Injectable } from '@angular/core';
import { Post } from '../entities/Post';
import { Event } from '../entities/Event';
import {formatDate} from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private posts: Post[] = [
    {id: '1', createdDate: new Date(2021, 0, 2), title: 'Is there life out there', text: 'Something' } as Post,
    {id: '2', createdDate: new Date(2021, 1, 2), title: 'Do androids dream of electric sheep?', text: 'Something' } as Post,
    {id: '3', createdDate: new Date(2021, 2, 2), title: 'What other good questions are there?', text: 'Something' } as Post,
    {id: '4', createdDate: new Date(2021, 3, 2), title: 'How many stars are there in the visible universe?', text: 'Something' } as Post,
    {id: '5', createdDate: new Date(2021, 4, 2), title: 'What lies beyond the visible universe?', text: 'Something' } as Post,
  ];

  private events: Event[] = [
    {id: '1', title: 'Flashmob', startDate: new Date(2021, 5, 4), endDate: new Date(2021, 5, 4), startTime: '14:00', endTime: '17:00', description: 'Sudden flashmob dancing to Michael Jackson.', location: 'City square'} as Event,
    {id: '2', title: 'Graffiti', startDate: new Date(2021, 5, 9), endDate: new Date(2021, 5, 9), startTime: '10:00', endTime: '15:00', description: 'Doing parkour around the city.', location: 'Copenhagen'} as Event,
    {id: '3', title: 'Summer house trip', startDate: new Date(2021, 5, 18), endDate: new Date(2021, 5, 24), startTime: '12:00', endTime: '22:00', description: 'Trip with family to a summer house on Møn island.', location: 'Central station'} as Event
  ]

  constructor() { }

  public getEvents() {
    // formatDate(new Date(2021, 5, 4), 'dd-MM-yyyy', 'da')
    return this.events;
  }

  public getPosts() {
    return this.posts;
  }

  public addPost(post: Post) {
    // do something to add a new post
    this.posts.push(post);
  }

  public deletePost(id: any) {
    // delete a post
    const index = this.posts.map(post => post.id).indexOf(id);
    this.posts.splice(index, 1);
  }
}
