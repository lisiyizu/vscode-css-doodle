import * as vscode from 'vscode';
import { CSS_DOODLE_DICT } from '../common/Constants';
import { Utils } from '../common/Utils';

export class CssDoodleHoverProvider implements vscode.HoverProvider {

    provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover> {
        const editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;

        if (!editor) { return; }
        
        let lineText = document.lineAt(position.line).text;

        let activeText = document.getText(document.getWordRangeAtPosition(editor.selection.active));

        let  editorSel = editor.selection.active;

        let text = lineText.substring(editorSel.character-activeText.length-1,editorSel.character);
        
        let hover: vscode.Hover | null = null;

        if (/^@|:/.test(text)) {
            let model = CSS_DOODLE_DICT.find(item => item.label === text);
            if(model) {
                hover = new vscode.Hover(' ');
                hover.contents = Utils.getMarkDownStringList(model);
            }
        }
        return hover;
    }
}