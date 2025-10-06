import React from 'react';
import ReactMarkdown from 'react-markdown';

const TextBlock = ({ data }) => {
  if (!data?.content) return null;
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown>{data.content}</ReactMarkdown>
    </div>
  );
};

export default TextBlock;