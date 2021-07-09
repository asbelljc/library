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

// For testing! Note "firstElementChild" rather than "firstChild"!!!!!
const toggleSwitches = [
  document.getElementById("title-author"),
  document.getElementById("asc-desc")
];

toggleSwitches.forEach(item => {
  item.addEventListener("click", () => {
    item.firstElementChild.classList.toggle("toggled");
  });
});

const addButton = document.getElementById("add-btn");

addButton.addEventListener("click", () => {
  addButton.classList.toggle("toggled");
});

const readToggle = document.getElementsByClassName("read-toggle")[0];

readToggle.addEventListener("click", () => {
  readToggle.classList.toggle("toggled");
  readToggle.firstElementChild.classList.toggle("toggled");
});

const deleteButton = document.getElementsByClassName("delete-btn")[0];
function toggleDelete() {
  deleteButton.classList.toggle("toggled");
}

deleteButton.addEventListener("click", () => {
  toggleDelete();
  setTimeout(toggleDelete, 500);
  document.getElementsByClassName("card")[0].classList.toggle("toggled");
});