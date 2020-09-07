import * as vscode from 'vscode';
import PreviewManager from './PreviewManager';
import * as Constants from './Constants';

export class Utils {
    //returns true if an html document is open
    constructor() { };
    public static checkDocumentIsHTML(showWarning: boolean): boolean {
        let result = vscode.window.activeTextEditor?.document.languageId.toLowerCase() === "html";
        if (!result && showWarning) {
            vscode.window.showInformationMessage(Constants.ErrorMessages.NO_HTML);
        }
        return result;
    }
    public static init(viewColumn: number, context: vscode.ExtensionContext, previewUri: vscode.Uri) {
        let proceed = this.checkDocumentIsHTML(true);
        if (proceed) {
            let previewManager = new PreviewManager();
            vscode.workspace.registerTextDocumentContentProvider('HTMLPreview', previewManager.htmlDocumentContentProvider);
            // [注意，vscode.previewHtml 已经移除了]
            // 文章：https://cloud.tencent.com/developer/article/1559357
            vscode.commands.executeCommand('vscode.preview', previewUri, viewColumn, previewManager);
        }
    }
    public static getMarkDownStringList(model: any): vscode.MarkdownString[] {
        let msLabel = new vscode.MarkdownString(`${model.type}：${model.label} ${model.alias?`（alias：${model.alias}）`:''}`);
        let msDesc = new vscode.MarkdownString(`${model.desc}`);
        let msCode = new vscode.MarkdownString();
        model.code.forEach((code:any)=>{
            msCode.appendCodeblock(code);
        });
        let msDoc = new vscode.MarkdownString(`[document-url](${`https://css-doodle.com/#${model.type}-${model.label}`})`);
        return [ msLabel, msDesc, msCode, msDoc ];
    }
}