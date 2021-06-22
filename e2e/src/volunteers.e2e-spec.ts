import {browser, by, element} from 'protractor';
import { usersReducer} from '../../src/app/store/reducers/UserReducer';

describe('Volunteer component test', () => {

  let volunteersBefore;
  let volunteersAfter;

  beforeEach(async () => {
    await browser.waitForAngularEnabled(false);

    // Login to firebase, very important
    await browser.get('/login');
    await element(by.id('username')).sendKeys('test@email.dk');
    await element(by.id('password')).sendKeys('test123');
    await element(by.id('btnUserLogin')).click();
    await browser.sleep(1000);
  });

  it('Should create volunteer application', async () => {
    await element(by.id('volunteers')).click().then(async () => {
      await browser.sleep(500);
      // Get list size
      // tslint:disable-next-line:only-arrow-functions typedef
      await element(by.css('h5')).getText().then(function(text) {
        volunteersBefore = Number(text);
      });

      // Fill form and create new volunteer
      // browser.get('/volunteers/newVolunteer'); // Will reload page
      await element(by.id('newVolunteerBtn')).click();
      element(by.id('firstName')).sendKeys('testETE');
      element(by.id('lastName')).sendKeys('testETE');
      element(by.id('username')).sendKeys('e2eTest');
      element(by.id('email')).sendKeys('e2e@mail.com');
      await element(by.id('save')).click().then(async () => {
        await browser.sleep(500);

        // Get list size
        // tslint:disable-next-line:only-arrow-functions typedef
        await element(by.css('h5')).getText().then(function(text) {
          volunteersAfter = Number(text);
        });

        console.log(volunteersBefore);
        console.log(volunteersAfter);

        // check if result is the expected
        expect(volunteersAfter).toEqual(volunteersBefore + 1);
      });
    });
  });

  it('Should move application to volunteer', async () => {
    await element(by.id('volunteers')).click().then(async () => {
      await browser.sleep(500);
      // Get list size
      // tslint:disable-next-line:only-arrow-functions typedef
      await element(by.css('h4')).getText().then(function(text) {
        volunteersBefore = Number(text);
      });

      await element(by.id('testAccept')).click().then(async () => {
        await browser.sleep(1000);
        // tslint:disable-next-line:only-arrow-functions typedef
        await element(by.css('h4')).getText().then(function(text) {
          volunteersAfter = Number(text);
        });
        expect(volunteersAfter).toEqual(volunteersBefore + 1);
      });
    });
  });

  it('Should move volunteer to application', async () => {
    await element(by.id('volunteers')).click().then(async () => {
      await browser.sleep(500);
      // Get list size
      // tslint:disable-next-line:only-arrow-functions typedef
      await element(by.css('h4')).getText().then(function(text) {
        volunteersBefore = Number(text);
      });

      await element.all(by.id('testDecline')).last().click().then(async () => {
        await browser.sleep(1000);
        // tslint:disable-next-line:only-arrow-functions typedef
        await element(by.css('h4')).getText().then(function(text) {
          volunteersAfter = Number(text);
        });
        expect(volunteersAfter).toEqual(volunteersBefore - 1);
      });
    });
  });
});
