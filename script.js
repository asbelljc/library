let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  };
}

function addToLibrary(book) {
  myLibrary.push(book);
}

function updateDisplay() {
  resetDisplay();
  for (let book in myLibrary) {
    makeCard(book);
  }
}

