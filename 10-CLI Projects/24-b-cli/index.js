#!/usr/bin/env node
const path = require('path')
const copy = require('copy-template-dir')
const vars = { name: 'Nelson' }

const inDir = path.join(__dirname, 'template'); // This one creates cwd relative to the CLI
const outDir = path.join(process.cwd(), 'output'); // This prints to the current directory
copy(inDir, outDir, vars, ((err, createdFiles) => {
    if (err) throw err
    createdFiles.forEach(filePath => console.log(`Created ${filePath}`))
    console.log('done!');

}))






