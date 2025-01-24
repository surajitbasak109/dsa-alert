import { useActions, useAppState } from '@/store';
import Editor, { useMonaco } from '@monaco-editor/react';
import { useEffect } from 'react';

const DescriptionEditor = () => {
  const {setPostFormDescription} = useActions()
  const monacoInstance = useMonaco();
  const { editor } = useAppState();
  useEffect(() => {
    console.log(monacoInstance);
  }, [monacoInstance]);

  const handleOnEditorChange = (value: string|undefined) => {
    if (value) {
      setPostFormDescription(value);
    }
  }

  return (
    <div className="mb-5">
      <h3 className="mb-2 text-lg font-bold">Description</h3>
      <div className="border border-gray-300">
        <Editor
          defaultValue={editor.defaultValue}
          defaultLanguage={editor.defaultLanguage}
          height="40vh"
          options={editor.options}
          theme="vs-light"
          onChange={handleOnEditorChange}
        />
      </div>
    </div>
  );
};

export default DescriptionEditor;
