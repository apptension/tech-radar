import Busboy = require('busboy');

interface ParseFileReturn {
  file: any;
  fileName: string;
  fileType: string;
}

export const parseFile = (headers: any, buffer: any): Promise<ParseFileReturn> => {
  return new Promise((resolve) => {
    const bb = Busboy({ headers });

    let fileName: string;
    let fileType: string;
    let readyFile = {};

    bb.on('file', (_, file, info) => {
      const { filename, mimeType } = info;
      fileName = filename;
      fileType = mimeType;
      file.on('data', (data) => {
        readyFile = data;
      });
    }).on('finish', function () {
      resolve({ file: readyFile, fileName, fileType });
    });

    bb.end(buffer);
  });
};
