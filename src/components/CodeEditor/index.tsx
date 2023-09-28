import { defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import classNames from 'classnames';
import { basicSetup } from 'codemirror';
import React, { useEffect, useRef } from 'react';
import cssModule from './index.module.scss';

/**
 * @property className 类名
 * @property language 语言
 * @property width 容器的宽度
 * @property height 容器的高度
 * @property value 受控value
 * @property onChange 受控onChange
 */
interface IProps {
  className?: string;
  language?: 'json' | 'javascript';
  width?: number | string;
  height?: number | string;
  value: any;
  onChange: (value: any) => void;
}

/**
 * 代码编辑器
 */
const CodeEditor: React.FC<IProps> = function (props) {
  const { className, language, width, height, value, onChange } = props;

  const editorRef = useRef(null);
  const editorView = useRef<any>(null);

  useEffect(() => {
    if (!editorRef || !editorRef.current) {
      return;
    }

    // 初始状态
    let code = value;
    if (language === 'json') {
      try {
        code = JSON.stringify(value, null, 2);
      } catch (error) {
        console.warn(error);
      }
    }
    const startState = EditorState.create({
      doc: code,
      extensions: [
        basicSetup,
        keymap.of(defaultKeymap),
        language === 'json' ? json() : javascript(),
        EditorView.updateListener.of((v) => {
          if (v.docChanged) {
            onChange(v.state.toJSON().doc);
          }
        }),
      ],
    });

    editorView.current = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    return () => editorView.current.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let code = value;
    if (language === 'json') {
      try {
        code = JSON.stringify(value, null, 2);
      } catch (error) {
        console.warn(error);
      }
    }
    if (
      editorView.current &&
      editorView.current.state &&
      editorView.current.state.toJSON().doc !== code
    ) {
      editorView.current.dispatch({
        changes: {
          from: 0,
          to: editorView.current.state.doc.length,
          insert: code,
        },
      });
    }
  }, [value, editorView, language]);

  return (
    <div className={cssModule.CodeEditorWrap} style={{ width, height }}>
      <div className={classNames(className, 'code-editor')} ref={editorRef} />
    </div>
  );
};

CodeEditor.defaultProps = {
  language: 'json',
  width: '60vw',
  height: 500,
};

export default CodeEditor;
