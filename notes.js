const fs= require('fs')
const chalk= require('chalk')
const getNotes= ()=>{
    return 'Your notes...'
}
 
const addNote= (title,body) => {   //function responsible for adding a note
    const notes= loadNotes()
    //console.log(notes)
    //check if the title already exists by 'array filter method'

    //const duplicateNotes= notes.filter(function(note){
      //  return note.title=== title   //if we returj true, filter is going to keep that individual note in the new array calling it a duplicate if we return false, it will no keep it into the array saying its not ab duplicate
    //})

    const duplicateNotes= notes.filter((note) => note.title=== title)
          //if we returj true, filter is going to keep that individual note in the new array calling it a duplicate if we return false, it will no keep it into the array saying its not ab duplicate
    //in place of above, we can also stop the process once we find duplicates
    const duplicateNote = notes.find((note) => note.title===title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
    saveNotes(notes)
    console.log(chalk.green.inverse('New note added!'))
    }
    else{
        console.log(chalk.yellow.inverse('Note title taken'))
    }
}

const removeNote= (title) => {
    //console.log(title)
    const notes= loadNotes()

    const notesToKeep= notes.filter((note)=> note.title!== title)
    
    if(notes.length >  notesToKeep.length){
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    }
    else{
        console.log(chalk.red.inverse('No note found!'))
    }
    


}

const listNotes= () => {
    console.log(chalk.inverse('Your Notes'))
    const notes= loadNotes()

    notes.forEach((note)=>{
        console.log(note.title)
    })


}



const saveNotes= (notes)=> {   //stringify the data and save it in file system
    const dataJSON= JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes= () => {
    try{
        const dataBuffer= fs.readFileSync('notes.json')  //1. either make a file 2. write a defensive code that runs even if the file doesn't exist
        const dataJSON= dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e){
        return []   //first item will be sved into this array
    }

    
     
}

module.exports= {   //to export many items, instead of setting it equal to a fn, we will be setting it equal to an object instead
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
}
