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
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have valid urls', function() {
            allFeeds.forEach(function(feed){
              expect(feed.url).toBeDefined();
              expect(feed.url.length).not.toBe(0);
              expect(feed.url).toMatch(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
            });
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have non-empty names', function() {
            allFeeds.forEach(function(feed){
              expect(feed.name).toBeDefined();
              expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* A test suite named "The menu" */
    describe('The Menu', function(){
        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         * Verify that the body has the menu-hidden class on
         * start and that the element is off the screen
         */
        it('starts hidden', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
            expect($('.slide-menu').position().left + $('.slide-menu').width()).toBeLessThan(0);
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('slides out when button is clicked', function(){
            expect($('body').hasClass('menu-hidden')).toBe(false);
            expect($('.slide-menu').position().left).toBe(0);
        });
        it('slides in when button is clicked again', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
            expect($('.slide-menu').position().left + $('.slide-menu').width()).toBeLessThan(0);
        });

        /* Trigger clicks and wait for the transitions to complete between specs before testing the expectations.
        */
        afterEach(function(done){
            $('.icon-list').trigger('click');
            $('.slide-menu').on( 'transitionend', function() {
                $('.slide-menu').off( 'transitionend');
                done();
            });
        });

        /* Rehide the menu before continuing. */
        afterAll(function(){
          $('body').addClass('menu-hidden');
        });

    });



    /* A test suite named "Initial Entries" */
    describe('Initial Entries', function(){
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done){
          loadFeed(1, function(err){
                expect(err).toBeNull();
                done();
            });
        });

        it('is greater than one after loadFeed', function(done){
            expect($('.feed').children().length).toBeGreaterThan(0);
            done();
        });
    });



    /* A test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        var newChild, originalChild;

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('allFeeds.length must be greater than 3', function(done){
            expect(allFeeds.length).toBeGreaterThan(3);
            done();
        });
        it('load the first feed', function(done){
            loadFeed(2, function(err){
                expect(err).toBeNull();
                expect($('.feed').children().length).toBeGreaterThan(0);
                originalChild = $('.feed')[0].innerText;
                done();
            });
        });
        it('load the second feed', function(done){
            loadFeed(3, function(err){
                expect(err).toBeNull();
                expect($('.feed').children().length).toBeGreaterThan(0);
                newChild = $('.feed')[0].innerText;
                done();
            });
        });

        it('updates the content on the page', function(){
            expect(originalChild).not.toEqual(newChild);
        });
    });


}());
