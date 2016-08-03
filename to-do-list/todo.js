window.onload = function() {

// the following code adds event listeners to the buttons
// you'll learn more about this later
// for this exercise, you are going to write the functions for
// what happens when the user clicks on the buttons.
  var saveButton = document.getElementById('save-button');
  saveButton.addEventListener('click', addToDoItem, false);

  var doneButton = document.getElementById('done-button');
  doneButton.addEventListener('click', markAsDone, false);


  function addToDoItem() {
    var textTaskNode = document.createTextNode(document.getElementById('todo-input').value);
    var todoNode = document.createElement('li');
    todoNode.appendChild(textTaskNode);
    var todoList=document.getElementsByClassName("todo-list-items")[0];
    todoList.appendChild(todoNode);
    document.getElementById('todo-input').value="";

    // add your code here
    // this should create a new list item in the to-do list
    // and set the text as the input from the todo-input field
  }

  function markAsDone() {
    var firstTodoList=document.getElementsByTagName('ul')[0].getElementsByTagName('li')[0];
    firstTodoList.classList.add('done');
    var doneList=document.getElementsByClassName("done-list-items")[0];
    doneList.insertBefore(firstTodoList, doneList.childNodes[0]);

    // doneButton.classList.add('liked');
    // doneButton.innerHTML = "Liked!";
    // document.querySelector('h1').style.color = "red";
  }
  
}
