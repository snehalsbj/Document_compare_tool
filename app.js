const fs = require('fs');
const express = require('express');
const multer = require('multer');
const app = express();
const path = require('path');

app.use(express.static('public'));

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Load the sample document content
const sampleContent = fs.readFileSync('sample.txt', 'utf-8');

app.post('/compare', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.send('No file uploaded');
    }

    // Read the content of the uploaded file
    const uploadedContent = fs.readFileSync(req.file.path, 'utf-8');

    // Compare the uploaded file content with the sample content
    const isMatch = uploadedContent === sampleContent;

    // Send a simple match or no-match result
    const result = isMatch ? 'The documents are identical.' : 'The documents are different.';
    
    // Delete the uploaded file after comparison
    fs.unlinkSync(req.file.path);

    res.send(result);
});

const PORT = 3003;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
