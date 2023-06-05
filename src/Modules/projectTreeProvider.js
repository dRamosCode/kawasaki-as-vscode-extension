const vscode = require("vscode");

class ProjectTreeProvider{
	constructor(data) {
        this.data = data;
	}
  
	getTreeItem(element) {
	  const treeItem = new vscode.TreeItem(element.label, vscode.TreeItemCollapsibleState.None);
	  treeItem.command = {
		command: 'extension.showLine',
		title: '',
		arguments: [element.line]
	  };
	  return treeItem;
	}
  
	getChildren(element) {
	  if (!element) {
		return this.data.map(item => {
		  return {
			label: item.label,
			line: item.line
		  };
		});
	  }
  
	  return [];
	}
  
	getParent(element) {
	  return null;
	}
}

module.exports = ProjectTreeProvider;

