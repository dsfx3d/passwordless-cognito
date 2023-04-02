// main.ts

import { zipFiles } from './zipFiles';

// Generated by ChatGPT using the gpt-4 model

/**
 * Entry point for the synchronous script that zips all files in a folder.
 * Expects the input and output paths from command-line arguments.
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('Usage: node main.js <source_folder> <output_zip_file>');
    process.exit(1);
  }

  const sourceFolder = args[0];
  const outputZipFile = args[1];

  try {
    zipFiles(sourceFolder, outputZipFile);
    console.log(`Successfully zipped files from ${sourceFolder} to ${outputZipFile}`);
  } catch (error) {
    console.error(`Error zipping files: ${error}`);
    process.exit(1);
  }
}

main();
