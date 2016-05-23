//Imports
const cheerio = require('cheerio')
const _ = require('lodash')
const fs = require('fs');
const dataUriToBuffer = require('data-uri-to-buffer');
const path = require('path')
const fileUrl = require('file-url')

//Program Args
const file = process.argv[2]
const baseName = path.basename(file)
const mediaDir = process.argv[3]
if (!file.length || !mediaDir.length)
    console.log('Usage: node index.js notes.html anki_media_dir')

//Common Variables
const questions = []
const contents = fs.readFileSync(file, "utf-8");
const $ = cheerio.load(contents);
const headings = 'h1, h2, h3, h4, h5, h6'
const dir = path.dirname(file)

//Convert the images into files
$('img').each((i, img) => {
    const $img = $(img);
    const src = $img.attr('src')
    const data = dataUriToBuffer(src);
    const matches = new RegExp("data:image/(.+);").exec(src);
    const type = matches[1] == '*' ? 'png' : matches[1];

    //Write to file
    const filename = `${mediaDir}/${baseName}_${i}.${type}`
    fs.writeFileSync(filename, data, 'utf8')

    //Update img element
    const relative = path.relative(mediaDir, filename)
    $img.attr('src', relative)
})

//Gather each question using the headings
$(headings).each((i, heading) => {
    const $heading = $(heading);
    const questionElement = $heading.find('span[title="annotation"] span')
    if (questionElement.length) {
        questions.push({
            question: questionElement.last().html(),
            answer: $heading.nextUntil(headings).html().replace('\n', '')
        })
    }
})

//Write the output to a file
const outfile = fs.openSync(`${file}.txt`, 'w')
questions.forEach(question => {
    fs.write(outfile, question.question.replace('\n', '') + ' | ' + question.answer.replace('\n', '') + '\n');
})
fs.closeSync(outfile)
