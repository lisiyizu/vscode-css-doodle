import * as vscode from 'vscode';
import { CSS_DOODLE_SELECTORS, CSS_DOODLE_PROPERTIES, CSS_DOODLE_FUNCTIONS } from '../common/Constants';

export class CssDoodleCompletionItemProvider implements vscode.CompletionItemProvider {  
  provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
    let list: vscode.CompletionList = new vscode.CompletionList();
    // 只截取到光标位置为止，防止一些特殊情况
    const lineText = document.lineAt(position).text.substring(0, position.character).trim();
    let arr:Array<any> = [...CSS_DOODLE_SELECTORS,...CSS_DOODLE_PROPERTIES,...CSS_DOODLE_FUNCTIONS];
    arr = arr.filter(item=>item.label.startsWith(lineText));
    arr.forEach(item => {
      let label:string = `${item.label.replace(/^@|:/,'')}`;
      let completionItem:vscode.CompletionItem = new vscode.CompletionItem(label);
      let msCode:vscode.MarkdownString = new vscode.MarkdownString(`[document-url](${`https://css-doodle.com/#${item.type}-${item.label}`})`);
      item.code.forEach((code:any) => msCode.appendCodeblock(code));
      completionItem.documentation = msCode;
      const mapCompletionItemKind: Map<String,vscode.CompletionItemKind> = new Map([
        ['selector', vscode.CompletionItemKind.Field],
        ['property', vscode.CompletionItemKind.Property],
        ['function', vscode.CompletionItemKind.Function]
      ]);
      completionItem.kind = mapCompletionItemKind.get(item.type);
      completionItem.detail = `${item.type}：${item.label} ${item.alias?`（alias：${item.alias}）`:''}`;
      completionItem.insertText = `${item.label.replace(/^@|:/,'')}`;
      list.items.push(completionItem);
    });
    return list;
  }
  /**
   * 光标选中当前自动补全item时触发动作，一般情况下无需处理
   * @param {*} item 
   * @param {*} token 
   */
  resolveCompletionItem?(item: vscode.CompletionItem, token: vscode.CancellationToken): vscode.ProviderResult<vscode.CompletionItem> {
    return item;
  }
}