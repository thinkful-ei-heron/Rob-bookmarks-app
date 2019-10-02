'use strict';

$('document').ready(function(){
    api.fetchBookmarks()
      .then(res => res.json())
      .then(bookmarks => 
        bookmarks.forEach(bookmark => {
          store.addBookmark(bookmark);
          bookmarkList.render();
        }))
      .catch(error => console.log(error));
    if(store.adding) {
      form.render();
    }
    bookmarkList.bindBookmarkListEventHandlers();
    form.bindFormEventListeners();
  });
  
  console.log('store', store.bookmarks);