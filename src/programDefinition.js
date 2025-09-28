const vscode = require("vscode");

const programDefinition = function (document, position, token) {
  // Get the word under the cursor
  const wordRange = document.getWordRangeAtPosition(position);
  const word = document.getText(wordRange);

  // Declare previousWord
  let previousWord;

  // Get the current word
  const currentWordRange = document.getWordRangeAtPosition(position);
  if (currentWordRange) {
    const currentWord = document.getText(currentWordRange);

    // Get text from start of line to the beginning of the current word
    const lineStart = new vscode.Position(currentWordRange.start.line, 0);
    const textBefore = document.getText(new vscode.Range(lineStart, currentWordRange.start));

    // Match the last word before the current one
    const match = textBefore.match(/(\w+)\W*$/);
    previousWord = match ? match[1] : undefined;
  }

  // Define variables
  let regex;
  let match;
  let location;

  // GOTO definitions
  if (previousWord == "GOTO") {
    let programText = "";
    let whileIndex = 0;
    let definitionFound = false;

    // Find nearest label definition upwards
    while (programText != word + ":" && programText != ".PROGRAM") {
      programText = document
        .lineAt(position.line - whileIndex)
        .text.trim()
        .split(" ")[0];
      if (programText != word + ":") {
        whileIndex++;
      } else {
        definitionFound = true;
      }
    }
    if (definitionFound == false) {
      whileIndex = 0;
      // Find nearest label definition downwards
      while (programText != word + ":" && programText != ".END") {
        programText = document
          .lineAt(position.line - whileIndex)
          .text.trim()
          .split(" ")[0];
        if (programText != word + ":") {
          whileIndex--;
        } else {
          definitionFound = true;
        }
      }
    }
    // Reset label location if definition was not found
    if (definitionFound == false) {
      whileIndex = 0;
    }
    // Return label location
    let myRange = new vscode.Range(document.lineAt(position.line - whileIndex).range.start, document.lineAt(position.line - whileIndex).range.end);
    location = new vscode.Location(document.uri, myRange);
    return location;
  }
  // Program definitions
  else {
    // Find program definition
    regex = new RegExp(`PROGRAM\\s+${word}\\b`, "g");
    match = regex.exec(document.getText());
    if (match) {
      const range = new vscode.Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length));
      // Return definition location
      const location = new vscode.Location(document.uri, range);
      return location;
    }
  }
  return null;
};

module.exports = programDefinition;
