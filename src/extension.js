const vscode = require("vscode");
const path = require("path");
const fs = require("fs");

const themeGenerator = require("./themeGenerator.js");
const sidebarGenerator = require("./sidebarGenerator.js");
const ProjectFormatter = require("./Modules/projectFormatter.js");
const programDefinition = require("./programDefinition.js");

// Main function of the extension
function activate(context) {

	// Override theme semantic colors
	themeGenerator(context);
	vscode.workspace.onDidChangeConfiguration(themeGenerator);

	// Project structure view
	sidebarGenerator(context);

	// Project formatting
	const projectFormatter = new ProjectFormatter();
	vscode.languages.registerDocumentFormattingEditProvider({ scheme: 'file', language: 'as' }, projectFormatter);

	// Jump to definition
	vscode.languages.registerDefinitionProvider('as', {
		provideDefinition(document, position, token) {
			return programDefinition(document, position, token);
		}
	});

	// Hover actions (future improvement)
	/*vscode.languages.registerHoverProvider('as', {
		provideHover(document, position, token) {
		  return {
			contents: []
		  };
		}
	});*/
}

module.exports = {
	activate,
};
