const path = require('path');
const DatauriParser = require('datauri/parser');
const dUri = new DatauriParser();

exports.dataUri = (file) =>
    dUri.format(path.extname(file.originalname).toString(), file.buffer);