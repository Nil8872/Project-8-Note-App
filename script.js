const btn = document.querySelector('.btn');
const app = document.querySelector('.app');




const addNote = ()=>{
    const notes = getElements();
    const noteObj = {
        id: Math.floor(Math.random() *100000),
        content : "",
    }
    const element = createElement(noteObj.id, noteObj.content);
    app.insertBefore(element, btn);
    notes.push(noteObj);
    saveElement(notes);
}
btn.addEventListener('click', addNote);

const createElement = (id, content)=>{
    const element = document.createElement('textarea');
    element.classList.add('textarea');
    element.placeholder = "Empty Note";
    element.value = content;

    element.addEventListener('dblclick',()=>{
        const warning = confirm('You have to delete this note?');
        if(warning){
            deleteElement(id, element);
        }
    }) 

    element.addEventListener('input',()=>{
        updateNote(id, element.value);
    })
    return element;
}
const deleteElement = (id, element)=>{
    const notes = getElements().filter(node=> node.id != id);
    saveElement(notes);
    app.removeChild(element);
    
}
const updateNote = (id, content)=>{
    const notes = getElements();
    const target = notes.filter(node => node.id == id)[0];
    console.log(target);
    target.content = content;
    saveElement(notes);
}

const saveElement = (notes)=>{
    localStorage.setItem('node-app', JSON.stringify(notes))
}
const getElements = ()=>{
    const noteObj = localStorage.getItem('node-app');
    return JSON.parse(noteObj || "[]");
}
getElements().forEach((note) => {
    const element = createElement(note.id, note.content);
    app.insertBefore(element,btn);
});


 