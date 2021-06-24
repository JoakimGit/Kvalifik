import { PostsPipe } from './posts.pipe';
import { TestBed } from '@angular/core/testing';
import { posts } from './store/reducers/PostReducer';

describe('PostsPipe', () => {
  let pipe = new PostsPipe();
  let myPosts = posts;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PostsPipe
      ],
    });
  });

  it('No search input returns full array', () => {    
    let result = pipe.transform(myPosts, '');    
    expect(result.length).toBe(myPosts.length);
  });

  it('One match returns 1 result', () => {
    let result = pipe.transform(myPosts, 'androids');
    expect(result.length).toBe(1);
  })

  it('No match returns empty array', () => {
    let result = pipe.transform(myPosts, 'grsghtshthf');
    expect(result.length).toBe(0);
  })


});
