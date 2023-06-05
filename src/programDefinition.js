const vscode = require("vscode");

const programDefinition = function(document, position, token) {
    // Get the word under the cursor
    const wordRange = document.getWordRangeAtPosition(position);
    const word = document.getText(wordRange);
    
    // Get the previous word
    const previousWordLine = document.lineAt(position);
    const previousWord = previousWordLine.text.trim().split(' ')[0];

    // Define variables
    let regex;
    let match;
    let location;

    // GOTO definitions
    if (previousWord=="GOTO"){
        let programText="";
        let whileIndex = 0;

        // Find nearest label definition
        while (programText != word+":") {
            programText = document.lineAt(position.line - whileIndex).text.trim().split(' ')[0];
            if(programText != word+":"){
                whileIndex++;
            }
        }
        
        // Return label location
        let myRange = new vscode.Range(document.lineAt(position.line - whileIndex).range.start,document.lineAt(position.line - whileIndex).range.end);
        location = new vscode.Location(document.uri, myRange);
        return location;
    }
    // Program definitions
    else{
        // Find program definition
        regex = new RegExp(`PROGRAM\\s+${word}\\b`, 'g');
        match = regex.exec(document.getText());
        if (match) {
            const range = new vscode.Range(
                document.positionAt(match.index),
                document.positionAt(match.index + match[0].length)
            );
            // Return definition location
            const location = new vscode.Location(document.uri, range);
            return location;
        }
    }
    return null;
}

module.exports = programDefinition;