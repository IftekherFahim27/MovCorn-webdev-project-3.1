//TMDB 
/* For finding popularity -> /discover/movie is used
For finding by search /search/movie?  

New generated Api Key = d1c38ce980cc9d78dbe42c70fdfbcdbd

Full API for popular movies
https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1cf50e6248dc270629e802686245c2c8

Full API for popular movies
https://api.themoviedb.org/3/sherlock/movie?&api_key=1cf50e6248dc270629e802686245c2c8 

For Searching any genre
https://api.themoviedb.org/3/genre/movie/list?api_key=1cf50e6248dc270629e802686245c2c8


New generated API Key + Upcoming movies
https://api.themoviedb.org/3/movie/upcoming?api_key=d1c38ce980cc9d78dbe42c70fdfbcdbd


New generated API Key + 2014 movies
https://api.themoviedb.org/3/discover/movie?with_genres=18&primary_release_year=2014&api_key=d1c38ce980cc9d78dbe42c70fdfbcdbd
*/

function myfunction() {
  alert("JavaScript is working");
}

const API_KEY = 'api_key=d1c38ce980cc9d78dbe42c70fdfbcdbd';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY; /* Popular movies */
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const upcoming_Movies_Url = BASE_URL + '/movie/upcoming?' + API_KEY;
const top_rated_Movies_Url = BASE_URL + '/movie/top_rated?' + API_KEY;
const trending_Movies_Url = BASE_URL + '/trending/all/day?' + API_KEY;

// https://api.themoviedb.org/3/movie/upcoming?api_key=d1c38ce980cc9d78dbe42c70fdfbcdbd

const main = document.getElementById('main');
const form = document.getElementById('form'); /* search bar form */
const search = document.getElementById('search'); /* search in search bar */
const tagsEl = document.getElementById('tags');
const upcoming_Movies = document.getElementById('Upcoming-Movies') /* Upcoming movies */


const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;

const genres = [{
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]



var selectedGenre = [] /* Genre names array  */
setGenre();

function setGenre() {
  // alert("JavaScript is working2");
  tagsEl.innerHTML = '';
  genres.forEach(genre => {
    const t = document.createElement('div');
    t.classList.add('tag');
    t.id = genre.id;
    t.innerText = genre.name; /* Adding genre name in the div tag */

    t.addEventListener('click', () => {
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          /* id -> element and idx -> position of the element */
          selectedGenre.forEach((id, idx) => {
            if (id == genre.id) {
              selectedGenre.splice(idx, 1); /* If genre id is already inside the array, have to remove from array  */
            }
          })
        } else {
          selectedGenre.push(genre.id); /* If genre id is not inside the array, have to push it to array  */
        }
      }
      console.log(selectedGenre)
      getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(','))) /* API for tag search */
      highlightSelection()
    })

    tagsEl.append(t);
  })
}

function highlightSelection() /* Highlight which tag is selected */ {
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
    tag.classList.remove('highlight')
  })
  clearBtn()
  if (selectedGenre.length != 0) {
    selectedGenre.forEach(id => {
      const hightlightedTag = document.getElementById(id);
      hightlightedTag.classList.add('highlight');
    })
  }

}

function clearBtn() {
  let clearBtn = document.getElementById('clear');
  if (clearBtn) {
    clearBtn.classList.add('highlight') /* If clear button is pressed one time */
  } else {

    let clear = document.createElement('div');
    clear.classList.add('tag', 'highlight');
    clear.id = 'clear';
    clear.innerText = 'Clear x';
    clear.addEventListener('click', () => {
      selectedGenre = []; /* If clear button is pressed, genre is cleared */
      setGenre(); /* If clear button is pressed, genre is need to be set again */
      getMovies(API_URL); /* If clear button is pressed, API_URL is reset */
    })
    tagsEl.append(clear);
  }

}

getMovies(API_URL);

function getMovies(url) {
  lastUrl = url;
  fetch(url).then(res => res.json()).then(data => {
    console.log(data.results)
    if (data.results.length !== 0) {
      showMovies(data.results);
      currentPage = data.page;
      nextPage = currentPage + 1;
      prevPage = currentPage - 1;
      totalPages = data.total_pages;

      current.innerText = currentPage;

      if (currentPage <= 1) {
        prev.classList.add('disabled');
        next.classList.remove('disabled')
      } else if (currentPage >= totalPages) {
        prev.classList.remove('disabled');
        next.classList.add('disabled')
      } else {
        prev.classList.remove('disabled');
        next.classList.remove('disabled')
      }

      tagsEl.scrollIntoView({
        behavior: 'smooth'
      })

    } else {
      main.innerHTML = `<h1 class="no-results">No Results Found</h1>`
    }

  })

}


