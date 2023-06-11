const vscode = require("vscode");
const Project = require("./Modules/project.js")
const ProjectTreeProvider = require("./Modules/projectTreeProvider.js")

/* Sidebar generator*/

const sidebarGenerator = function(context){
	// Generate structure
	fillSidebar();

	// Update project whenever text editor changes
	vscode.window.onDidChangeActiveTextEditor(fillSidebar);
	
	// Register the command to show program definition on sidebar click
	vscode.commands.registerCommand('extension.showLine', lineNumber => {
		const activeTextEditor = vscode.window.activeTextEditor;
		if (activeTextEditor) {
			const position = new vscode.Position(lineNumber, 0);
			activeTextEditor.selection = new vscode.Selection(position, position);
			activeTextEditor.revealRange(activeTextEditor.selection, vscode.TextEditorRevealType.InCenter);
		}
	});

	// Register the command to refresh the program list
	vscode.commands.registerCommand('project-structure.refreshPrograms', function(){
		fillSidebar();
	});

	// Register the command to copy the program
	vscode.commands.registerCommand('project-structure.copyProgram', (treeItem) =>{
		// Get selected program name
		let program = treeItem;
		let document = vscode.window.activeTextEditor.document;

		// Read document
		let project = new Project(vscode.window.activeTextEditor.document);		
		project.getStructure();

		// Find program range
		const start = document.lineAt(program.line).range.start;
		const end = document.lineAt(program.end).range.end;
		const range = new vscode.Range(start, end);
		const text = document.getText(range);

		// Copy to clipboard program
		vscode.env.clipboard.writeText(text+"\n");

		// Cofirmation message
		vscode.window.showInformationMessage(program.label+" copied to clipboard.");
	});
}

function fillSidebar(){
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

}

module.exports = sidebarGenerator;
