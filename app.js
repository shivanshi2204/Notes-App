/*const fs = require('fs')

fs.writeFileSync('notes.txt','This file was created by Node.js. ') //writes data to a  file, if it doesn't exist, it creates one and enters the data, if it exists, the text content will be overwritten
fs.appendFileSync('notes.txt', 'I am learning Node.js')*/

//Importing your own files using require fn 

/*require('./utils.js')*/

//const name= 'Shivanshi'
/*console.log(name) */ //now let's add a second file and try to define this variable in that second file
//app.js cannot use variables of utils.js and vice versa, even though it is loaded with require fn, so above code doesn,t work
//if we want other file to get executed, we have to require to get it loaded in

//const utilsname= require('./utils.js')
//console.log(utilsname)  //now it will work
 /*const add= require('./utils.js')
 const sum= add(4, -2)
 console.log(sum)*/
 //const validator= require('validator')

 

 const notes = require('./notes.js')
 //const msg= print()
 
 //console.log(msg)

 const chalk= require('chalk')
 const yargs= require('yargs')
 //console.log(chalk.green.bold.inverse('Success!'))
 //console.log(validator.isEmail('gmail.com'))
 //console.log(validator.isURL('https//mead.io'))

 //console.log(process.argv)
 /*const command= process.argv[2]
 if (command=== 'add'){
    console.log('Adding node!')
 }
 else if(command=== 'remove'){
     console.log('Removing node!')
 }*/
//customize yargs version 

//yargs.version('1.1.0')
// add, remove , list, read notes

//create add command
yargs.command({
    command: 'add',   //see notes
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,  //needs to be provided
            type: 'string'       //shoukd be a string
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        //console.log('Adding a new note!', argv)
        //console.log('Title: '+ argv.title)
        //console.log('Body: '+ argv.body)  //log body to console
        notes.addNote(argv.title, argv.body)
    }
})
//create remove command
yargs.command({
    command: 'remove',
    describe:  'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        //console.log('Removing a note!')
        notes.removeNote(argv.title)
    }
})
//create list command
yargs.command({
    command: 'list',
    describe:  'List your notes',
    handler(){ 
        //console.log('Listing out all notes!')
        notes.listNotes()
    }
})
//create read command
yargs.command({
    command: 'read',
    describe:  'Reading a note',
    handler(){
        console.log('Reading a note!')
    }
})
//console.log(yargs.argv)   //imp, we will not get any output without this
yargs.parse()   //otherwise use this