function showMovies(data) {
  /* 20 movies in an array */
  main.innerHTML = '';

  data.forEach(movie => {
    const {
      title,
      poster_path,
      vote_average,
      overview,
      id
    } = movie;
    const movieEl = document.createElement('div'); /* Creating div for each movies info */
    movieEl.classList.add('movie'); /* Adding movies info */
    movieEl.innerHTML = `
             <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">

            <div class="movie-info">        
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>    
            </div>

            <div class="overview">
                <h3 class="overview-headings">Overview</h3>
                <div class="overview-details">
                  ${overview}
                </div>
                <br/> 
                <button class="know-more" id="${id}">Know More</button
            </div>
        
        `

    main.appendChild(movieEl); /* append all elements in the main tag */

    document.getElementById(id).addEventListener('click', () => {
      console.log(id)
      openNav(movie)
    })
  })
}

const overlayContent = document.getElementById('overlay-content');
/* Open when someone clicks on the span element */
function openNav(movie) {
  let id = movie.id;
  fetch(BASE_URL + '/movie/' + id + '/videos?' + API_KEY).then(res => res.json()).then(videoData => {
    console.log(videoData);
    if (videoData) {
      document.getElementById("myNav").style.width = "100%";
      if (videoData.results.length > 0) {
        var embed = [];
        var dots = [];
        videoData.results.forEach((video, idx) => {
          let {
            name,
            key,
            site
          } = video

          if (site == 'YouTube') {

            embed.push(`
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          
          `)

            dots.push(`
              <span class="dot">${idx + 1}</span>
            `)
          }
        })

        var content = `
        <h1 class="no-results">${movie.original_title}</h1>
        <br/>
        
        ${embed.join('')}
        <br/>

        <div class="dots">${dots.join('')}</div>
        
        `
        overlayContent.innerHTML = content;
        activeSlide = 0;
        showVideos();
      } else {
        overlayContent.innerHTML = `<h1 class="no-results">No Results Found</h1>`
      }
    }
  })
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

var activeSlide = 0;
var totalVideos = 0;

function showVideos() {
  let embedClasses = document.querySelectorAll('.embed');
  let dots = document.querySelectorAll('.dot');

  totalVideos = embedClasses.length;
  embedClasses.forEach((embedTag, idx) => {
    if (activeSlide == idx) {
      embedTag.classList.add('show')
      embedTag.classList.remove('hide')

    } else {
      embedTag.classList.add('hide');
      embedTag.classList.remove('show')
    }
  })

  dots.forEach((dot, indx) => {
    if (activeSlide == indx) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active')
    }
  })
}

const leftArrow = document.getElementById('left-arrow')
const rightArrow = document.getElementById('right-arrow')

leftArrow.addEventListener('click', () => {
  if (activeSlide > 0) {
    activeSlide--;
  } else {
    activeSlide = totalVideos - 1;
  }

  showVideos()
})

rightArrow.addEventListener('click', () => {
  if (activeSlide < (totalVideos - 1)) {
    activeSlide++;
  } else {
    activeSlide = 0;
  }
  showVideos()
})


function getColor(vote) {
  /* Adding color for ratings */
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return "orange"
  } else {
    return 'red'
  }
}


upcoming_Movies.addEventListener('click', (e) => {

  getMovies(upcoming_Movies_Url);
})

top_rated_Movies.addEventListener('click', (e) => {
  getMovies(top_rated_Movies_Url);
})

trending_Movies.addEventListener('click', (e) => {
  getMovies(trending_Movies_Url);
})


form.addEventListener('submit', (e) => {

  e.preventDefault();

  const searchTerm = search.value;
  selectedGenre = []; /* when searching, genre selection is cleared */
  setGenre();
  if (searchTerm) {
    getMovies(searchURL + '&query=' + searchTerm)
  } else {
    getMovies(API_URL);
  }
})

prev.addEventListener('click', () => {
  if (prevPage > 0) {
    pageCall(prevPage);
  }
})

next.addEventListener('click', () => {
  if (nextPage <= totalPages) {
    pageCall(nextPage);
  }
})

function pageCall(page) {
  let urlSplit = lastUrl.split('?');
  let queryParams = urlSplit[1].split('&');
  let key = queryParams[queryParams.length - 1].split('=');
  if (key[0] != 'page') {
    let url = lastUrl + '&page=' + page
    getMovies(url);
  } else {
    key[1] = page.toString();
    let a = key.join('=');
    queryParams[queryParams.length - 1] = a;
    let b = queryParams.join('&');
    let url = urlSplit[0] + '?' + b
    getMovies(url);
  }
}