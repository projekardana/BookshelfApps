document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('bookForm');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addData();
 
    });
});
 
// Function Membuat addData (Menambahkan Input Data)
 
function addData (){
    const bookItemTitle = document.getElementById('bookFormTitle').value;
    const bookItemAuthor = document.getElementById('bookFormAuthor').value;
    const bookItemYear = document.getElementById('bookFormYear').value;
    const bookIsComplete = document.getElementById('bookFormIsComplete').checked;
 
    const bookItem = generateId();
    const dataObject = generateDataObject(bookItem, bookItemTitle, bookItemAuthor, bookItemYear, bookIsComplete);
    books.push(dataObject);
 
    renderEvent(books);
    saveData();
 
}
 
function generateId () {
    return +new Date();
}
 
function generateDataObject(id, title, author, timestamp, isComplete) {
    return {
        id,
        title,
        author,
        year: Number(timestamp),
        isComplete,
    }
}
const books = [];

function renderEvent(books){
    const inCompleteBookList = document.getElementById('incompleteBookList');
    inCompleteBookList.innerHTML = '';

    const completeBOOKList = document.getElementById('completeBookList');
    completeBOOKList.innerHTML = '';
 
    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.isComplete){
            inCompleteBookList.append(bookElement);
        } else {
            completeBOOKList.append(bookElement);
        }
    }
}

// Fitur Search

const inputSearch = document.getElementById('searchBookTitle');
    
    document.getElementById('searchBook').addEventListener('click', function(event) {
        const inputSearch = document.getElementById('searchBookTitle').value;
        event.preventDefault();

        const filteredBooks = books.filter(function(key){
            return key.title.toUpperCase().includes(inputSearch.toUpperCase());
        })

        renderEvent(filteredBooks);
        saveData();

    });
 
// Function Tambah Data
 
function makeBook(dataObject) {
    const textData = document.createElement('h3');
    textData.innerText = dataObject.title;
 
    const textAuthor = document.createElement('h3');
    textAuthor.innerText = dataObject.author;
 
    const timestamp = document.createElement('h3');
    timestamp.innerText = dataObject.year;
 
    const checkButton = document.createElement("button");
    checkButton.innerText = "Selesai dibaca";
    checkButton.classList.add("green");
 
    const trashButton = document.createElement("button");
    trashButton.innerText = 'Hapus Data';
    trashButton.classList.add("red");
 
    const buttonEdit = document.createElement("button");
    buttonEdit.innerText = "Edit Data";
    buttonEdit.classList.add("blue");

    const bookIsComplete = document.createElement("checkbox");
    bookIsComplete.classList.add('bookFormIsCompleteCheckbox');
 
    const bookItem= document.createElement('div');
    bookItem.append(textData, textAuthor, timestamp);
    bookItem.append(checkButton, trashButton, buttonEdit, bookIsComplete);

    bookItem.setAttribute('data-testid', 'bookItem');
    textData.setAttribute('data-testid', 'bookItemTitle');
    textAuthor.setAttribute('data-testid', 'bookItemAuthor');
    timestamp.setAttribute('data-testid', 'bookItemYear');
    bookIsComplete.setAttribute('data-testid', 'bookFormIsCompleteCheckbox');

    trashButton.setAttribute('data-testid', 'bookItemDeleteButton');
    buttonEdit.setAttribute('data-testid', 'bookItemEditButton');

    if (dataObject.isComplete) {
        checkButton.innerText = "Belum Selesai";

        checkButton.addEventListener('click', function () {
        checkTaskFromComplete(dataObject.id);

        });

        buttonEdit.innerText = "Simpan Data";

        buttonEdit.addEventListener('click', function () {
            checkTaskFromComplete(dataObject.id);
        });

        bookItem.append(checkButton, trashButton);

    }else {

        checkButton.addEventListener('click', function () {
            addTaskToComplete(dataObject.id);

        });

        bookItem.append(checkButton);

    }

    trashButton.addEventListener('click', function () {
        removeTaskFromComplete(dataObject.id);
    });

    return bookItem;

}

// Function Add Task To Complete
function addTaskToComplete(dataId) {
    const dataTarget = findData(dataId);

    if (dataTarget == null) return;

    dataTarget.isComplete = true;
    renderEvent(books);
    saveData();
}

// Function findData
function findData(dataId){
    for (const bookItem of books) {
        if (bookItem.id === dataId) {
            return bookItem;
        }
    }

    return null;
}
// Function Hapus  Data
function removeTaskFromComplete(dataId) {
    const dataTarget = findDataIndex(dataId);
 
    if (dataTarget === -1) return;
 
    books.splice(dataTarget, 1);
    renderEvent(books);
    saveData();

}
 
function checkTaskFromComplete(dataId) {
    const dataTarget = findData(dataId);
 
    if (dataTarget == null) return;
 
    dataTarget.isComplete = false;
    renderEvent(books);
    saveData();
}

function findDataIndex(dataId) {
    for (const index in books) {
      if (books[index].id === dataId) {
        return index;
      }
    }
   
    return -1;
  }

function saveData(){
    if (isStorageExist()){
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        renderEvent(SAVED_EVENT);

    }
}

const SAVED_EVENT = 'books';
const STORAGE_KEY = 'Bookshelf_Apps';

function isStorageExist() /** Boolean */ {
    if (typeof (Storage) === undefined) {
        alert("Browser Kamu Tidak dukung LocalStorage");
        return false;
    }

    return true;
}

document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
});