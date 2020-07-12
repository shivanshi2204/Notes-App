const fs= require('fs')
const chalk= require('chalk')
const getNotes= ()=>{
    return 'Your notes...'
}
 
const addNote= (title,body) => {   
    const notes= loadNotes()
    const duplicateNotes= notes.filter((note) => note.title=== title)
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
        const dataBuffer= fs.readFileSync('notes.json')  
        const dataJSON= dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e){
        return []   //first item will be sved into this array
    }   
     
}

module.exports= {   
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
}
