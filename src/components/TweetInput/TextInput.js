import React from "react";
import { Editor, CompositeDecorator, EditorState } from "draft-js";
import { updateMessage } from "../../actions/tweetInput.action";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ExtraTextStyle = ({ children }) => {
  return <span style={{ background: "#fb9fa8" }}>{children}</span>;
};

const HashtagStyle = ({ children }) => {
  return <span style={{ color: "#1d9bf0" }}>{children}</span>;
};

function findTextToLongStrategy(contentBlock, callback) {
  const text = contentBlock.getText();
  if (text.length > 280) callback(280, text.length);
}

function findHashtagStrategy(contentBlock, callback) {
  const text = contentBlock.getText();
  const regex = /#[A-zÀ-ú0-9]+/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    callback(match.index, match.index + match[0].length);
  }
}

const tweetInputDecorator = () =>
  new CompositeDecorator([
    {
      strategy: findTextToLongStrategy,
      component: ExtraTextStyle,
    },
    {
      strategy: findHashtagStrategy,
      component: HashtagStyle,
    },
  ]);

export default function TextInput() {
  const dispatch = useDispatch();
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty(tweetInputDecorator())
  );
  const contentState = editorState.getCurrentContent();

  useEffect(() => {
    const text = contentState.getPlainText();
    dispatch(updateMessage(text));
  }, [contentState]);

  return (
    <Editor
      placeholder="Quoi de neuf ?"
      editorState={editorState}
      onChange={setEditorState}
    />
  );
}
