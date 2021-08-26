let myLibrary = [];
const grid = document.getElementById("grid");
const addButton = document.getElementById("add-btn");
const titleAuthor = document.getElementById("title-author");
const ascDesc = document.getElementById("asc-desc");

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  toggleRead = function() {
    if (this.isRead) {
      this.isRead = false;
    } else {
      this.isRead = true;
    }
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  }
}

// MDN's suggested check for localStorage availability.
function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0);
  }
}

// Alert user of problems and use sample books if localStorage empty or restricted.
if(!storageAvailable('localStorage')) {
  alert(
    "Your local storage is either disabled or full. Your changes will not be saved."
  );
}
if (!storageAvailable('localStorage') || !localStorage.getItem('myLibrary')) {
  let book1 = new Book(
    "Stranger in a Strange Land",
    "Robert A. Heinlein",
    310,
    false
  );
  let book2 = new Book(
    "Oh, the Places You'll Go!",
    "Dr. Seuss",
    64,
    true
  );
  let book3 = new Book(
    "A Brief History of Time",
    "Stephen Hawking",
    256,
    true
  );

  myLibrary = [
    book1, book2, book3
  ];
} else {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"))
                  .map(book => Object.assign(new Book(), book));
}

[titleAuthor, ascDesc].forEach(element => {
  element.addEventListener("click", () => {
    element.firstElementChild.classList.toggle("toggled");
    clearGrid();
    sortBooks();
    setTimeout(populateGrid, 1000);
  });
});

function getOption() {
  let option = [];

  if (titleAuthor.firstElementChild.classList.contains("toggled")) {
    option.push("author")
  } else { 
    option.push("title");
  }
  if (ascDesc.firstElementChild.classList.contains("toggled")) {
    option.push("desc");
  } else {
    option.push("asc");
  }
  return option;
}

animateCSSGrid.wrapGrid(grid, {duration : 300, stagger: 100});

function sortBooks() {
  myLibrary.sort((a, b) => {
    let aLastName = a.author.split(' ')[a.author.split(' ').length-1];
    let bLastName = b.author.split(' ')[b.author.split(' ').length-1];

    if (getOption()[0] === "title") {
      return a.title.localeCompare(b.title) || aLastName.localeCompare(bLastName);
    } else {
      return aLastName.localeCompare(bLastName) || a.title.localeCompare(b.title);
    }
  });

  if (getOption()[1] === "desc") {
    myLibrary.reverse();
  }
}

function swapGridContents() {
  const sortControl = document.getElementById("sort-control");
  addButton.removeEventListener("click", swapGridContents);

  if (grid.querySelector("form") !== null) {
    addButton.classList.toggle("toggled");
    sortControl.style.visibility = "visible"; // reveal sort control
    setTimeout( () => {                       // as cards reveal
      sortControl.style.opacity = "1";
    }, 1400);
    clearGrid();
    setTimeout(populateGrid, 1000);
  } else {
    addButton.classList.toggle("toggled");
    setTimeout( () => {                 // hide sort control
      sortControl.style.opacity = "0";  // as form reveals
    }, 400);                                                          
    setTimeout( () => {                                          
      sortControl.style.visibility = "hidden";
    }, 1000);
    clearGrid();
    setTimeout(makeForm, 1000);
  }

  setTimeout( () => {
    addButton.addEventListener("click", swapGridContents);
  }, 1000);
}

addButton.addEventListener("click", swapGridContents);

function clearGrid() {
  const allCards = Array.from(document.getElementsByClassName("card"));
  function lowerAllCards() {
    allCards.forEach(card => { card.classList.toggle("toggled"); });
  }
  function hideAllCards() {
    allCards.forEach(card => { card.firstElementChild.style.opacity = "0"; });
  }
  function deleteAllCards() {
    while (grid.firstElementChild) {
      grid.firstElementChild.remove();
    }
  }
  lowerAllCards();
  setTimeout(hideAllCards, 300);
  setTimeout(deleteAllCards, 900);
}

