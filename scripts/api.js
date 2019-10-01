'use strict';

const api = (function() {
    const BASE_URL = 'https://thinkful-list-api.herokuapp.com/bookmarks-app-rob';

    const createBookmark = function(bookmark = Object) {
        return fetch(`${BASE_URL}/bookmarks`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookmark)
        })
        .then(res => {
            if(res.ok){
                return res;
            }
            throw new Error("There's an error here", res);
        });
    }

    const getBookmarks = function() {
        return fetch(`${BASE_URL}/bookmarks`)
        .then(res => {
            if(res.ok) {
                return res;
            } 
            throw new Error("There's an error here", res);
        });
    };

    const updateBookmark = function(id, options) {
        return fetch(`${BASE_URL}/bookmarks/${id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options)
        })
        .then(res => {
            if(res.ok) {
                return res;
            }
            throw new Error("There's an error here", res);
        });
    };

    const deleteBookmark = function(id) {
        return fetch(`${BASE_URL}/bookmarks/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(res.ok) {
                return res;
            }
            throw new Error("There's an error here", res);
        });
    };

    return {
        createBookmark,
        getBookmarks,
        updateBookmark,
        deleteBookmark
    };
 })();