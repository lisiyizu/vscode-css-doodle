import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

let exampleFiles: Array<any> = fs.readdirSync(path.join(__dirname,'../showcase')).map(file=>({ label: file }));

export class MenuTreeViewProvider implements vscode.TreeDataProvider<number> {
    constructor(content: vscode.ExtensionContext) {
        this.context = content;
    }
    private context: vscode.ExtensionContext;
    private treeItems: Array<any> = exampleFiles;
    getTreeItem(num: number): vscode.TreeItem {
        const htmlFile = `css-doodle-${num}.html`;
        let item = this.treeItems.find(item=> item.label === htmlFile);
        let treeItem: vscode.TreeItem = new vscode.TreeItem(item.label);
        treeItem.contextValue = 'showcase',
        treeItem.command = {
            command: 'vscode.preview.showcase',
            title: '',
            arguments: [htmlFile]
        };
        return treeItem;
    }
    getChildren(num?: number): Thenable<number[]> {
        return Promise.resolve(Array(99).fill(null).map((item,index)=>index+1));
    }
}