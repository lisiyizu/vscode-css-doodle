"use strict";
import * as vscode from 'vscode';
import * as path from "path";

/**
 * HTMLDocumentContentProvider 
 */
export default class HtmlDocumentContentProvider implements vscode.TextDocumentContentProvider {

    public _onDidChange: vscode.EventEmitter<vscode.Uri>;
    private _textEditor?: vscode.TextEditor;


    constructor() {
        this._onDidChange = new vscode.EventEmitter<vscode.Uri>();
        this._textEditor = vscode.window.activeTextEditor;
    }

    provideTextDocumentContent(uri: vscode.Uri): string {
        return this.generateHTML();
    };

    public generateHTML(): string {
        let plainText: string = this._textEditor?.document.getText()||'';
        let html = this.fixLinks(plainText);
        return html;
    }

    // Thanks to Thomas Haakon Townsend for coming up with this regex
    private fixLinks(html: string): string {
        let documentFileName = this._textEditor?.document.fileName || '';
        return html.replace(
            new RegExp("((?:src|href)=[\'\"])((?!http|\\/).*?)([\'\"])", "gmi"),
            (subString: string, p1: string, p2: string, p3: string): string => {
                return [
                    p1,
                    vscode.Uri.file(path.join(path.dirname(documentFileName), p2)),
                    p3
                ].join("");
            }
        );
    }


    public update(uri: vscode.Uri) {
        this._onDidChange.fire(uri);
    }

    get onDidChange(): vscode.Event<vscode.Uri> {
        return this._onDidChange.event;
    }
}