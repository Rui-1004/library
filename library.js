const myLibrary = [];
let bookIndex = 0;
let id = 0;

function Book(name, author, pages) {
  this.id = id++;
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = false;
}

Book.prototype.toggleRead = function () {
  if(this.read == true) {
    this.read = false;
  }
  else {
    this.read = true;
  }
}

function displayBooks() {
  for(const book of myLibrary) {
    createBook(book);
  }
}

function addBookToLibrary() {
  event.preventDefault();

  const bookName = document.getElementById("book-name").value;
  const authorName = document.getElementById("author-name").value;
  const pageNumber = document.getElementById("pages").value;

  const book = new Book(bookName, authorName, pageNumber);

  myLibrary.push(book);
  console.log(myLibrary);
  createBook(book);
}

function createBook(book) {
  const container = document.querySelector(".book-container");

  const div = document.createElement("div");
  const pBook = document.createElement("p");
  const pAuthor = document.createElement("p");
  const pPages = document.createElement("p");
  const pRead = document.createElement("p");
  const deleteButton = document.createElement("button");
  const readButton = document.createElement("button");
        
  div.classList.add("book-content");
  deleteButton.classList.add("delete");
  readButton.classList.add("read")
  deleteButton.setAttribute("onclick", "removeBook()");
  readButton.setAttribute("onclick", "readBook()");

  div.dataset.index = bookIndex;
        
  pBook.textContent = book.name;
  pAuthor.textContent = book.author;
  pPages.textContent = book.pages;
  pRead.textContent = book.read == true ? "read" : "not read";
  deleteButton.textContent = "Delete";
  readButton.textContent = "Toggle Read";
        
  div.append(pBook, pAuthor, pPages, pRead, deleteButton, readButton);
        
  container.appendChild(div);
  bookIndex++;
}

function removeBook() {
  const button = document.querySelector(".delete");
  const bookContent = button.parentNode;

  for(const book of myLibrary) {
    if(book.id == bookContent.dataset.index) {
      myLibrary.splice(myLibrary.indexOf(book), 1);
      console.log(myLibrary);
    }
  }
  bookContent.remove();
}

function readBook() {
  const readBtn = document.querySelector(".read");
  const bookContent = readBtn.parentNode;

  for(const book of myLibrary) {
    if(book.id == bookContent.dataset.index) {
      book.toggleRead();
    }
  }
}

displayBooks();

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});