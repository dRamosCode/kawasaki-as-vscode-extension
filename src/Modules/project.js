const vscode = require("vscode");

class Project{
    /**
    * @param {vscode.TextDocument} document
    */

    constructor(document){
        this.userPrograms = [];
        this.systemPrograms = [];
        this.interfacePrograms = [];
        this.document = document;
        this.lastProgramType = "";
    }

    getStructure(){

        // Search data lines for definitions
        for (let index = 0; index < this.document.lineCount; index++)
        {
            let programName = "";

            // Get first word from line
            let firstWord = this.document.lineAt(index).text.trim().split(' ')[0];

            // Check if it is a program
            switch (firstWord) {
                case ".PROGRAM":
                    programName = this.document.lineAt(index).text.trim().split(' ')[1].split('(')[0];
                    this.addUserProgram(programName,index)
                    break;
                case ".TRANS":
                case ".JOINTS":
                case ".REALS":
                case ".STRINGS":
                case ".INTEGER":
                case ".ROBOTDATA1":
                case ".OPE_INFO1":
                case ".SYSDATA":
                case ".CONDITION":
                case ".AUXDATA":
                case ".SIG_COMMENT":
                    programName = this.document.lineAt(index).text.trim().split(' ')[0];
                    this.addSystemProgram(programName,index)
                    break;
                case ".INTER_PANEL_D":
                case ".INTER_PANEL_TITLE":
                case ".INTER_PANEL_COLOR_D":
                    programName = this.document.lineAt(index).text.trim().split(' ')[0];
                    this.addInterfaceProgram(programName,index)
                    break;
                case ".CBSDATA":
                case ".END":
                    this.addProgramEnd(index)
                default:
                    break;
            }
        }
    }


    addUserProgram(name,line){
        // Add program to list
        this.userPrograms.push({label: name,line: line});
        this.lastProgramType = "User";
    }

    addSystemProgram(name,line){
        // Add program to list
        this.systemPrograms.push({label: name,line: line});
        this.lastProgramType = "System";
    }

    addInterfaceProgram(name,line){
        // Add program to list
        this.interfacePrograms.push({label: name,line: line});
        this.lastProgramType = "IFP";
    }

    addProgramEnd(line){
        // Set program ending line
        switch (this.lastProgramType) {
            case "User":
                this.userPrograms[this.userPrograms.length-1].end = line;
                break;
            case "System":
                this.systemPrograms[this.systemPrograms.length-1].end = line;
                break;
            case "IFP":
                this.interfacePrograms[this.interfacePrograms.length-1].end = line;
                break;
            default:
                break;
        }
    }
}

module.exports = Project;