function makeForm() {
  const card = document.createElement("div");
  const form = document.createElement("form");
  const submitButton = document.createElement("button");
  const submitBtnSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const submitBtnPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const cancelButton = document.createElement("button");
  const cancelBtnSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const cancelBtnPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const titleWrap = document.createElement("div");
  const titleInput = document.createElement("textarea");
  const authorWrap = document.createElement("div");
  const authorInput = document.createElement("textarea");
  const spacer = document.createElement("div");
  const cardBottom = document.createElement("div");
  const pagesWrap = document.createElement("div");
  const pagesInput = document.createElement("textarea");
  const readToggle = document.createElement("label");
  const slider = document.createElement("span");
  const read = document.createElement("span");
  const unread = document.createElement("span");
  const readCheckbox = document.createElement("input");
  const submitForm = () => {
    submitButton.removeEventListener("click", submitForm);

    const book = new Book(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readCheckbox.checked
    )
    myLibrary.push(book);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

    submitButton.classList.toggle("toggled");
    setTimeout( () => {
      submitButton.classList.toggle("toggled");
      swapGridContents();
    }, 400);
  }
  const cancel = () => {
    cancelButton.removeEventListener("click", cancel);

    cancelButton.classList.toggle("toggled");
    setTimeout( () => {
      cancelButton.classList.toggle("toggled");
      swapGridContents();
    }, 400);
  }

  card.classList.add("card");
    card.classList.toggle("toggled"); // starts form card lowered (flattened)
  form.classList.add("card-inset");
    form.style.opacity = "0";         // starts form content hidden
  submitButton.id = "submit-btn";
    submitButton.type = "button"; // TEMPORARY - will be "submit" for backend
    submitButton.title = "Submit";
    submitButton.addEventListener("click", submitForm);
  submitBtnSvg.classList.add("check");
    submitBtnSvg.setAttribute("version", "1.1");
    submitBtnSvg.setAttribute("xmlns:x", "&ns_extend;");
    submitBtnSvg.setAttribute("xmlns:i", "&ns_ai;");
    submitBtnSvg.setAttribute("xmlns:graph", "&ns_graphs;");
    submitBtnSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    submitBtnSvg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    submitBtnSvg.setAttribute("x", "0px");
    submitBtnSvg.setAttribute("y", "0px");
    submitBtnSvg.setAttribute("viewBox", "0 0 26.5 21.6");
    submitBtnSvg.setAttribute("style", "enable-background:new 0 0 26.5 21.6;");
    submitBtnSvg.setAttribute("xml:space", "preserve");
  submitBtnPath.setAttribute(
    "d",
    "M10,20.7L25.6,5.1c1.2-1.2,1.2-3.1,0-4.2s-3.1-1.2-4.2,0L7.9,14.4l-2.7-" +
    "2.7c-1.2-1.2-3.1-1.2-4.2,0s-1.2,3.1,0,4.2l4.9,4.9C6.9,21.9,8.8,21.9,1" +
    "0,20.7"
  );
  cancelButton.id = "cancel-btn";
    cancelButton.type = "button";
    cancelButton.title = "Cancel";
    cancelButton.addEventListener("click", cancel);
  cancelBtnSvg.classList.add("cross");
    cancelBtnSvg.setAttribute("version", "1.1");
    cancelBtnSvg.setAttribute("xmlns:x", "&ns_extend;");
    cancelBtnSvg.setAttribute("xmlns:i", "&ns_ai;");
    cancelBtnSvg.setAttribute("xmlns:graph", "&ns_graphs;");
    cancelBtnSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    cancelBtnSvg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    cancelBtnSvg.setAttribute("x", "0px");
    cancelBtnSvg.setAttribute("y", "0px");
    cancelBtnSvg.setAttribute("viewBox", "0 0 21.6 21.6");
    cancelBtnSvg.setAttribute("style", "enable-background:new 0 0 21.6 21.6;");
    cancelBtnSvg.setAttribute("xml:space", "preserve");
  cancelBtnPath.setAttribute(
    "d",
    "M20.7,0.9L20.7,0.9c-1.2-1.2-3.1-1.2-4.2,0l-5.7,5.7L5.1,0.9c-1.2-1.2-3." +
      "1-1.2-4.2,0l0,0c-1.2,1.2-1.2,3.1,0,4.2l5.7,5.7l-5.7,5.7c-1.2,1.2-1.2,3" +
      ".1,0,4.2l0,0c1.2,1.2,3.1,1.2,4.2,0l5.7-5.7l5.7,5.7c1.2,1.2,3.1,1.2,4.2" +
      ",0l0,0c1.2-1.2,1.2-3.1,0-4.2L15,10.8l5.7-5.7C21.8,3.9,21.8,2.1,20.7,0.9z"
  );
  titleWrap.classList.add("grow-wrap");
    titleWrap.classList.add("title-wrap");
  titleInput.classList.add("title-input");
    titleInput.name = "title";
    titleInput.placeholder = "Title";
    titleInput.rows = "1";
    titleInput.setAttribute("onInput", "this.parentNode.dataset.replicatedValue = this.value");
    titleInput.required = true;
  authorWrap.classList.add("grow-wrap");
    authorWrap.classList.add("author-wrap");
  authorInput.classList.add("author-input");
    authorInput.name = "author";
    authorInput.placeholder = "Author";
    authorInput.setAttribute("onInput", "this.parentNode.dataset.replicatedValue = this.value");
    authorInput.required = true;
  spacer.classList.add("spacer");
  cardBottom.classList.add("card-bottom");
  pagesWrap.classList.add("grow-wrap");
    pagesWrap.classList.add("pages-wrap");
  pagesInput.classList.add("pages-input");
    pagesInput.name = "pages";
    pagesInput.placeholder = "Number of pages";
    pagesInput.rows = "1";
    pagesInput.setAttribute("onInput", "this.parentNode.dataset.replicatedValue = this.value");
    pagesInput.required = true;
  readToggle.classList.add("read-toggle");
    readToggle.setAttribute("for", "read-checkbox");
    readToggle.addEventListener("click", () => {
      readToggle.classList.toggle("toggled");
      slider.classList.toggle("toggled");
    });
  slider.classList.add("slider");
  read.classList.add("read");
    read.innerText = "READ";
  unread.classList.add("unread");
    unread.innerText = "UNREAD";
  readCheckbox.id = "read-checkbox";
    readCheckbox.type = "checkbox";
    readCheckbox.name = "is-read";
    readCheckbox.value = "true";
    readCheckbox.required = true;

  readToggle.appendChild(slider);
    readToggle.appendChild(read);
    readToggle.appendChild(unread);
  pagesWrap.appendChild(pagesInput);
  cardBottom.appendChild(pagesWrap);
    cardBottom.appendChild(readToggle);
    cardBottom.appendChild(readCheckbox);
  authorWrap.appendChild(authorInput);
  titleWrap.appendChild(titleInput);
  cancelBtnSvg.appendChild(cancelBtnPath);
  cancelButton.appendChild(cancelBtnSvg);
  submitBtnSvg.appendChild(submitBtnPath);
  submitButton.appendChild(submitBtnSvg);
  form.appendChild(submitButton);
    form.appendChild(cancelButton);
    form.appendChild(titleWrap);
    form.appendChild(authorWrap);
    form.appendChild(spacer);
    form.appendChild(cardBottom);
  card.appendChild(form);

  grid.appendChild(card);
  setTimeout( () => {
    card.classList.toggle("toggled"); // raise form card
  }, 100);
  setTimeout( () => {
    form.style.opacity = "1"; // reveal form content
  }, 400);
}

