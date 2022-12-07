import React from 'react';
import Editor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import MDView from './MDView';

const MDEditor = ({ value, style, onChange }) => {
  const mdEditor = React.useRef(null);

  const handleImgaeUpload = (file) => {
    const contentType = file.type;
    return new Promise((resolve) => {
      const blob = new Blob([file], { type: contentType });
      const blobUrl = URL.createObjectURL(blob);
      resolve(blobUrl);
    });
  };

  return (
    <Editor
      ref={mdEditor}
      className="mdeditor"
      style={style}
      value={value}
      onChange={({ text }) => onChange(text)}
      // onImageUpload={(file) => handleImgaeUpload(file)}
      renderHTML={(text) => <MDView source={text} />}
    />
  );
};

export default MDEditor;
