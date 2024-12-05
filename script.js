let inputBx = document.querySelector('#inputBx');
let list = document.querySelector('#list');

window.onload = function () {
    let savedItems = JSON.parse(localStorage.getItem('todoList')) || [];
    savedItems.forEach(item => addItem(item));
};

inputBx.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        let value = this.value.trim();
        if (value) {
            addItem(value);
            this.value = ""; 
            saveList();  
        }
    }
});

let addItem = (itemText) => {
    let listItem = document.createElement("li"); 

    let itemTextNode = document.createTextNode(itemText); 
    listItem.appendChild(itemTextNode); 

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "✖"; 
    deleteButton.onclick = function () {
        listItem.remove(); 
        saveList();  
    };

    listItem.appendChild(deleteButton); 
    list.appendChild(listItem); 
};

let saveList = () => {
    let items = [];
    let listItems = document.querySelectorAll('#list li');
    listItems.forEach(item => {
        items.push(item.textContent.replace("✖", "").trim());
    });
    localStorage.setItem('todoList', JSON.stringify(items));
};

fetch("https://cors-casillo.awskeytech.com/https://zenquotes.io/api/today")
.then(data => data.json())
.then(data => {
    console.log(data)
    document.getElementById("quoteOOD").innerText = "\"" + data[0].q + "\""
})