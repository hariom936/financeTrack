import fs from 'fs';
import path from 'path';

const action = process.argv;

async function main(arg) {
  const seedCommand = arg[2];
  const filesName = arg[3]?.split(',');
  const allSeedingFiles = fs.readdirSync(path.join(__dirname, '../', 'appData/seeds'));
  let tempFiles = [];
  
  if (!filesName) {
    seeding(allSeedingFiles, seedCommand);
  } else {
    for (const file of filesName) {
      let indexVal = allSeedingFiles.findIndex(item => item.includes(file));
      if (indexVal !== -1) {
        tempFiles.push(allSeedingFiles[indexVal]);
      } else {
        console.error(`File ${file} not found in seeding files.`);
      }
    }
    seeding(tempFiles, seedCommand);
  }
}

async function seeding(fileNames, seedCommand = 'up') {
  for (const file of fileNames) {
    const fileName = path.basename(file, '.js');
    let seeder;

    try {
      seeder = require(`../appData/seeds/${fileName}`);
    } catch (err) {
      console.error(`Error requiring file: ../appData/seeds/${fileName}.js`);
      console.error(err);
      continue;
    }

    if (typeof seeder[seedCommand] !== 'function') {
      console.error(`Error: ${seedCommand} is not a function in ${file}`);
      continue;
    }

    try {
      await seeder[seedCommand]();
      console.log(`  ${file} \x1b[92m \u2714 \x1b[0m`);
    } catch (err) {
      console.error(`Error executing ${seedCommand} in ${file}`);
      console.error(err);
    }
  }
  console.log('Done!');
  process.exit(0);
}

main(action);


