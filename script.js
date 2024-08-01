/*
const countriesContainer = document.querySelector('.countries');
const renderCountry = function (data) {
    const html = `
            <article class="country">
                <img src="${data.flags.png}" alt="" class="country_img">
                <div class="country_data">
                    <h3 class="country_name">${data.name.official}</h3>
                    <div class="country_data">
                        <h4 class="country_name">${data.name.common}</h4>
                        <p class="country_populaton">${(+data.population / 1000000).toFixed(1)} million</p>
                        <p class="country_currency">${data.currencies.name}</p>
                    </div>
                </div>
            </article>
    `
    countriesContainer.insertAdjacentHTML('beforeend', html);
}


function getCountryAndNeighbour(country) {
    // AJAX call country -1
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();
    request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);//this keyword represented request here, keep the constant in third bracket is destructuring data
        console.log(data);
        //Render Country -1
        renderCountry(data);
        //Get neighbour country -2
        const [neighbour] = data.borders;
        if (!neighbour) return;

        // AJAX call country -2
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
        request2.send();
        request2.addEventListener('load', function() {
            const [data2] = JSON.parse(this.responseText);
            console.log(data2);
            renderCountry(data2);
        })
    })
}

getCountryAndNeighbour('bangladesh');
*/

// const bookList = document.getElementById('book-list');
// const bookForm = document.getElementById('book-form');
// const titleInput = document.getElementById('title');
// const authorInput = document.getElementById('author');
// const bookIdInput = document.getElementById('book-id');

// function fetchBook() {
//   const req = new XMLHttpRequest();
//   req.open('GET', 'http://localhost:3000/books', true);
//   req.onload = function () {
//     if(this.status ===200 && this.readyState === 4){
//       const books = JSON.parse(req.responseText) 
//       displayBooks(books);
//     } else {
//       console.error("Bad Request.");
//     }
    
//   }
//   req.send();
// }


// function displayBooks(book) {
//   bookList.innerHTML = '';
//   for (let i in book) {
//     console.log(book[i]);
//     bookList.innerHTML += `
//     <span>${book[i].title} by ${book[i].author}</span>
//       <span>
//         <button onclick="editBook(${book[i].id})">Edit</button>
//         <button onclick="deleteBook()">Delete</button>
//       </span>
//     `;
//   }
// }

// bookForm.onsubmit = function(e) {
//   e.preventDefault();
//   console.log("clicked");

//   const id = bookIdInput.value;
//   const title = titleInput.value.trim();
//   const author = authorInput.value.trim();

//   const book = {id, title, author };

//   addBook(book);
// };

// function addBook(book) {
//   const req = new XMLHttpRequest();
//   req.open('POST', 'http://localhost:3000/books', true);
//   req.send(JSON.stringify(book));
// }

// function editBook(id) {
// console.log(id);
// }

// fetchBook();


const bookList = document.getElementById('book-list');
const bookForm = document.getElementById('book-form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const bookIdInput = document.getElementById('book-id');

// Fetch and display books
function fetchBooks() {
  const req = new XMLHttpRequest();
  req.open('GET', 'http://localhost:3000/books', true);
  req.onload = function() {
    if (this.status === 200) {
      const books = JSON.parse(req.responseText);
      displayBooks(books);
    } else {
      console.error("Bad Request.");
    }
  };
  req.send();
}

function displayBooks(books) {
  bookList.innerHTML = '';
  books.forEach(book => {
    const div = document.createElement('div');
    div.className = 'book-item';
    div.innerHTML = `
      <span>${book.title} by ${book.author}</span>
      <span>
        <button onclick="editBook(${book.id})">Edit</button>
        <button onclick="deleteBook(${book.id})">Delete</button>
      </span>
    `;
    bookList.appendChild(div);
  });
}

// Add or update book
bookForm.onsubmit = function(e) {
  e.preventDefault();
  const id = bookIdInput.value;
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const book = { title, author };

  if (id) {
    updateBook(id, book);
  } else {
    addBook(book);
  }
};

// Add new book
function addBook(book) {
  const req = new XMLHttpRequest();
  req.open('POST', 'http://localhost:3000/books', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.onload = function() {
    if (this.status === 201) {
      fetchBooks();
      bookForm.reset();
    }
  };
  req.send(JSON.stringify(book));
}

// Edit book
function editBook(id) {
  const req = new XMLHttpRequest();
  req.open('GET', `http://localhost:3000/books/${id}`, true);
  req.onload = function() {
    if (this.status === 200) {
      const book = JSON.parse(req.responseText);
      bookIdInput.value = book.id;
      titleInput.value = book.title;
      authorInput.value = book.author;
    }
  };
  req.send();
}

// Update book
function updateBook(id, book) {
  const req = new XMLHttpRequest();
  req.open('PUT', `http://localhost:3000/books/${id}`, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.onload = function() {
    if (this.status === 200) {
      fetchBooks();
      bookForm.reset();
      bookIdInput.value = '';
    }
  };
  req.send(JSON.stringify(book));
}

// Delete book
function deleteBook(id) {
  const req = new XMLHttpRequest();
  req.open('DELETE', `http://localhost:3000/books/${id}`, true);
  req.onload = function() {
    if (this.status === 200) {
      fetchBooks();
    }
  };
  req.send();
}

// Initial fetch of books
fetchBooks();







