import { useActions, useAppState } from '@/store';
import Editor, { type Monaco } from '@monaco-editor/react';
import { type editor as MonacoEditorType } from 'monaco-editor';
import { useRef, useState } from 'react';
import EditorButtons from './EditorButtons';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';

const DescriptionEditor = () => {
  const editorRef = useRef<null | MonacoEditorType.IStandaloneCodeEditor>(null);
  const monacoRef = useRef<null | Monaco>(null);
  const { postFormAction } = useActions();
  const { editor, postForm } = useAppState();
  const [markdownPreviewVisible, setMarkdownPreviewVisible] =
    useState<boolean>(true);

  const handleOnEditorChange = (value: string | undefined) => {
    if (value) {
      postFormAction.setDescription(value);
    }
  };

  const onEditorButtonClick = (key: string) => {
    switch (key) {
      case 'bold':
      case 'italic':
        applyFormatting(key, true);
        break;
      case 'unordered-list':
      case 'ordered-list':
      case 'quote':
        applyListFormatting(key, true);
        break;
      case 'preview':
        setMarkdownPreviewVisible((prev) => !prev);
        break;
      default:
        applyFormatting(key, true);
        break;
    }
  };

  const applyFormatting = (key: string, focus = false) => {
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    if (!editor) return;
    const selection = editor.getSelection();
    const selectedText = editor.getModel()?.getValueInRange(selection!);

    let char = '*';
    switch (key) {
      case 'bold':
        char = '**';
        break;
      case 'italic':
        char = '*';
        break;
      case 'link':
        char = '()[]';
        break;
      default:
        char = '*';
        break;
    }

    if (selectedText) {
      let text = `${char}${selectedText}${char}`;
      if (key == 'link') {
        text = `(${selectedText})[]`;
      }
      editor.executeEdits('', [
        {
          range: selection!,
          text,
          forceMoveMarkers: true
        }
      ]);
    } else {
      const position = editor.getPosition();
      if (position) {
        const range = new (monaco as Monaco).Range(
          position.lineNumber,
          position.column,
          position.lineNumber,
          position.column
        );
        let text = `${char}${char}`;
        if (key == 'link') {
          text = `()[]`;
        }
        editor.executeEdits('', [
          {
            range,
            text,
            forceMoveMarkers: true
          }
        ]);

        // Move the cursor back between the asterisks
        editor.setPosition(
          new (monaco as Monaco).Position(
            position.lineNumber,
            position.column + char.length
          )
        );
      }
    }

    if (focus) {
      editor.focus();
    }
  };

  const applyListFormatting = (key: string, focus = false) => {
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    if (!editor || !monaco) return;
    const selection = editor.getSelection();
    if (!selection) return; // Ensures selection is not null or undefined

    const model = editor.getModel();
    if (!model) return; // Ensures model is not null
    let char = '#';
    switch (key) {
      case 'ordered-list':
        char = '1. ';
        break;
      case 'unordered-list':
        char = '- ';
        break;
      case 'quote':
        char = '> ';
        break;
    }

    const start = selection.startLineNumber;
    const end = selection.endLineNumber;

    const isRangeEmpty = selection.isEmpty();
    const linesContent: string[] = [];

    for (let i = start; i <= end; i++) {
      linesContent.push(model.getLineContent(i));
    }

    const allStartWithHyphen = linesContent.every((line) =>
      line.startsWith(char)
    );
    const range = new monaco.Range(start, 1, end, model.getLineMaxColumn(end));

    let newContent: string;
    if (isRangeEmpty) {
      // Handle no selection - single line toggle
      newContent = linesContent[0].startsWith(char)
        ? linesContent[0].slice(char.length)
        : char + linesContent[0];
    } else if (allStartWithHyphen) {
      newContent = linesContent
        .map((line) => line.slice(char.length))
        .join('\n');
    } else {
      newContent = linesContent.map((line) => char + line).join('\n');
    }

    editor.executeEdits('', [{ range, text: newContent }]);
    if (focus) {
      editor.focus();
    }
  };

  const handleOnEditorMount = (
    editor: MonacoEditorType.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    editor.updateOptions({ contextmenu: false });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyB, () =>
      applyFormatting('bold')
    );
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyI, () =>
      applyFormatting('italic')
    );
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyU, () =>
      applyListFormatting('unordered-list')
    );
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyO, () =>
      applyListFormatting('ordered-list')
    );
  };

  return (
    <div className="mb-5">
      <h3 className="mb-2 text-lg font-bold">Description</h3>
      <div className="border border-gray-300">
        <EditorButtons onClick={onEditorButtonClick} />
        <div className="flex min-h-0 grow">
          <div className="flex flex-col flex-1 overflow-hidden rounded-b">
            <div className="border-t border-[#0000000d] dark:border-dark-divider-3 grow">
              <div className="w-full h-full">
                <Editor
                  defaultValue={postForm.data.description}
                  defaultLanguage={editor.defaultLanguage}
                  options={editor.options}
                  theme="vs-light"
                  onChange={handleOnEditorChange}
                  onMount={handleOnEditorMount}
                />
              </div>
            </div>
          </div>
          <div
            className={clsx(
              'flex-1 hidden px-6 pt-4 pb-2 overflow-auto border-t border-l border-[#0000000d] min-h-[50vh]',
              markdownPreviewVisible && 'md:block'
            )}>
            <ReactMarkdown
              className="prose markdown"
              children={postForm.data.description}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionEditor;
