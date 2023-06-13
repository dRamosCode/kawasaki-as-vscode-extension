const vscode = require("vscode");

// Formatting logic
class projectFormatter {
	provideDocumentFormattingEdits(document, options, token) {
		// Get the full range of the document
		const fullRange = new vscode.Range(
			document.lineAt(0).range.start,
			document.lineAt(document.lineCount - 1).range.end
		);

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
		".PROGRAM",
		"THEN",
		"ELSE",
		"DO",
		"TO",
		"OF",
		"VALUE",
		"ANY",
		"SVALUE",
		".TRANS",
		".JOINTS",
		".REALS",
		".STRINGS",
		".INTEGER",
		".ROBOTDATA1",
		".OPE_INFO1",
		".SYSDATA",
		".CONDITION",
		".AUXDATA",
		".INTER_PANEL_D",
		".INTER_PANEL_TITLE",
		".INTER_PANEL_COLOR_D",
		".SIG_COMMENT",
	];
	decreaseIndentPattern = [".END", "END", "ELSE", "UNTIL", "VALUE", "ANY", "SVALUE"];

	// Variables
	let indentationLevel = 0;
	let formattedLines = [];

	// Separate code into lines
	const lines = code.split("\n");

	// Format code
	for (let i = 0; i < lines.length; i++) {
		// Check if line is empty and replace with comment
		let testLine = lines[i].trimStart();
		if (testLine == "" && lineCount != i) {
			lines[i] = ";\r";
		}
		// Check if it is a comment line
		let comment = false;
		if (testLine[0] == ";") {
			comment = true;
		}

		// Check if it is a Program definition
		let program = false;
		if (testLine.includes(".PROGRAM")) {
			indentationLevel = 0;
			program = true;
		}

		// Loop through decrease patterns and see if matches
		decreaseIndentPattern.forEach((pattern, index) => {
			const regExpPattern = new RegExp("\\b" + pattern + "\\b");
			if (regExpPattern.test(lines[i]) == true && comment == false) {
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
			const regExpPattern = new RegExp("\\b" + pattern + "\\b");
			if (
				(regExpPattern.test(lines[i]) == true && comment == false && pattern.charAt(0) != ".") ||
				(pattern.charAt(0) == "." && lines[i].charAt(0) == "." && lines[i].includes(pattern)) ||
				program == true
			) {
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
