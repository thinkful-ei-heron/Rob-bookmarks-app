'use strict';

/* global store, bookmarkItem, api */

// eslint-disable-next-line 
const bookmarkList = function(){
  
  // generate each bookmark from the api, after the store has been
  // updated with that data
  // once store matches api, render store in DOM

  const render = function(){
    let entries = [...store.bookmarks];
    let listString = '';

    if(store.filter) {
      entries = entries.filter(entry => entry.rating >= store.filter);
    }

    entries.forEach(bookmark => {
      listString += bookmarkItem.createBookmarkHTML(bookmark);
    });
    $('.js-bookmark-list').html(listString);
  };

  // retrieve data item from an element
  function getItemIdFromElement(item) {
    return $(item)
      .closest('.bookmark-collapse, .bookmark-expand, .bookmark')
      .data('bookmark-id');
  }

  // on click, toggle expand/collapse of bookmark item
  const handleBookmarkClick = function(){
    $('.js-bookmark-list').on('click', '.bookmark-expand, .bookmark-collapse', e => {
      let entryID = getItemIdFromElement(e.target);
      store.toggleExpandBookmark(entryID);
      render();
    });
  };

  // on click, delete an item
  const handleBookmarkDelete = function(){
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

  // on update of rating filter, render only bookmarks greater than
  // or equal to the rating chosen
  const handleRatingFilterChange = function(){
    $('#rating-filter').on('change', e => {
      let newRating = e.target.value;
      store.filter = newRating;
      render();
    });
  };

  // package all event handlers
  const bindBookmarkListEventHandlers = function(){
    handleBookmarkClick();
    handleBookmarkDelete();
    handleRatingFilterChange();
  };

  return {
    bindBookmarkListEventHandlers,
    render
  };
}();