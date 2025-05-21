const vscode = require("vscode");

// Formatting logic
class projectFormatter {
  provideDocumentFormattingEdits(document, options, token) {
    // Get the full range of the document
    const fullRange = new vscode.Range(document.lineAt(0).range.start, document.lineAt(document.lineCount - 1).range.end);

    // Get the text of the document
    const text = document.getText();

    // Format the code
    const formattedText = formatCode(text, "as", document.lineCount - 1);

    // Create a TextEdit representing the formatting changes
    const edit = new vscode.TextEdit(fullRange, formattedText);

    // Return an array of TextEdits
    return [edit];
  }
}

function formatCode(code, languageId, lineCount) {
  // Indentation Rules
  increaseIndentPattern = [
    "^\\s*\\.PROGRAM\\b",
    "^\\s*IF\\b.*\\bTHEN\\b",
    "^\\s*ELSE\\b",
    "^\\s*WHILE\\b.*\\DO\\b",
    "^\\s*DO\\b",
    "^\\s*FOR\\b.*\\TO\\b",
    "^\\s*CASE\\b.*\\OF\\b",
    "^\\s*SCASE\\b.*\\OF\\b",
    "^\\s*VALUE\\b",
    "^\\s*ANY\\b",
    "^\\s*SVALUE\\b",
    "^\\s*\\.TRANS\\b",
    "^\\s*\\.JOINTS\\b",
    "^\\s*\\.REALS\\b",
    "^\\s*\\.STRINGS\\b",
    "^\\s*\\.INTEGER\\b",
    "^\\s*\\.ROBOTDATA1\\b",
    "^\\s*\\.OPE_INFO1\\b",
    "^\\s*\\.SYSDATA\\b",
    "^\\s*\\.CONDITION\\b",
    "^\\s*\\.AUXDATA\\b",
    "^\\s*\\.INTER_PANEL_D\\b",
    "^\\s*\\.INTER_PANEL_TITLE\\b",
    "^\\s*\\.INTER_PANEL_COLOR_D\\b",
    "^\\s*\\.SIG_COMMENT\\b",
    "^\\s*\\.CBSDATA\\b",
    "^\\s*\\.LOCAL_PROGRAM\\b",
  ];
  decreaseIndentPattern = ["^\\s*\\.END\\b", "^\\s*END\\b", "^\\s*.End\\b", "^\\s*ELSE\\b", "^\\s*UNTIL\\b", "^\\s*VALUE\\b", "^\\s*SVALUE\\b", "^\\s*ANY\\b"];

  // Variables
  let indentationLevel = 0;
  let formattedLines = [];

  // Separate code into lines
  const lines = code.split("\n");

  // Format code
  for (let i = 0; i < lines.length; i++) {
    // Create test line without start whitespaces and end line comments
    let testLine = lines[i].trimStart();

    // Check if it is a comment line
    let comment = false;
    if (testLine[0] == ";") {
      comment = true;
    } else {
      // If it is not a comment line, remove comments from testline
      testLine = testLine.split(";")[0];
    }

    // Check if line is empty and replace with comment
    if (testLine == "" && lineCount != i) {
      lines[i] = ";\r";
    }

    // Check if it is a Program definition
    let program = false;
    const programRegExp = new RegExp("^\\s*\\.PROGRAM\\b");
    if (programRegExp.test(testLine) == true) {
      indentationLevel = 0;
      program = true;
    }

    // Loop through decrease patterns and see if matches
    decreaseIndentPattern.forEach((pattern, index) => {
      const regExpPattern = new RegExp(pattern);
      if (regExpPattern.test(testLine) == true && comment == false) {
        indentationLevel--;
        if (indentationLevel < 0) {
          indentationLevel = 0;
        }
      }
    });

    // Calculate indentation according to level
    let indentation = "";
    for (let level = 0; level < indentationLevel; level++) {
      indentation = indentation + "    ";
    }

    // Format line
    formattedLines.push(indentation + lines[i].trimStart());

    // Loop through increase patterns and see if matches
    increaseIndentPattern.forEach((pattern, index) => {
      const regExpPattern = new RegExp(pattern);
      if (regExpPattern.test(testLine) == true && comment == false) {
        indentationLevel++;
        program = false;
      }
    });
  }

  // Join lines together
  let result = "";
  formattedLines.forEach((line, index) => {
    result = result + line;
  });
  return result;
}

module.exports = projectFormatter;
