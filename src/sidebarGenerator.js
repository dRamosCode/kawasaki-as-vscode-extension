const vscode = require("vscode");
const Project = require("./Modules/project.js")
const ProjectTreeProvider = require("./Modules/projectTreeProvider.js")

/* Sidebar generator*/

const sidebarGenerator = function(){
	// Get active text editor structure
	let project = new Project(vscode.window.activeTextEditor.document);
	project.getStructure();

	// Create Tree Structure Providers
	let userTreeProvider = new ProjectTreeProvider(project.userPrograms);
	let systemTreeProvider = new ProjectTreeProvider(project.systemPrograms);
	let interfaceTreeProvider = new ProjectTreeProvider(project.interfacePrograms);

	// Add project structure to sidebar
	const userPrograms = vscode.window.createTreeView('user', { treeDataProvider: userTreeProvider });
	const systemPrograms = vscode.window.createTreeView('system', { treeDataProvider: systemTreeProvider });
	const interfacePrograms = vscode.window.createTreeView('interface', { treeDataProvider: interfaceTreeProvider });

	// Register the command to show program definition on sidebar click
	vscode.commands.registerCommand('extension.showLine', lineNumber => {
		const activeTextEditor = vscode.window.activeTextEditor;
		if (activeTextEditor) {
			const position = new vscode.Position(lineNumber, 0);
			activeTextEditor.selection = new vscode.Selection(position, position);
			activeTextEditor.revealRange(activeTextEditor.selection, vscode.TextEditorRevealType.InCenter);
		}
	});
}
module.exports = sidebarGenerator;
