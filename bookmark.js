'use strict';

const bookmarkObject = function(){
  
  const createBookmarkHTML = function(obj){
    let stars = '';
    switch (obj.rating) {
    case 1:
      stars = '⭑⭒⭒⭒⭒';
      break;
    case 2:
      stars = '⭑⭑⭒⭒⭒';
      break;
    case 3:
      stars = '⭑⭑⭑⭒⭒';
      break;
    case 4:
      stars = '⭑⭑⭑⭑⭒';
      break;
    case 5:
      stars = '⭑⭑⭑⭑⭑';
      break;
    default:
      stars = 'N/A';
    }

    if(obj.expanded) {
      return `
      <li data-bookmark-id="${obj.id}" class="bookmark">
      <button id="delete" class="delete" aria-label="Click here to delete"><img src="trash.png" alt="trash can"></button>
        <div data-bookmark-id="${obj.id}" class="bookmark-expand">
          <h3>${obj.title}</h3>
          <p class="rating">${stars}</p>
          <p class="description" placeholder="No description provided" disabled>${obj.desc = obj.desc ? obj.desc : 'No description provided'}</p>
          <a href="${obj.url}" target="_blank">Visit Site</a>
        </div>
      </li>
    `;
    }

    return `
    <li data-bookmark-id="${obj.id}" class="bookmark">
    <button id="delete" class="delete" aria-label="Click here to delete"><img src="trash.png" alt="trash can"></button>
      <div data-bookmark-id="${obj.id}" class="bookmark-collapse">
        <h3>${obj.title}</h3>
        <p>${stars}</p>
      </div>
    </li>
  `;
  };
  
  return {
    createBookmarkHTML
  };
}();