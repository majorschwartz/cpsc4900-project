import React, { useState, useEffect } from 'react';

function TextSelectionDetector() {
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed) {
        setSelectedText(selection.toString());
      } else {
        setSelectedText('');
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  return (
    <div>
      <p>Select some text below:</p>
      <p>This is some text you can select.</p>
      {selectedText && <p>Selected text: {selectedText}</p>}
    </div>
  );
}

export default TextSelectionDetector;