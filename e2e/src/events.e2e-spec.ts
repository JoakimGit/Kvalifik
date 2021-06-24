import {browser, by, element} from 'protractor';

describe('Events component test', () => {

    beforeEach(async () => {
        await browser.waitForAngularEnabled(false);

        await browser.get('/login');
        await element(by.id('username')).sendKeys('test@email.dk');
        await element(by.id('password')).sendKeys('test123');
        await element(by.id('btnUserLogin')).click();
        await browser.sleep(1000);
    });

    /* it('Navigate to event details page', async () => {        
        await element(by.id('events')).click();
        await browser.sleep(1000);

        await element.all(by.css('.mat-row-link')).first().click();
        const headerTitle = await element(by.css("h2")).getText();

        expect(headerTitle).toEqual("Event details");
    }); */

    /* it('Create new event', async () => {
        await element(by.id('events')).click();
        await browser.sleep(1000);

        const rowsbefore = await element.all(by.css('tbody tr')).count();

        await element(by.id('newEventBtn')).click();      
        await element(by.id('title')).sendKeys('E2E Event');
        await element(by.id('startDate')).sendKeys('2021-06-24');
        await element(by.id('startTime')).sendKeys('09:00');
        await element(by.id('endDate')).sendKeys('2021-06-24');
        await element(by.id('endTime')).sendKeys('19:00');
        await element(by.id('location')).sendKeys('KEA');
        await element(by.id('description')).sendKeys('Test event for KEA E2E testing');
        await element(by.id('save')).click(); 

        const rowsAfter = await element.all(by.css('tbody tr')).count();

        expect(rowsAfter).toBe(rowsbefore + 1);
    }); */

    /* it('Delete event', async () => {
        await element(by.id('events')).click();
        await browser.sleep(1000);
        const rowsbefore = await element.all(by.css('tbody tr')).count();
        
        await element.all(by.css(".e2e-delete")).last().click();
        const rowsAfter = await element.all(by.css('tbody tr')).count();

        expect(rowsAfter).toBe(rowsbefore -1);
    });
 */
});