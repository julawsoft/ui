import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


interface PropsEditor {
  onChange: any
  onReady?: any
  onBlur?: any
  onFocus?: any
  data?: any
}

const Editor = ({ onReady, onChange, onBlur, onFocus, data }: PropsEditor) => {

  return <ReactQuill 
            theme="snow" 
            value={data} 
            onChange={onChange} 
            style={{
              'backgroundColor': '#fff', }} 
            />;
}

export default Editor
