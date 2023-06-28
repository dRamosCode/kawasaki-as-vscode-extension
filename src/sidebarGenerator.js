const vscode = require("vscode");
const Project = require("./Modules/project.js");
const ProjectTreeProvider = require("./Modules/projectTreeProvider.js");

/* Sidebar generator*/

const sidebarGenerator = function (context) {
	// Generate structure
	fillSidebar();

	// Update project whenever text editor changes
	vscode.window.onDidChangeActiveTextEditor(fillSidebar);

	// Register the command to show program definition on sidebar click
	vscode.commands.registerCommand("extension.showLine", (lineNumber) => {
		const activeTextEditor = vscode.window.activeTextEditor;
		if (activeTextEditor) {
			const position = new vscode.Position(lineNumber, 0);
			activeTextEditor.selection = new vscode.Selection(position, position);
			activeTextEditor.revealRange(activeTextEditor.selection, vscode.TextEditorRevealType.InCenter);
		}
	});

	// Register the command to refresh the program list
	vscode.commands.registerCommand("project-structure.refreshPrograms", function () {
		fillSidebar();
	});

	// Register the command to copy the program
	vscode.commands.registerCommand("project-structure.copyProgram", (treeItem) => {
		// Get selected program name
		let program = treeItem;
		let myDocument = vscode.window.activeTextEditor.document;

		// Read document
		let project = new Project(vscode.window.activeTextEditor.document);
		project.getStructure();

		// Find program range
		const start = myDocument.lineAt(program.line).range.start;
		const end = myDocument.lineAt(program.end).range.end;
		const range = new vscode.Range(start, end);
		const text = myDocument.getText(range);

		// Copy to clipboard program
		vscode.env.clipboard.writeText(text + "\n");

		// Cofirmation message
		vscode.window.showInformationMessage(program.label + " copied to clipboard.");
	});
};

function fillSidebar() {
	// Fill sidebar with temporary while it is loading
	// Create Tree Structure Providers
	let userTreeProvider = new ProjectTreeProvider([{ label: "Loading..." }]);
	let systemTreeProvider = new ProjectTreeProvider([{ label: "Loading..." }]);
	let interfaceTreeProvider = new ProjectTreeProvider([{ label: "Loading..." }]);

	// Add project structure to sidebar
	const userPrograms = vscode.window.createTreeView("user", { treeDataProvider: userTreeProvider });
	const systemPrograms = vscode.window.createTreeView("system", { treeDataProvider: systemTreeProvider });
	const interfacePrograms = vscode.window.createTreeView("interface", { treeDataProvider: interfaceTreeProvider });

	// Wait for active text editor to load
	setTimeout(() => {
		// Check valid editor
		const activeEditor = vscode.window.activeTextEditor;
		if (activeEditor && activeEditor.document) {
			// Get active text editor structure
			let project = new Project(vscode.window.activeTextEditor.document);
			project.getStructure();

			// Create Tree Structure Providers
			let userTreeProvider = new ProjectTreeProvider(project.userPrograms);
			let systemTreeProvider = new ProjectTreeProvider(project.systemPrograms);
			let interfaceTreeProvider = new ProjectTreeProvider(project.interfacePrograms);

			// Add project structure to sidebar
			const userPrograms = vscode.window.createTreeView("user", { treeDataProvider: userTreeProvider });
			const systemPrograms = vscode.window.createTreeView("system", { treeDataProvider: systemTreeProvider });
			const interfacePrograms = vscode.window.createTreeView("interface", { treeDataProvider: interfaceTreeProvider });
		}
	}, 1000);
}

module.exports = sidebarGenerator;
