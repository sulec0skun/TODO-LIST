const input= document.getElementById("input")
const add_button=document.getElementById("add_button")
const list = document.getElementById("list");
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
add_button.addEventListener("click", add);

  completed_delete_button.addEventListener("click", function () {
  todoList = todoList.filter(todo => !todo.completed);
  save();
  render();
});



function save() {
  localStorage.setItem("todos", JSON.stringify(todoList)); }

function render(){
  list.innerHTML = "";
const saved= localStorage.getItem("todos")
  if (saved) {
    todoList = JSON.parse(saved);
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

    }); } }

function add(){

  const text=input.value.trim()
  if (text==="") return;   
 
  let item= { 
  id: Date.now().toString() , 
  text_value : text ,
  completed: false 
  }

  todoList.push(item)
  input.value = ""; 
  save();
  render();
  }

window.onload= render;