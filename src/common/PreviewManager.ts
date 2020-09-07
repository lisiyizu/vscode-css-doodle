
'use strict';
import * as vscode from 'vscode';
import HtmlDocumentContentProvider from './HtmlDocumentContentProvider';
import * as Constants from './Constants';


// This class initializes the previewmanager based on extension type and manages all the subscriptions
export default class PreviewManager {

    htmlDocumentContentProvider: HtmlDocumentContentProvider;
    disposable: vscode.Disposable;

    constructor(htmlDocumentContentProvider?: HtmlDocumentContentProvider) {
        this.htmlDocumentContentProvider = htmlDocumentContentProvider && htmlDocumentContentProvider || new HtmlDocumentContentProvider();
        // subscribe to selection change event
        let subscriptions: vscode.Disposable[] = [];
        vscode.window.onDidChangeTextEditorSelection(this.onEvent, this, subscriptions);
        this.disposable = vscode.Disposable.from(...subscriptions);
    }

    dispose() {
        this.disposable.dispose();
    }

    private onEvent() {
        this.htmlDocumentContentProvider.update(vscode.Uri.parse(Constants.ExtensionConstants.PREVIEW_URI));
    }

}