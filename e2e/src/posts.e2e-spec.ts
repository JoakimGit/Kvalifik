import { browser, element, by } from "protractor";
import { AppPage } from "./app.po";



describe('Posts section', () => {
  
  beforeEach(async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get('/');  // reload your SPA
  });

it('Navigate to the edit post page', async() => {
    await element(by.css(".e2e-posts")).click();    
    await element.all(by.css(".e2e-edit")).first().click();
    await browser.sleep(100);
    
    expect(await element(by.css("h3")).getText()).toEqual("Edit Post");
  });

  it('Navigate to the new post page', async() => {
    await element(by.css(".e2e-posts")).click();    
    await element(by.id('newPostBtn')).click();
    
    expect(await element(by.css("h3")).getText()).toEqual("Create New Post");
  });

  it('Create new post', async() => {
    await element(by.css(".e2e-posts")).click();
    const postsBeforeAdding = await element.all(by.css(".e2e-edit")).count();

    await element(by.id('newPostBtn')).click();
    await element(by.id('title')).sendKeys('Space');
    await element(by.id('text')).sendKeys('This is about space');
    await element(by.id('save')).click();
    const postsAfterAdding = await element.all(by.css(".e2e-edit")).count();

    expect(postsAfterAdding).toEqual(postsBeforeAdding + 1);
  });

  it('Delete post', async() => {
    await element(by.css(".e2e-posts")).click();    
    const postsBeforeDelete = await element.all(by.css(".e2e-edit")).count();
    await element.all(by.css(".e2e-delete")).first().click();
    const postsAfterDelete = await element.all(by.css(".e2e-edit")).count();

    expect(postsAfterDelete).toEqual(postsBeforeDelete - 1);
  });
});