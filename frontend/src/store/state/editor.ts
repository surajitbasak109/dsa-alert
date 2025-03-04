import { type editor as MonacoEditorType } from 'monaco-editor';

export type EditorOptionsType = {
  defaultValue: string;
  defaultLanguage: string;
  themeMode: string;
  isEditorReady: boolean;
  options: MonacoEditorType.IStandaloneEditorConstructionOptions;
  monacoTheme: string;
};

const initialTheme = localStorage.getItem('themeMode') || 'dark';

const editorOPtions: EditorOptionsType = {
  defaultValue: '# Problem Heading',
  defaultLanguage: 'markdown',
  themeMode: initialTheme,
  isEditorReady: false,
  options: {
    acceptSuggestionOnCommitCharacter: true,
    acceptSuggestionOnEnter: 'on',
    accessibilitySupport: 'auto',
    autoIndent: 'advanced',
    automaticLayout: true,
    codeLens: true,
    colorDecorators: true,
    contextmenu: true,
    cursorBlinking: 'blink',
    cursorSmoothCaretAnimation: 'off',
    cursorStyle: 'line',
    disableLayerHinting: false,
    disableMonospaceOptimizations: false,
    dragAndDrop: false,
    fixedOverflowWidgets: false,
    folding: true,
    foldingStrategy: 'auto',
    fontLigatures: false,
    formatOnPaste: true,
    formatOnType: false,
    hideCursorInOverviewRuler: false,
    links: true,
    mouseWheelZoom: false,
    multiCursorMergeOverlapping: true,
    multiCursorModifier: 'alt',
    overviewRulerBorder: true,
    overviewRulerLanes: 2,
    quickSuggestions: true,
    quickSuggestionsDelay: 100,
    readOnly: false,
    renderControlCharacters: false,
    renderFinalNewline: 'on',
    renderLineHighlight: 'all',
    renderWhitespace: 'none',
    revealHorizontalRightPadding: 30,
    roundedSelection: true,
    rulers: [],
    scrollBeyondLastColumn: 5,
    scrollBeyondLastLine: true,
    selectOnLineNumbers: true,
    selectionClipboard: true,
    selectionHighlight: true,
    showFoldingControls: 'mouseover',
    smoothScrolling: false,
    suggestOnTriggerCharacters: true,
    wordBasedSuggestions: 'currentDocument',
    // eslint-disable-next-line
    wordSeparators: `~!@#$%^&*()-=+[{]}\|;:'",.<>/?`,
    wordWrap: 'on',
    wordWrapBreakAfterCharacters: '\t})]?|&,;',
    wordWrapBreakBeforeCharacters: '{([+',
    wordWrapColumn: 80,
    wrappingIndent: 'none',
    autoClosingOvertype: 'always',
    minimap: {
      enabled: false
    },
    scrollbar: {
      verticalSliderSize: 5
    }
  },
  monacoTheme: initialTheme
};

export default editorOPtions;