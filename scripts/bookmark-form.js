'use strict';

const bookmarkForm = function() {

    const render = function() {
    const form = `
    <form id="bookmark-form" class="bookmark-form">
    <input type="text"> name="title" id="title" placeholder="Title" required/>
    <input type="url"> name="url" id="url" placeholder="Bookmark URL" required/>
    <input type="url"> name="desc" id="desc" maxlength="" placeholder="Description">
    <select name="rating" id="rating" min="1" max="5">
        <option value="5">⭑⭑⭑⭑⭑</option>
        <option value="4">⭑⭑⭑⭑⭒</option>
        <option value="3">⭑⭑⭑⭒⭒</option>
        <option value="2">⭑⭑⭒⭒⭒</option>
        <option value="1">⭑⭒⭒⭒⭒</option>
    </select>
    <button type="submit">Add</button>
    <button type="reset">Reset</button>    
    </form>
    `;

    if(store.adding) {
        $('.js-bookmark-list').after(form);
        $('#display-form').toggleClass('hide-button');
    } else {
        $('#bookmark-form').remove();
        $('#display-form').toggleClass('hide-button');
    }

}

const handleAddBookmarkClick = function() {
    $('#display-form').on('click', () => {
        store.adding = !store.adding;
        render();
    });
};

const handleFormCancel = function() {
    $('body').on('reset', '#bookmark-form', e => {
        e.preventDefault();
        store.adding = false;
        render();
    });
};

const handleSubmitNewBookmark = function() {
    $('body').on('submit', '#bookmark-form', e => {
        e.preventDefault();
        let formData = newFormData(document.getElementById('bookmark-form');
        let formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        api.createBookmark(formObject)
        .then(res = > res.json())
        .then(resJSON => {
            api.getBookmarks()
            .then(res => res.json())
            .then(bookmarks => {
                store.bookmarks = [];
                bookmarks.forEach(bookmark => {
                    store.addBookmark(bookmark);
                    bookmarkList.render();
                    return resJSON;
                })
            })
            .catch(error => console.log(error))
        })
        .then(resJSON => {
            console.log(resJSON);
            store.adding = false;
            render();
        })
        .catch(error => console.log(error));
    });
};
    const bindFormEventListeners = function() {
        handleAddBookmarkClick();
        handleSubmitNewBookmark();
        handleFormCancel();
    }

    return {
        render,
        bindFormEventListeners
    }

}();