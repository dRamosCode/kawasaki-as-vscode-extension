const vscode = require("vscode");
const path = require("path");
const fs = require("fs");

const themeGenerator = function (context) {
	// Delete cached theme configuration and update it with user settings
	delete require.cache[require.resolve("./../themes/light.js")];
	delete require.cache[require.resolve("./../themes/dark.js")];
	const lightTheme = require("./../themes/light.js");
	const darkTheme = require("./../themes/dark.js");

	// Delay execution to wait for theme loading before parsing it
	setTimeout(() => {
		// See if active Theme is light or dark
		const activeThemeType = vscode.window.activeColorTheme.kind;
		switch (activeThemeType) {
			case 1:
				chosenTheme = lightTheme;
				break;
			case 2:
				chosenTheme = darkTheme;
				break;
			case 3:
				chosenTheme = darkTheme;
				break;
		}

		// Update the semantic token colors
		const config = vscode.workspace.getConfiguration();
		config.update(
			"editor.tokenColorCustomizations",
			{
				textMateRules: chosenTheme,
			},
			vscode.ConfigurationTarget.Workspace
		);

		// Dispose the configuration update when the extension is deactivated
		if (context && context.subscriptions) {
			context.subscriptions.push({
				dispose: () => {
					config.update("editor.tokenColorCustomizations", undefined, vscode.ConfigurationTarget.Workspace);
				},
			});
		}
	}, 500);
};

module.exports = themeGenerator;
