import { PlatformSelectProp, Post, SearchTag } from '@/types';

const initialTheme = localStorage.getItem('themeMode') || 'dark';

export type StoreState = {
  posts: Post[];
  platformSelectData: PlatformSelectProp[];
  searchTagsData: SearchTag[];
  postForm: {
    description: string;
    selectedTags: Omit<SearchTag, 'highlighted'>[],
  },
  editor: {
    defaultValue: string;
    defaultLanguage: string;
    themeMode: string;
    isEditorReady: boolean;
    options: {
      acceptSuggestionOnCommitCharacter: boolean;
      acceptSuggestionOnEnter: string;
      accessibilitySupport: string;
      autoIndent: boolean;
      automaticLayout: boolean;
      codeLens: boolean;
      colorDecorators: boolean;
      contextmenu: boolean;
      cursorBlinking: string;
      cursorSmoothCaretAnimation: boolean;
      cursorStyle: string;
      disableLayerHinting: boolean;
      disableMonospaceOptimizations: boolean;
      dragAndDrop: boolean;
      fixedOverflowWidgets: boolean;
      folding: boolean;
      foldingStrategy: string;
      fontLigatures: boolean;
      formatOnPaste: boolean;
      formatOnType: boolean;
      hideCursorInOverviewRuler: boolean;
      highlightActiveIndentGuide: boolean;
      links: boolean;
      mouseWheelZoom: boolean;
      multiCursorMergeOverlapping: boolean;
      multiCursorModifier: string;
      overviewRulerBorder: boolean;
      overviewRulerLanes: number;
      quickSuggestions: boolean;
      quickSuggestionsDelay: number;
      readOnly: boolean;
      renderControlCharacters: boolean;
      renderFinalNewline: string;
      renderIndentGuides: boolean;
      renderLineHighlight: string;
      renderWhitespace: string;
      revealHorizontalRightPadding: 30;
      roundedSelection: boolean;
      rulers: [];
      scrollBeyondLastColumn: number;
      scrollBeyondLastLine: boolean;
      selectOnLineNumbers: boolean;
      selectionClipboard: boolean;
      selectionHighlight: boolean;
      showFoldingControls: string;
      smoothScrolling: boolean;
      suggestOnTriggerCharacters: boolean;
      wordBasedSuggestions: boolean;
      wordSeparators: string;
      wordWrap: string;
      wordWrapBreakAfterCharacters: string;
      wordWrapBreakBeforeCharacters: string;
      wordWrapBreakObtrusiveCharacters: string;
      wordWrapColumn: number;
      wordWrapMinified: true;
      wrappingIndent: string;
      autoClosingOvertype: string;
      minimap: {
        enabled: boolean;
      };
    };
    monacoTheme: string;
  };
};

const initialState: StoreState = {
  posts: [],
  searchTagsData: [],
  platformSelectData: [],
  postForm: {
    description: "",
    selectedTags: [],
  },
  editor: {
    defaultValue: '# Problem Heading',
    defaultLanguage: 'markdown',
    themeMode: initialTheme,
    isEditorReady: false,
    options: {
      acceptSuggestionOnCommitCharacter: true,
      acceptSuggestionOnEnter: 'on',
      accessibilitySupport: 'auto',
      autoIndent: false,
      automaticLayout: true,
      codeLens: true,
      colorDecorators: true,
      contextmenu: true,
      cursorBlinking: 'blink',
      cursorSmoothCaretAnimation: false,
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
      highlightActiveIndentGuide: true,
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
      renderIndentGuides: true,
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
      wordBasedSuggestions: true,
      // eslint-disable-next-line
      wordSeparators: `~!@#$%^&*()-=+[{]}\|;:'",.<>/?`,
      wordWrap: 'off',
      wordWrapBreakAfterCharacters: '\t})]?|&,;',
      wordWrapBreakBeforeCharacters: '{([+',
      wordWrapBreakObtrusiveCharacters: '.',
      wordWrapColumn: 80,
      wordWrapMinified: true,
      wrappingIndent: 'none',
      autoClosingOvertype: 'always',
      minimap: {
        enabled: false
      }
    },
    monacoTheme: initialTheme
  }
};

export { initialState };
