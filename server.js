const express = require('express');
const multer  = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });
const { Client } = require('pg');

const app = express();

const cn = {
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'myDatabase',
    user: 'myUser',
    password: 'myPassword'
};

app.post('/upload', upload.single('file'), (req, res) => {
  // The file information is in req.file
  const file = req.file;
  console.log(req.file);
  var fileName = req.body.fileName;
  // Here you can handle the file, e.g., save it to a database or process it further
  fs.rename(file.path, 'uploads/' + fileName + ".pdf", (err) => {
    if (err) {
      console.error('Error moving file:', err);
      // res.status(500).json({ error: 'Failed to upload file' });
    } else {
      console.error('message:', 'success');

      // res.json({ message: 'File uploaded successfully' });
    }
  });
  res.json({ message: 'File uploaded successfully!' });
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
