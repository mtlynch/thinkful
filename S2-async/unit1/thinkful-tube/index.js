const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_API_KEY = 'AIzaSyBbm2HfRinLFCMqUQo_2Bt2ncfQ3DnQBDg'

/*Things I might need
    title - OBJ.items[INDEX].snippet.title
    thumbnail - OBJ.items[INDEX].snippet.thumbnails.default.url
    description - OBJ.items[INDEX].snippet.description
*/
function getDataFromApi(searchTerm, callback) {
  const query = {
    q: searchTerm,
    key: YOUTUBE_API_KEY,
    part: 'snippet',
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  return `
    <div class="thumbnail">
        <a href="https://www.youtube.com/watch?v=${result.id.videoId}">
            <h3> ${result.snippet.title} </h3>
            <img src="${result.snippet.thumbnails.medium.url}" alt="${result.snippet.description}">
        </a>  
    </div>
  `;
}

function displayYoutubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
    $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchData);
  });
}

$(watchSubmit);
