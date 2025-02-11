const columns = document.querySelectorAll(".column__cards");

let draggedCard;

const dragStart = (event) => {
    draggedCard = event.target;
    event.dataTransfer.effectAllowed = "move";
};
const dragOver = (event) => {
    event.preventDefault();
};

const dragEnter = ({ target }) => {
    if(target.classList.contains("column__cards")) {
        target.classList.add("column--highligth");
    }
};

const dragLeave = ({ target }) => {
    target.classList.remove("column--highligth");
};

const drop = ({ target }) => {
    if (target.classList.contains("column__cards")){
      target.classList.remove("column--highligth");
      target.append(draggedCard);
    }
};

const createCard = ({ target }) => {
    if (!target.classList.contains("column__cards")) return;
    const card = document.createElement("section") 
    card.className = "card";
    card.draggable = "true"

    card.addEventListener("focusout", () =>{
        card.draggable = "false"
        if (!card.textContent) card.remove();
    })

    card.contentEditable = "true";


    card.addEventListener("dragstart", dragStart);

    target.append(card);
    card.focus();
};

columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", drop);
    column.addEventListener("dblclick", createCard);
});

