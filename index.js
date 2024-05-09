const express = require('express');
const bodyParser = require('body-parser');
var gtts = require('node-gtts')('en');
const fs = require('fs');
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Route for rendering the index page
app.get('/', (req, res) => {
    res.render('index');
});

// Route for handling POST requests to convert text to speech
app.post('/', async (req, res) => {
    const text = req.body.text;
    
    if (!text) {
        return res.status(400).send('Text is required');
    }

    // Create a new gTTS instance with language 'en' (English)
    const speech =  new gtts(text, 'en');

    try {
        // Generate speech and save to a file named 'output.mp3'
        const filePath = 'output.mp3';
        await speech.save(filePath);

        // Send the generated audio file as a download
        res.download(filePath, 'output.mp3', (err) => {
            // Clean up: delete the generated file after download
            if (err) {
                console.error('Download error:', err);
            }
            fs.unlinkSync(filePath);
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
