const input= document.getElementById("input")
const add_button=document.getElementById("add_button")
let list = document.getElementById("list");
const completed_delete_button=document.getElementById("completed_delete_button")

function remove_ (event){
 const li = event.target.parentElement;
  const idx = todoList.findIndex(item => item.id === li.id);
  if (idx > -1) todoList.splice(idx, 1);
  li.remove();
    save();
}

function edit_ (event){
let edited_list=event.target.parentElement
const currentText = edited_list.childNodes[1].nodeValue.trim()
const newText = prompt("type again", currentText)
if (newText !== "") { edited_list.childNodes[1].nodeValue = newText 
  const idx = todoList.findIndex(item => item.id === edited_list.id);
    if (idx > -1) todoList[idx].text_value = newText;
  }
   save();
}
 

function checkbox_(event){
  const li = event.target.parentElement;
  const idx = todoList.findIndex(item => item.id === li.id);
  if (idx > -1) todoList[idx].completed = event.target.checked;
   save();
}

let todoList=[] ;
 let counter=0 ;


function save() {
  if (todoList.length)
  localStorage.setItem("todos", JSON.stringify(todoList));



//window.onload = function () {
  
  let saved = localStorage.getItem("todos");
  if (saved) {
    todoList = JSON.parse(saved);
    list=document.createElement("ul")
    todoList.forEach(todo => {
      const new_li = document.createElement("li");
      new_li.textContent = todo.text_value;
      new_li.className = "madde";
      new_li.id = todo.id;

      const check_box = document.createElement("input");
      check_box.type = "checkbox";
      check_box.checked = todo.completed;
      check_box.addEventListener("click", checkbox_);
      new_li.prepend(check_box);

      const remove_button = document.createElement("button");
      remove_button.textContent = "remove";
      remove_button.className = "button";
      remove_button.addEventListener("click", remove_);
      new_li.appendChild(remove_button);

      const edit_button = document.createElement("button");
      edit_button.textContent = "edit";
      edit_button.className = "button";
      edit_button.addEventListener("click", edit_);
      new_li.appendChild(edit_button);

      list.appendChild(new_li);

      const idNum = parseInt(todo.id); //.replace("li", ""));
      if (idNum >= counter) counter = idNum + 1;
    });
}; }



function add(){
    const text=input.value.trim()
    if (text==="") return;  

    /*const new_li=document.createElement("li")
    new_li.textContent=text
    new_li.className="madde"
    new_li.id = "li" + counter;
   

    const check_box= document.createElement("input")
    check_box.type="checkbox"
    check_box.addEventListener("click", checkbox_)
    

    const edit_button=document.createElement("button")
    edit_button.textContent="edit"
    edit_button.id="edit_button"
    edit_button.className="button"
    edit_button.addEventListener("click", edit_)


    const remove_button=document.createElement("button")
    remove_button.textContent="remove"
    remove_button.id="remove_button"
    remove_button.className="button"
    remove_button.addEventListener("click", remove_)
  
    new_li.prepend(check_box)
    new_li.appendChild(remove_button)
    new_li.appendChild(edit_button)
    list.appendChild(new_li); */

     let item= { //yalnız obje ouuşturup arraye göndermek
  id: counter , //new_li.id ,
  text_value : text ,
  completed: false
       }

    
    todoList.push(item)
     counter+=1
     input.value = ""; 

      save();

  }
 
add_button.addEventListener("click", add);

completed_delete_button.addEventListener("click", function () {
  todoList.forEach(todo => {
    if (todo.completed) {
      const li_checked = document.getElementById(todo.id);
      if (li_checked) li_checked.remove();
    }
  });

  todoList = todoList.filter(todo => !todo.completed); 
  save();
}); 
window.onload= save;






