/*
Author: Rajdeep Dev
Project: Library from The Odin Project
*/
const table = document.getElementById("table-body");

//array containing all book objects
let myLibrary = [];

//creates a new object
function Book(title, author, pages, read, id)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    if (read == "read")
    {
     this.read = true;
    }
    else this.read = false;
    this.delete = false;
    this.id = id;
}

//takes input parameters and stores them into array
function addToLibrary(title, author, pages, read)
{
    new_book = new Book(title, author, pages, read);
    myLibrary.push(new_book);
    new_book.id = myLibrary.length - 1;
}


//displays book in DOM
function displayBook()
{
    //erases the previous table contents because this function rewrites all the objects
    table.innerHTML = "";

    //loops through array inserting book details into table rows
    for (let i = 0; i < myLibrary.length; i++)
    {
        //this block of code specifies in which cell to put the values
        const row = table.insertRow(-1);
        const title = row.insertCell(0);
        const author = row.insertCell(1);
        const pages = row.insertCell(2);
        const read = row.insertCell(3);
        const del = row.insertCell(4);

        //creates a delete button
        const del_btn = document.createElement("BUTTON");
        del_btn.innerHTML = "Delete";
        del_btn.class = "del-btn";

        //creates a checkbox
        const read_box = document.createElement("input");
        read_box.type = "checkbox";
        read_box.class = "read-box";

        //this if statement makes sure we dont loop through deleted books otherwise the console.log starts complaining
        if (myLibrary[i] != undefined)
        {
            //checkbox is ticked if book is read
            if (myLibrary[i].read === true)
            {
                read_box.checked = true;
            }

            del_btn.id = myLibrary[i].id;
            read_box.id = del_btn.id;

            //listener for delete button
            del_btn.onclick = function(){
                btn_id = this.id;
                delete myLibrary[btn_id];
                console.log(btn_id);
                displayBook();
            };

            //listener for checkbox
            read_box.onclick = function(){
                box_id = this.id;
                if (myLibrary[box_id].read === false)
                {
                    myLibrary[box_id].read = true;
                }
                else
                {
                    myLibrary[box_id].read = false;
                }

            };

            //displaying the values into the table at the end
            title.innerHTML = myLibrary[i].title;
            author.innerHTML = myLibrary[i].author;
            pages.innerHTML = myLibrary[i].pages;
            del.appendChild(del_btn);
            read.appendChild(read_box);
        }

    }
}

//receives input from the user using form and adds values to the array using addToLibrary() function
document.getElementById("submit").onclick = function(){
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;

    addToLibrary(title, author, pages, read);
    displayBook();
};

// manually adding some books
addToLibrary("Great Expectations", "Charles Dickens", 554, "read");
addToLibrary("The Communist Manifesto", "Karl Marx", 226, "not yet read");
addToLibrary("Animal Farm", "George Orwell", 112, "read");
displayBook();
