'use strict';

const bookmarkList = function() {

    const render = function() {
        let entries = [...store.bookmarks];
        let listString = '';

        if (store.filter) {
            entries = entries.filter(entry = entry.rating >= store.filter)
        }

        entries.forEach(bookmark => {
            listString = listString + bookmarkItem.createBookmarkHTML(bookmark);   
        });
        $('.js-bookmark-list').html(listString);
    };


    function getItemIdFromElement(item) {
        return $(item)
        .closest('.bookmark-collapse. .bookmark-expand, .bookmark')
        .data('bookmark-id');
    }

    const handleBookmarkClick = function() {
        $('.js-bookmark-list').on('click', '.bookmark-expand, .bookmark-collapse', e => {
            let entryID = getItemIdFromElement(e.target);
            render();
        });
    };

    const handleBookmarkDelete = function() {
        $('.js-bookmark-list').on('click', '#delete', e => {
            let entryID = getItemIdFromElement(e.target);
            api.deleteBookmark(entryID)
            .then(res => res.json())
            .then(resJSON => {
                store.deleteBookmarkByID(entryID);
                render();
            })
            .catch(error => console.log(error));
        });
    };

    const handleRatingFilterChange = function() {
        $('#rating-filter').on('change', e => {
            let newRating = e.target.value;
            store.filter = newRating;
            render();
        });
    };

    const bindBookmarkListEventHandlers = function() {
        handleBookmarkClick();
        handleBookmarkDelete();
        handleRatingFilterChange();
    };

    return {
        bindBookmarkListEventHandlers,
        render
    };

}();

