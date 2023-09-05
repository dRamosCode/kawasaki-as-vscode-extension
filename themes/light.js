const vscode = require("vscode");
const config = vscode.workspace.getConfiguration();

module.exports = [
	{
		scope: "as.keyword.control.program",
		settings: {
			foreground: config.get("Light Theme.Program"),
			fontStyle: "bold",
		},
	},
	{
		scope: "keyword.flow",
		settings: {
			foreground: config.get("Light Theme.Flow"),
		},
	},
	{
		scope: "keyword.control.motion",
		settings: {
			foreground: config.get("Light Theme.Motion"),
			fontStyle: "bold",
		},
	},
	{
		scope: "keyword.control.speed",
		settings: {
			foreground: config.get("Light Theme.Speed"),
		},
	},
	{
		scope: "keyword.control.clamp",
		settings: {
			foreground: config.get("Light Theme.Clamp"),
		},
	},
	{
		scope: ["keyword.control.configuration"],
		settings: {
			foreground: config.get("Light Theme.Configuration"),
		},
	},
	{
		scope: ["keyword.control.control"],
		settings: {
			foreground: config.get("Light Theme.Control"),
		},
	},
	{
		scope: ["keyword.control.signal"],
		settings: {
			foreground: config.get("Light Theme.Signal"),
		},
	},
	{
		scope: "keyword.control.message",
		settings: {
			foreground: config.get("Light Theme.Message"),
		},
	},
	{
		scope: "keyword.control.pose",
		settings: {
			foreground: config.get("Light Theme.Pose"),
		},
	},
	{
		scope: "keyword.control.real",
		settings: {
			foreground: config.get("Light Theme.Real"),
		},
	},
	{
		scope: "keyword.control.strings",
		settings: {
			foreground: config.get("Light Theme.Strings"),
		},
	},
	{
		scope: "keyword.control.pc",
		settings: {
			fontStyle: "italic",
			foreground: config.get("Light Theme.PC"),
		},
	},
	{
		scope: "keyword.operator.arithmetic",
		settings: {
			fontStyle: "italic",
			foreground: config.get("Light Theme.Arithmetic"),
		},
	},
	{
		scope: "keyword.operator.mathematical",
		settings: {
			foreground: config.get("Light Theme.Mathematical"),
		},
	},
	{
		scope: "keyword.operator.relational",
		settings: {
			fontStyle: "italic",
			foreground: config.get("Light Theme.Relational"),
		},
	},
	{
		scope: "keyword.operator.logical",
		settings: {
			foreground: config.get("Light Theme.Logical"),
		},
	},
	{
		scope: "keyword.operator.bynary",
		settings: {
			foreground: config.get("Light Theme.Bynary"),
		},
	},
	{
		scope: "keyword.comment.inline",
		settings: {
			foreground: config.get("Light Theme.Inline comments"),
		},
	},
	{
		scope: "keyword.comment.inlineString",
		settings: {
			foreground: config.get("Light Theme.Inline strings"),
		},
	},
];
