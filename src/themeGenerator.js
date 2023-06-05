const vscode = require("vscode");
const path = require("path");
const fs = require("fs");

const themeGenerator = function(context){
    // Delay execution to wait for theme loading before parsing it
    setTimeout(() => {
    
        // See if active Theme is light or dark
        const activeThemeType = vscode.window.activeColorTheme.kind;
        switch (activeThemeType) {
            case 1:
                themePath = '../themes/light.json';
                break;
            case 2:
                themePath = '../themes/dark.json';
                break;
            case 3:
                themePath = '../themes/dark.json';
                break;
        }

        // Parse the JSON contents of Theme customization
        const kawaThemePath = path.join(__dirname, themePath);
        const kawaThemeContents = fs.readFileSync(kawaThemePath, 'utf8');
        const kawaThemeColors = JSON.parse(kawaThemeContents);
        const config = vscode.workspace.getConfiguration();

        // Update the semantic token colors
        config.update("editor.tokenColorCustomizations", {
        "textMateRules": kawaThemeColors
        }, vscode.ConfigurationTarget.Workspace);

        // Dispose the configuration update when the extension is deactivated
        context.subscriptions.push({
            dispose: () => {
            config.update("editor.tokenColorCustomizations", undefined, vscode.ConfigurationTarget.Workspace);
            }
        });
}, 500);
};

module.exports = themeGenerator;