function populateGrid() {
  sortBooks();

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
    const deleteCard = () => {
      const toggleDelete = () => {
        deleteButton.classList.toggle("toggled");
      }
      const lowerCard = () => {
        card.classList.toggle("toggled");
      }
      const hideCard = () => {
        card.style.opacity = "0";
      }
      const removeCard = () => {
        card.remove();
      }
      const eraseData = () => {
        myLibrary.splice(myLibrary.indexOf(book), 1);
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
      }
      deleteButton.removeEventListener("click", deleteCard);
      toggleDelete();
      setTimeout(toggleDelete, 400);
      setTimeout(lowerCard, 400)
      setTimeout(hideCard, 800)
      setTimeout(removeCard, 1400);
      eraseData();
    }
  
    card.classList.add("card");
      card.classList.toggle("toggled"); // starts cards lowered (flattened)
    cardInset.classList.add("card-inset");
      cardInset.style.opacity = "0";         // starts card content hidden
    deleteButton.classList.add("delete-btn");
      deleteButton.type = "button";
      deleteButton.title = "Delete";
      deleteButton.addEventListener("click", deleteCard);
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
      "M20.7,0.9L20.7,0.9c-1.2-1.2-3.1-1.2-4.2,0l-5.7,5.7L5.1,0.9c-1.2-1.2-3." +
      "1-1.2-4.2,0l0,0c-1.2,1.2-1.2,3.1,0,4.2l5.7,5.7l-5.7,5.7c-1.2,1.2-1.2,3" +
      ".1,0,4.2l0,0c1.2,1.2,3.1,1.2,4.2,0l5.7-5.7l5.7,5.7c1.2,1.2,3.1,1.2,4.2" +
      ",0l0,0c1.2-1.2,1.2-3.1,0-4.2L15,10.8l5.7-5.7C21.8,3.9,21.8,2.1,20.7,0.9z"
    );
    title.classList.add("book-title");
      title.innerText = `${book.title}`;
    author.classList.add("book-author");
      author.innerText = `${book.author}`;
    cardBottom.classList.add("card-bottom");
    pageCount.classList.add("page-count");
      pageCount.innerText = `${book.pages}`;
    readToggle.classList.add("read-toggle");
      readToggle.type = "button";
      readToggle.addEventListener("click", () => {
        readToggle.classList.toggle("toggled");
        slider.classList.toggle("toggled");
        book.toggleRead();
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

    setTimeout( () => {
      card.classList.toggle("toggled"); // raises cards
    }, 100);
    setTimeout( () => {
      cardInset.style.opacity = "1";    // reveals card content
    }, 400);
  });
}

populateGrid();