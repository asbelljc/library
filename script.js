let myLibrary = [];
let grid = document.getElementById("grid");

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
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

let book1 = new Book(
  "Harry Potter and the Sorcerer's Stone",
  "J. K. Rowling",
  223,
  true
);
let book2 = new Book(
  "Harry Potter and the Chamber of Secrets",
  "J. K. Rowling",
  251,
  true
);
let book3 = new Book(
  "Harry Potter and the Prisoner of Azkaban",
  "J. K. Rowling",
  317,
  true
);
let book4 = new Book(
  "Harry Potter and the Goblet of Fire",
  "J. K. Rowling",
  636,
  true
);
let book5 = new Book(
  "Harry Potter and the Order of the Phoenix",
  "J. K. Rowling",
  766,
  false
);
let book6 = new Book(
  "Harry Potter and the Half-Blood Prince",
  "J. K. Rowling",
  607,
  false
)
let book7 = new Book(
  "Harry Potter and the Deathly Hallows",
  "J. K. Rowling",
  607,
  false
);

myLibrary = [
  book1, book2, book3, book4, book5, book6, book7
];

myLibrary.forEach(book => {
  const card = document.createElement("div");
  const cardInset = document.createElement("div");
  const deleteButton = document.createElement("button");
  const delBtnSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const delBtnPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const title = document.createElement("h2");
  const author = document.createElement("p");
  const cardBottom = document.createElement("div");
  const pageCount = document.createElement("p");
  const readToggle = document.createElement("button");
  const slider = document.createElement("span");
  const read = document.createElement("span");
  const unread = document.createElement("span");

  card.classList.add("card");
  cardInset.classList.add("card-inset");
  deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", e => {
      let thisCard = e.target.closest(".card");
      function toggleDelete() {
        deleteButton.classList.toggle("toggled");
      }
      function deleteCard() {
        thisCard.remove();
      }
      toggleDelete();
      setTimeout(toggleDelete, 500);
      thisCard.classList.add("toggled");
      setTimeout(deleteCard, 1400);
    });
  delBtnSvg.classList.add("cross");
    delBtnSvg.setAttribute("version", "1.1");
    delBtnSvg.setAttribute("xmlns:x", "&ns_extend;");
    delBtnSvg.setAttribute("xmlns:i", "&ns_ai");
    delBtnSvg.setAttribute("xmlns:graph", "&ns_graphs");
    delBtnSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    delBtnSvg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    delBtnSvg.setAttribute("x", "0px");
    delBtnSvg.setAttribute("y", "0px");
    delBtnSvg.setAttribute("viewBox", "0 0 21.6 21.6");
    delBtnSvg.setAttribute("style", "enable-background:new 0 0 21.6 21.6;");
    delBtnSvg.setAttribute("xml:space", "preserve");
  delBtnPath.setAttribute(
    "d",
    "M20.7,0.9L20.7,0.9c-1.2-1.2-3.1-1.2-4.2,0l-5.7,5.7L5.1,0.9c-1.2-1.2-3.1-1.2-4.2,0l0,0c-1.2,1.2-1.2,3.1,0,4.2l5.7,5.7l-5.7,5.7c-1.2,1.2-1.2,3.1,0,4.2l0,0c1.2,1.2,3.1,1.2,4.2,0l5.7-5.7l5.7,5.7c1.2,1.2,3.1,1.2,4.2,0l0,0c1.2-1.2,1.2-3.1,0-4.2L15,10.8l5.7-5.7C21.8,3.9,21.8,2.1,20.7,0.9z"
  );
  title.classList.add("book-title");
    title.innerText = `${book.title}`;
  author.classList.add("book-author");
    author.innerText = `${book.author}`;
  cardBottom.classList.add("card-bottom");
  pageCount.classList.add("page-count");
    pageCount.innerText = `${book.pages}`;
  readToggle.classList.add("read-toggle");
    readToggle.addEventListener("click", () => {
      readToggle.classList.toggle("toggled");
      slider.classList.toggle("toggled");
    });
  slider.classList.add("slider");
  read.classList.add("read");
    read.innerText = "READ";
  unread.classList.add("unread");
    unread.innerText = "UNREAD";

  if (book.isRead) {
    readToggle.classList.add("toggled");
    slider.classList.add("toggled");
  }

  readToggle.appendChild(slider);
    readToggle.appendChild(read);
    readToggle.appendChild(unread);
  cardBottom.appendChild(pageCount);
    cardBottom.appendChild(readToggle);
  delBtnSvg.appendChild(delBtnPath);
  deleteButton.appendChild(delBtnSvg);
  cardInset.appendChild(deleteButton);
    cardInset.appendChild(title);
    cardInset.appendChild(author);
    cardInset.appendChild(cardBottom);
  card.appendChild(cardInset);

  grid.appendChild(card);
});

// For testing! Note "firstElementChild" rather than "firstChild"!!!!!
// const toggleSwitches = [
//   document.getElementById("title-author"),
//   document.getElementById("asc-desc")
// ];

// toggleSwitches.forEach(item => {
//   item.addEventListener("click", () => {
//     item.firstElementChild.classList.toggle("toggled");
//   });
// });

// const addButton = document.getElementById("add-btn");

// addButton.addEventListener("click", () => {
//   addButton.classList.toggle("toggled");
// });

// const readToggle = document.getElementsByClassName("read-toggle")[0];

// readToggle.addEventListener("click", () => {
//   readToggle.classList.toggle("toggled");
//   readToggle.firstElementChild.classList.toggle("toggled");
// });

// const deleteButton = document.getElementsByClassName("delete-btn")[0];

// function toggleDelete() {
//   deleteButton.classList.toggle("toggled");
// }

// deleteButton.addEventListener("click", () => {
//   toggleDelete();
//   setTimeout(toggleDelete, 500);
//   document.getElementsByClassName("card")[0].classList.toggle("toggled");
// });