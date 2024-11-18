const express = require('express');
const multer  = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });


const app = express();


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
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  res.json({ message: 'File uploaded successfully!' });
});

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
