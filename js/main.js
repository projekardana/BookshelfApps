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
 
    const bookItem = generateId();
    const dataObject = generateDataObject(bookItem, bookItemTitle, bookItemAuthor, bookItemYear, false);
    books.push(dataObject);
 
    document.dispatchEvent(new Event(RENDER_EVENT));
 
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
const RENDER_EVENT = 'render-book';

document.addEventListener(RENDER_EVENT, function () {
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
    checkButton.innerText = "Selesai";
    checkButton.classList.add("green");
 
    const trashButton = document.createElement("button");
    trashButton.innerText = 'Hapus';
    trashButton.classList.add("red");
 
    const buttonEdit = document.createElement("button");
    buttonEdit.innerText = "Edit";
    buttonEdit.classList.add("blue");
 
    const bookItem= document.createElement('div');
    bookItem.append(textData, textAuthor, timestamp);
    bookItem.append(checkButton, trashButton, buttonEdit)
    bookItem.setAttribute('data-testid', 'bookItem');
    textData.setAttribute('data-testid', 'bookItemTitle');
    textAuthor.setAttribute('data-testid', 'bookItemAuthor');
    timestamp.setAttribute('data-testid', 'bookItemYear');
 
    trashButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
    trashButton.setAttribute('data-testid', 'bookItemDeleteButton');
    trashButton.setAttribute('data-testid', 'bookItemEditButton');
 
    if (dataObject.isComplete) {
        const checkButton = document.createElement("checkbox");
        checkButton.classList.add('bookItemIsCompleteButton');
 
        checkButton.addEventListener('click', function () {
            checkTaskFromComplete(dataObject.id);
        });

        const trashButton = document.createElement("button");
        trashButton.classList.add('bookItemDeleteButton');

        trashButton.addEventListener('click', function () {
            removeTaskFromComplete(dataObject.id);
        });

        bookItem.append(checkButton, trashButton);
    }else {
        const checkbutton = document.createElement('button');
        checkbutton.classList.add('bookItemIsCompleteButton');

        checkbutton.addEventListener('click', function () {
            addTaskToComplete(dataObject.id);
        });

        bookItem.append(checkbutton);

    }
    return bookItem;

}

// Function Add Task To Complete
function addTaskToComplete(dataId) {
    const dataTarget = findData(dataId);

    if (dataTarget == null) return;

    dataTarget.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
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
    document.dispatchEvent(new Event(RENDER_EVENT));
}
 
function checkTaskFromComplete(dataId) {
    const dataTarget = findData(dataId);
 
    if (dataTarget == null) return;
 
    dataTarget.isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function findDataIndex(dataId) {
    for (const index in books) {
        if (books[index].id === dataId) {
            return index;
        }
    }

    return -1;
}