import { CssDoodleCompletionItemProvider }  from './provider/CssDoodleCompletionItemProvider';
import { CssDoodleHoverProvider } from './provider/CssDoodleHoverProvider';
import { MenuTreeViewProvider } from './provider/MenuTreeViewProvider';
// import { CommandManager } from './commandManager';
import * as vscode from 'vscode';
import { Utils }  from './common/Utils';
import * as Constants  from './common/Constants';
import * as _ from 'lodash';
import * as path from 'path';
import * as fs from 'fs';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let panelShowcaseWebview:any = null;
	let panelWebview:any;
	let previewUri = vscode.Uri.parse(Constants.ExtensionConstants.PREVIEW_URI);
	// 
	vscode.commands.registerCommand('extension.showcase.code', async (num:string) => {
		const htmlFile = `css-doodle-${num}.html`;
		const fileContent =  fs.readFileSync(path.join(__dirname,`showcase/${htmlFile}`)).toString();
		let document = await vscode.workspace.openTextDocument({
			content: `<!-- please save file content -->\n`+fileContent,
			language: 'html',
		});
		await vscode.window.showTextDocument(document, { viewColumn: vscode.ViewColumn.Two, preview: false });
		let subscriptions: vscode.Disposable[] = [];
		vscode.window.onDidChangeTextEditorSelection(_.debounce(e => {
			panelShowcaseWebview.webview.html = e.textEditor._documentData._cachedTextValue;
		}),null,subscriptions);
	});
	//
    let disposableSidePreview = vscode.commands.registerCommand('extension.preview', () => {
        Utils.init(vscode.ViewColumn.Two, context, previewUri);
	});
    //
	vscode.commands.registerCommand('vscode.preview.showcase', async (file: string) => {
		const fileContent =  fs.readFileSync(path.join(__dirname,`showcase/${file}`)).toString();
		if(!panelShowcaseWebview) {
			panelShowcaseWebview = vscode.window.createWebviewPanel(
				'css-doodle:preview.showcase',
				'css-doodle:preview.showcase',
				vscode.ViewColumn.Two,
				{
					enableScripts: true, // 启用JS，默认禁用
					retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
				}
			);
		}
		panelShowcaseWebview.onDidDispose(() => {
			panelShowcaseWebview = null;
		});
		panelShowcaseWebview.webview.html = fileContent;
	});
	//
	vscode.commands.registerCommand('vscode.preview', (previewUri: vscode.Uri, viewColumn: number, previewManager:any ) => {
		if(!panelWebview) {
			panelWebview = vscode.window.createWebviewPanel(
				'css-doodle:preview',
				'css-doodle:preview',
				viewColumn,
				{
					enableScripts: true, // 启用JS，默认禁用
					retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
				}
			);
		}
		panelWebview.onDidDispose(() => {
			panelWebview = null;
		});
		panelWebview.webview.html = previewManager.htmlDocumentContentProvider.generateHTML();
		//
		let _didDocumentChange: vscode.EventEmitter<vscode.Uri> = previewManager.htmlDocumentContentProvider._onDidChange;
		_didDocumentChange.event(_.debounce(e => {
			if(panelWebview) {
				panelWebview.webview.html = previewManager.htmlDocumentContentProvider.generateHTML();
			}
		},500));
	});

	// push to subscriptions list so that they are disposed automatically
	context.subscriptions.push(disposableSidePreview);
	// registerCompletionItemProvider
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider([{ language: 'html', scheme: 'file' }], new CssDoodleCompletionItemProvider(), ...['@',':']));
	// registerHoverProvider
	context.subscriptions.push(vscode.languages.registerHoverProvider([{ language: 'html', scheme: 'file' }], new CssDoodleHoverProvider()));
	// Menu View
    let menuTreeViewProvider: MenuTreeViewProvider = new MenuTreeViewProvider(context);
	vscode.window.registerTreeDataProvider('css-doodle-menu-view', menuTreeViewProvider);
}

// this method is called when your extension is deactivated
export function deactivate() {}
