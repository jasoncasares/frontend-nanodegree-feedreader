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

        describe('all RSS Feeds', function() {
            allFeeds.forEach(function(allFeeds) {
                it('has URL defined', function() {
                    expect(allFeeds.url).toBeDefined();
                    expect(allFeeds.url.length).not.toBe(0);
                });

                it('has name defined', function() {
                    expect(allFeeds.name).toBeDefined();
                    expect(allFeeds.name.length).not.toBe(0);
                });
            });
         });
    });

    describe('The menu', function() {

        it('should hide menu element by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('shows when menu icon is clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
        });

        it('hides when menu icon is clicked again', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {
    
        beforeEach(function(done) {
            loadFeed(0,done);
        });

        it('should have a single .entry within .feed container', function(done) {
            expect($('.feed .entry').children().length).not.toBe(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                title = $(".feed .entry h2").text();
                loadFeed(2, function() {
                    done();
                });
            });
        });

        it('has other content', function(done) {
            expect($(".feed .entry h2").text()).not.toBe(title);
            done();
        });

        afterAll(function(done) {
            loadFeed(0,done);
        });
    });
}());