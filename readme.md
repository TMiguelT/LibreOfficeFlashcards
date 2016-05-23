# LibreOfficeFlashcards
## Introduction
This module is designed to be used for converting a LibreOffice document (for example lecture notes) into
Anki flashcards to assist in memorization.

## Installation
First you'll need to [install node](https://nodejs.org/en/download/) if you haven't already done so.

Secondly, install this application globally using `npm install -g libre-office-flashcards`
(for the non-programmers, you'll need to run this command in your Command Prompt/Terminal/Shell)

## Usage
First, you'll need to convert your document to HTML using LibreOffice's export function. Click
File, Export, and then save the file as HTML.

Next, run the application as follows:
`libre-office-flashcards /path/to/notes.html /path/to/anki/media`
The first argument is the path to the HTML file in question that you want to convert.
The second is the path to the Anki media folder for the user you want to import the flashcards for.
Refer to the [Anki Documentation](http://ankisrs.net/docs/manual.html#files) to find this folder.

Finally, you need to import the generated flashcard file. Simply open Anki with the same user whose
media folder you specified earlier, create a new deck and click File, Import. Set:
* Fields separated by: `|`
* Allow HTML in fields to `true` (checked)
Then click import.

You're finished!
