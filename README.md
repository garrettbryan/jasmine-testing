###How to run the app:
    1. clone my master repository.
    2. evaluate index.html, app.js, feedreader.js
    3. open index.html in Chrome


###Modifications to js:
    1. updated the ajax callback in app.js to return an err value.
        1. null on success
        2. err object on error

###tests in feedreader.js:
    1. RSS Feeds
        1. allfeeds array is defined and greater than 0;
        2. allfeeds urls are valid.
        3. allFeeds names are valid.
    2. The Menu
        1. Check that the slide-menu element's right edge is off the left side of the screen, and that body has class menu-hidden.
        2. Check that the slide-menu element's left edge is on the left side of the screen, and that body does not have class menu-hidden after the button is clicked.
        3. Check that the slide menu element's right edge is off the left side of the screen, and that body has class menu-hidden after the button is clicked again.
    3. Initial Entries
        1. Check that the allFeeds.length is long enough
        2. At least one new entry element is in the feed container after a successful async feed return
    4. New Feed Selection
        1. Check that the allFeeds.length is long enough
        2. load first feed and save the first entry
        3. load second feed and save the first entry
        4. Compare first entries. If they are different then the new content was loaded.

###future tests and features
    1. RSS Feeds
        1. test: validate the feeds respond with content.
    2. The Menu
        1. feature: if feed is broken have icon indicating it is broken.
    3. Initial Entries
        1. feature: If initial feed is broken load next feed.
    4. New Feed Selection
        1. feature: display date of the entry

