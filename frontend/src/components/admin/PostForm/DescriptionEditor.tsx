import { useActions, useAppState } from '@/store';
import Editor, { type Monaco } from '@monaco-editor/react';
import { editor as MonacoEditorType } from 'monaco-editor';
import { useRef } from 'react';
import EditorButtons from './EditorButtons';

const DescriptionEditor = () => {
  const editorRef = useRef<null | MonacoEditorType.IStandaloneCodeEditor>(null);
  const monacoRef = useRef<null | Monaco>(null);
  const { postForm } = useActions();
  const { editor } = useAppState();

  const handleOnEditorChange = (value: string | undefined) => {
    if (value) {
      postForm.setDescription(value);
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
      default:
        char = '*';
        break;
    }

    if (selectedText) {
      editor.executeEdits('', [
        {
          range: selection!,
          text: `${char}${selectedText}${char}`,
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
        editor.executeEdits('', [
          {
            range,
            text: `${char}${char}`,
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
  };

  const onEditorButtonClick = (key: string) => {
    applyFormatting(key, true);
  };

  return (
    <div className="mb-5">
      <h3 className="mb-2 text-lg font-bold">Description</h3>
      <div className="border border-gray-300">
        <EditorButtons onClick={onEditorButtonClick} />
        <Editor
          defaultValue={editor.defaultValue}
          defaultLanguage={editor.defaultLanguage}
          height="40vh"
          options={editor.options}
          theme="vs-light"
          onChange={handleOnEditorChange}
          onMount={handleOnEditorMount}
        />
      </div>
    </div>
  );
};

export default DescriptionEditor;
