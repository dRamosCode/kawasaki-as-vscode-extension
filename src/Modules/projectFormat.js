const vscode = require("vscode");

class projectFormat {
	provideDocumentFormattingEdits(document, options, token) {
		// Get the full range of the document
		const fullRange = new vscode.Range(
			document.lineAt(0).range.start,
			document.lineAt(document.lineCount - 1).range.end
		);

		// Get the text of the document
		const text = document.getText();

		// Perform your code formatting logic here
		const formattedText = formatCode(text, "as");

		// Create a TextEdit representing the formatting changes
		const edit = new vscode.TextEdit(fullRange, formattedText);

		// Return an array of TextEdits
		return [edit];
	}
}

module.exports = projectFormat;