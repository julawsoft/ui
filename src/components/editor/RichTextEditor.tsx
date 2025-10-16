import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  initialValue?: string;
  onChange?: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialValue = "",
  onChange,
}) => {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    onChange?.(value);
  }, [value, onChange]);

  const handleClear = () => {
    setValue("");
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "align",
    "blockquote",
    "code-block",
    "link",
    "image",
  ];

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        Editor de Texto
      </Typography>

      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        style={{
          backgroundColor: "#fff",
          borderRadius: 8,
          minHeight: 180,
        }}
      />

      <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
        <Button variant="outlined" color="secondary" onClick={handleClear}>
          Limpar
        </Button>
      </Box>
    </Box>
  );
};

export default RichTextEditor;
