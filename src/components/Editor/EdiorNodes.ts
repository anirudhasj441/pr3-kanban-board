import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { Klass, LexicalNode } from "lexical";

const EditorNodes: Klass<LexicalNode>[] = [
    HeadingNode,
    QuoteNode,
    TableCellNode,
    TableNode,
    TableRowNode,
    ListItemNode,
    ListNode,
    CodeHighlightNode,
    CodeNode,
    AutoLinkNode,
    LinkNode,
];

export default EditorNodes;
