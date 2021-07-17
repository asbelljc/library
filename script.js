let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
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


// TODO - We can do something like this to set the checkbox to whatever the toggle is set to,
// but I'm not sure if it is needed. I'm wondering if the checkboxes themselves are actually needed.
// Can we just set the initial toggle state to match the database, and then update the database based
// on the toggle?
// One more thing to consider - when new cards get deleted from the UI, they should also be deleted from
// the database. But for the array in memory, we can probably just leave them in the array with a flag
// that incidates deletion. This way, our indexing is not messed up and we don't slow things down by
// creating a new array after each delete.
// Also, putting a reminder here to talk about "soft" deletes versus actual deletes.
let toggles = document.querySelectorAll('label[id="readToggle"]');

for (let index=0; index < toggles.length; ++index) {
  if (toggles[index].classList.contains("toggled")) {
    console.log("toggled class is present, so setting myCheckbox.checked to true");
    
    let myCheckbox = document.querySelector('input[id="mycheckbox"]');
    myCheckbox.checked = "true";
  } else {
    console.log("toggled class is not present, so setting myCheckbox.checked to false");
    
    let myCheckbox = document.querySelector('input[id="mycheckbox"]');
    myCheckbox.checked = "false";
  }
}


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

const readToggle2 = document.getElementsByClassName("read-toggle")[1];

readToggle2.addEventListener("click", () => {
  readToggle2.classList.toggle("toggled");
  readToggle2.firstElementChild.classList.toggle("toggled");

  let myCheckbox = document.querySelector('input[id="mycheckbox"]');
  console.log("myCheckbox.checked is " + myCheckbox.checked + ", setting to " + !(myCheckbox.checked));
  myCheckbox.checked = !(myCheckbox.checked);
  // TODO - This is where the API call will happen for marking a book read/unread
});

function toggleDelete() {
  deleteButton.classList.toggle("toggled");
}

deleteButton.addEventListener("click", () => {
  toggleDelete();
  setTimeout(toggleDelete, 500);
  document.getElementsByClassName("card")[0].classList.toggle("toggled");
});