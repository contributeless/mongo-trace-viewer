import path from 'path';
import fs from 'fs';
import util  from 'util';

export const writeFileAsyncRecursive = async (filename: string, content: string) => {
  const exists = util.promisify(fs.exists);
  const writeFile = util.promisify(fs.writeFile);
  const mkdir = util.promisify(fs.mkdir);
  
  const folders = filename.split(path.sep).slice(0, -1)
  if (folders.length) {
    const directoriesToCreate = [];
    // create folder path if it doesn't exist
    folders.reduce((last, folder) => {
      const folderPath = last ? last + path.sep + folder : folder;
      directoriesToCreate.push(folderPath);
      return folderPath
    })

    for(let i= 0; i < directoriesToCreate.length; i++){
      const folderPath = directoriesToCreate[i];
      if (!await exists(folderPath)) {
        await mkdir(folderPath)
      }
    }
  }

  await writeFile(filename, content, {
    encoding: "utf8",
    flag: 'w'
  });
}

export const isEmpty = (value: any): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};
