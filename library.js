const myLibrary = [];
let bookIndex = 0;
let id = 0;

class Book {
  constructor (name, author, pages) {
    this.id = id++;
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = false;
  }

  toggleRead() {
    if(this.read == true) {
      this.read = false;
    }
    else {
      this.read = true;
    }
  }

  static displayBooks() {
    for(const book of myLibrary) {
      createBook(book);
    }
  }
  
  static createBook(book) {
    const container = document.querySelector(".book-container");
  
    const div = document.createElement("div");
    const pBook = document.createElement("p");
    const pAuthor = document.createElement("p");
    const pPages = document.createElement("p");
    const pRead = document.createElement("p");
    const deleteButton = document.createElement("button");
    const readButton = document.createElement("button");
    
    pRead.classList.add("read-text");
    div.classList.add("book-content");
    deleteButton.classList.add("delete");
    readButton.classList.add("read")
    deleteButton.addEventListener("click", () => {
      const bookContent = document.querySelector(`[data-index="${book.id}"]`);

      myLibrary.splice(myLibrary.indexOf(book), 1);
      console.log(myLibrary);
      bookContent.remove();
    });
    readButton.addEventListener("click", () => {
      const bookContent = document.querySelector(`[data-index="${book.id}"]`);;
      const pRead = bookContent.querySelector(".read-text");
    
      book.toggleRead();
      console.log(book);
      pRead.textContent = book.read == true ? "read" : "not read";
    });
  
    div.dataset.index = bookIndex;
          
    pBook.textContent = book.name;
    pAuthor.textContent = book.author;
    pPages.textContent = book.pages;
    pRead.textContent = "not read";
    deleteButton.textContent = "Delete";
    readButton.textContent = "Toggle Read";
          
    div.append(pBook, pAuthor, pPages, pRead, deleteButton, readButton);
          
    container.appendChild(div);
    bookIndex++;
  }
}

Book.displayBooks();

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

const form = document.querySelector("form");

form.addEventListener("submit", () => {
  event.preventDefault();
  
  const bookName = document.getElementById("book-name").value;
  const authorName = document.getElementById("author-name").value;
  const pageNumber = document.getElementById("pages").value;

  const book = new Book(bookName, authorName, pageNumber);

  myLibrary.push(book);
  console.log(myLibrary);
  Book.createBook(book);
});

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});