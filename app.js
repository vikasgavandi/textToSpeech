const gtts = require('node-gtts')('en');
let path = require('path');

const inputText = "rheumatoid arthritis";


gtts.save("audio.mp3", `${inputText}`, function(){
    console.log("file converted succesfully");
})