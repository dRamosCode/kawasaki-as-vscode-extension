const vscode = require("vscode");

const blockComments = function (context) {
	// Register right click comment command
	let command = vscode.commands.registerCommand("as.commentLines", () => {
		// Get active text editor
		const activeEditor = vscode.window.activeTextEditor;
		// If there is no active editor return
		if (!activeEditor) {
			return;
		}

		// Adjust start and end positions to cover complete lines
		const { start, end } = activeEditor.selection;
		const adjustedStart = new vscode.Position(start.line, 0);
		const adjustedEnd = new vscode.Position(end.line, activeEditor.document.lineAt(end.line).text.length);
		const adjustedSelection = new vscode.Selection(adjustedStart, adjustedEnd);

		// Get the complete lines to be commented
		const completeLines = [];
		for (let line = adjustedStart.line; line <= adjustedEnd.line; line++) {
			completeLines.push(activeEditor.document.lineAt(line).text);
		}

		// Format lines by adding a comment tag first
		const commentedText = completeLines.map((line) => `; ${line}`).join("\n");

		activeEditor.edit((editBuilder) => {
			// Replace only the selected lines with the commented text
			editBuilder.replace(adjustedSelection, commentedText);
		});
	});

	context.subscriptions.push(command);
};
module.exports = blockComments;
