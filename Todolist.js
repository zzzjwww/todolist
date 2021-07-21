const listItems = document.querySelector("#list");
const newItems = document.querySelector(".input-form");
const items = JSON.parse(localStorage.getItem("items")) || [];



function addItem(e) {
    e.preventDefault();
    const textInput = this.querySelector("#new-item-field").value;
    const item = {
        text: textInput,
        done: false
    }
    if (textInput !== "") {
        items.push(item);

        makeList(items, listItems);
        localStorage.setItem("items", JSON.stringify(items));
    }else {
        alert("Do nothing can not have a place on the to do list👎🏼")
    }
    this.reset();
}

function makeList(arr = [], list) {
    list.innerHTML = arr.map((ele, index) => {
        return `
        <li>
        <input type="checkbox" data-index=${index} id="item${index}" ${ele.done ? "checked" : ""}>
        <label for="item${index}">${ele.text}</label>
        <button data-index=${index}>✕ Delete</button>
        </li>
        `
    }).join("");
}

function toggle(e) {
    if (!e.target.matches("input")) return;
    const ele = e.target;
    items[ele.dataset.index].done = !items[ele.dataset.index].done;
    localStorage.setItem("items", JSON.stringify(items));
    // makeList(items,listItems);

}

function removeItem(e) {
    if (!e.target.matches("button")) return;
    const ele = e.target;
    items.splice((ele.dataset.index), 1);
    localStorage.setItem("items", JSON.stringify(items));
    makeList(items, listItems);
}

//get existing list from local storage
makeList(items, listItems);

//Add new item and run addItem founction 
newItems.addEventListener("submit", addItem);
//Toggle checkboxes to flip done to !done and save state to local storage
listItems.addEventListener("click", toggle);

listItems.addEventListener("click", removeItem);


