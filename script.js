const dialogBox = document.getElementById("dialog_Box");
const plus = document.getElementById("plus_button");
const cross = document.getElementById("cross_button");
const todo_container = document.querySelector(".content");
const todo_title = document.getElementById("title_text");
const todo_Text = document.getElementById("todo_text");
const error = document.querySelector(".disappear");
// function mini(){
//     let minarr=document.querySelectorAll(".min");
//     for(let i=0;i<minarr.length;i++){
//         minarr[i].addEventListener("click",minimize)

//     }
// function minimize(e){
//     console.log("min");
//     let box=e.target.closest("dialog-box");
//     let text_min=box.querySelector("todo_text");
//     if(text_min.style.display!=="none"){
//         text_min.style.display="none";
//     }
//     else{
//         text_min.style.display="flex";
//     }
// }
// }
let editMode = -1;
let counter = 0;
let data = JSON.parse(localStorage.getItem("todos")) || [];
counter = data.length;
for (let i = 0; i < data.length; i++) {
    let task = `<div class="box" todo-id='${i}'>
    <div class="box-header" >
        <div class="title">
        <span id="title-text">
            ${data[i].title}
            </span>
        
        <i class="fa fa-edit" style="font-size:24px" margin-left:20px;></i>
        </div>
        <div class="min">-</div>

        <div class="button_container">
            <button>x</button>
        </div>
    </div>
    <textarea class="todo_text">${data[i].text}</textarea>
</div>`;
    todo_container.innerHTML += task;

}
deletelisteners();

plus.addEventListener("click", function () {
    dialogBox.style.display = "flex";

});
cross.addEventListener("click", function () {
    dialogBox.style.display = "none";
    todo_title.value = "";
    todo_Text.value = "";
    error.classList.add("disappear");

});
function addTodo() {
    if (todo_title.value !== "" && todo_Text.value !== "") {
        // GET the old data [] from local storage
        let todos = JSON.parse(localStorage.getItem("todos")) || [];
        if (editMode != -1) {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id == editMode) {
                    todos[i].title = todo_title.value;
                    todos[i].text = todo_Text.value;
                }
            }
            localStorage.setItem("todos", JSON.stringify(todos));
            let todo = document.querySelector(`[todo-id='${editMode}']`);
            todo.querySelector("#title-text").innerText = todo_title.value;
            todo.querySelector(".todo_text").innerText = todo_Text.value;
            editMode = -1;
            dialogBox.style.display = "none";
            return;
        }
        let task = `<div class="box" todo-id='${counter}'>
                <div class="box-header">
                    <div class="title">
                         <span id="title-text">
                            ${todo_title.value}
                        </span>
        
                       <i class="fa fa-edit" style="font-size:24px" margin-left:20px;></i>
                     </div>
                     <div class="min">-</div>
                  <div class="button_container">
            
                 <button>x</button>
                 </div>
              </div>
    <textarea class="todo_text">${todo_Text.value}</textarea>
</div>`;

        todo_container.innerHTML += task;
        deletelisteners();
        // add the new todo to the old data
        todos.push({
            id: counter,
            title: todo_title.value,
            text: todo_Text.value
        });
        counter += 1
        // set the new data to local storage
        localStorage.setItem("todos", JSON.stringify(todos));
        todo_title.value = "";
        todo_Text.value = "";
        dialogBox.style.display = "none";
        error.style.display = "none";
    } else {
        error.classList.remove("disappear");
    }
}
function deletelisteners() {
    const delarr = document.querySelectorAll(".button_container button");
    const editarr = document.querySelectorAll(".title i");
    for (let i = 0; i < delarr.length; i++) {
        delarr[i].addEventListener("click", function (e) {
            let todo = e.target.closest(".box");
            console.log(todo);
            let id = todo.getAttribute("todo-id");
            console.log(id);
            let data = JSON.parse(localStorage.getItem("todos"));
            let newData = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].id != id) {
                    newData.push(data[i]);
                }
            }
            console.log(newData);
            localStorage.setItem("todos", JSON.stringify(newData));
            todo.classList.add("disappear");
        });
        editarr[i].addEventListener("click", function (e) {
            dialogBox.style.display = "flex";
            let todo = e.target.closest(".box");
            let id = todo.getAttribute("todo-id");
            editMode = id;
            todo_title.value = todo.querySelector("#title-text").innerText;
            todo_Text.value = todo.querySelector(".todo_text").innerHTML;
        });

    }
}

