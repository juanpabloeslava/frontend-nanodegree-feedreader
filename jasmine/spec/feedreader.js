/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
        * allFeeds variable has been defined and that it is not
        * empty. Experiment with this before you get started on
        * the rest of this project. What happens when you change
        * allFeeds in app.js to be an empty array and refresh the
        * page?
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* TODO: Write a test that loops through each feed
        * in the allFeeds object and ensures it has a URL defined
        * and that the URL is not empty.
        */
        it('have URL', function () {
            for (const indFeed of allFeeds) {
                // should be defined
                expect(indFeed.url).toBeDefined();
                // should not be empty
                expect(indFeed.url.length).not.toBe(0);
                // just to be sure, write on console
                console.log (`indFeed.url:  ${indFeed.url}`);
            }
        });
        /* TODO: Write a test that loops through each feed
        * in the allFeeds object and ensures it has a name defined
        * and that the name is not empty.
        */
        it('have Name', function () {
            for (const indFeed of allFeeds) {
                // should be defined
                expect(indFeed.name).toBeDefined();
                // should not be empty
                expect(indFeed.name.length).not.toBe(0);
                // just to be sure, write on console
                console.log (`indFeed.name:  ${indFeed.name}`);
            }
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {
        let feedContainer = document.querySelector('body');
        let menuIcon = document.querySelector('.menu-icon-link');
        /* TODO: Write a test that ensures the menu element is
        * hidden by default. You'll have to analyze the HTML and
        * the CSS to determine how we're performing the
        * hiding/showing of the menu element.
        */
        it('is hidden by default', function () {
            // the menu is hidden by adding a class to the body, 
            // so we'll check if it has that class
            // expect(feedContainer.hasClass('menu-hidden')).toBe(true);
            expect(feedContainer.className).toContain('menu-hidden');
        });
        
        /* TODO: Write a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
       it('changes visibility on click', function () {
            // click a first time and check
            menuIcon.click();
            expect(feedContainer.className).not.toContain('menu-hidden');
            // click a second time and check
            menuIcon.click();
            expect(feedContainer.className).toContain('menu-hidden');
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        /* TODO: Write a test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * Remember, loadFeed() is asynchronous so this test will require
        * the use of Jasmine's beforeEach and asynchronous done() function.
        */
        beforeEach( function (done) {
            // uses the done() to tell the beforeEach that the other action has been finished
            loadFeed(0, function () {
                // make sure loadFeed is done before getting on with the following things
                done();
            });
        });

        it('has at least one entry', function () {
            // all .entry elements inside .feed elements in DOM
            // let entries = $('.feed .entry');
            let entries = document.querySelector('.feed').getElementsByClassName('entry');
            // test: there should be at least 1 of those elements in DOM, indicating 
            // that the loadFeed function was properly done
            expect(entries.length).toBeGreaterThan(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        /* TODO: Write a test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous.
        */
        let firstFeed;
        let secondFeed;
       
        beforeEach( function (done) {
            // call loadFeed() for a first time
            loadFeed(0, function () {
                // store the first feed into the firsFeed variable
                firstFeed = document.querySelector('.feed').innerHTML;
                // call loadFeed() again
                loadFeed(1, function () {
                    secondFeed = document.querySelector('.feed').innerHTML;
                    // call the done() after everything needed is already on the DOM
                    done();
                });
            });
        });
        // test if the content of each feed is different (just compare the variables)
        it('feeds are different from one another', function () {
            expect(firstFeed).not.toBe(secondFeed);
        });
    });

}());
