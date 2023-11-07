const app = {
  data: {
    url: "http://localhost:3000/notes",
    notes: [],
  },

  /*methods */
  getNotes: function () {
    fetch(this.data.url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    .then((r) => r.json())
    .then((response) => { 
      for (let note of response) {
        this.data.notes.push(note)
      };
      this.generateNotesHTML()
    }
    )
  },
  
  generateNotesHTML: function() {
  let container = document.getElementById("container");
  for (let note of this.data.notes){
  container.innerHTML += `
  <div class="noteCard">
  <div>${note.title}</div>
  <div>${note.body}</div>
  <button data-id=${note.id}>EDIT</button>
  <button class="deleteButton" data-id=${note.id}>DELETE</button>
  </div>`
  }
  this.addEventListeners();
}

createNote: function() {
  let notesTitle = document.getElementById('title').value;
  let notesBody = document.getElementById('body').value;
  let wholeNote = {title:notesTitle, body:notesBody};
  fetch(this.data.url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(wholeNote)
  })
  .then((r) => r.json())
  .then((response) => { 

  }
  )

}

displayCreateForm: function() {
  /* displays form */
}

deleteNote: function(noteId) {
fetch(this.data.url +noteId, {
  method: 'DELETE',
  headers: {"Content-Type":  "application/json"}
})
.then(r => r.json())
.then(response => {
/* Delete object from this.data.notes */
this.generateNotesHTML();

})


},

confirmDelete: function() {

}

displayEditForm: function(note) {
  let form = document.getElementById('container')
  for (let note of this.data.notes) {
    container.innerHTML += `
    <div class="noteCard">
    <div>${note.title}</div>
    <div>${note.body}</div>
    <button data-id=${note.id}>EDIT</button>
    <button class="deleteButton" data-id=${note.id}>DELETE</button>
    </div>`
  }
  this.addEventListeners();
},

addEventListeners: function() {
  let deleteButtons = document.querySelectorAll(".deleteButton");
  for (let button of deleteButtons) {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      this.deleteNote(button.dataset.id);
    })
    }
  },

  main: function() {


    this.getNotes()
  }

}

app.main()
