// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { type } from 'os';
import * as vscode from 'vscode';
import { processParagraph } from './onlyfirst/onlyfirst';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "onlyfirst" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('onlyfirst.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Onlyfirst is running!');
	});

	// get text from editor
	let getText = (): [string, vscode.Selection]  =>  {
		const activeEditor = vscode.window.activeTextEditor;
		const selection = activeEditor?.selection;
		const text = activeEditor?.document.getText(selection);
		if (typeof text === 'string' && selection instanceof vscode.Selection) {
			return [text, selection];
		}
		throw new Error('text or selection empty');
	};

	let editText = (text: string, selection: vscode.Selection) => {
		const activeEditor = vscode.window.activeTextEditor;
		activeEditor?.edit((editBuilder: vscode.TextEditorEdit) => {
			editBuilder.replace(selection, text);
		});
	};

	// show text from text.
	let showText = (text: string | undefined) => {
		if (typeof text === 'string' && text !== "") {
			vscode.window.showInformationMessage(text);
		} else {
			vscode.window.showInformationMessage('Nothing is selected!');
		}
	};

	let disposable2 = vscode.commands.registerCommand('onlyfirst.handle', ()=> {
		// const {text} = activeEditor.document.lineAt(activeEditor.selection.active.line);
		const [text, selection] = getText();
		const replacedText = processParagraph(text);
		// showText(text);
		editText(replacedText, selection);
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
}

// This method is called when your extension is deactivated
export function deactivate() {}
