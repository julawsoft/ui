import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  /** Valor inicial do editor (HTML) */
  initialValue?: string;
  /** Callback acionado sempre que o conteúdo muda */
  onChange?: (content: string) => void;
  /** Título opcional do editor */
  label?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialValue = "",
  onChange,
  label = "Editor de Texto",
}) => {
  const [value, setValue] = useState<string>(initialValue);

  /** 🔄 Sincroniza quando o valor inicial muda (ex: abrir outro registro) */
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  /** 🧠 Callback memoizado para evitar renders desnecessários */
  const handleChange = useCallback(
    (content: string) => {
      setValue(content);
      onChange?.(content);
    },
    [onChange]
  );

  const handleClear = () => {
    setValue("");
    onChange?.("");
  };

  /** ✏️ Configuração da toolbar */
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
      <Typography
        variant="subtitle1"
        fontWeight={600}
        mb={1}
        color="text.primary"
      >
        {label}
      </Typography>

      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid #ddd",
          "& .ql-toolbar": {
            border: "none",
            borderBottom: "1px solid #eee",
            background: "#fafafa",
          },
          "& .ql-container": {
            minHeight: 180,
            border: "none",
            fontSize: 15,
          },
        }}
      >
        <ReactQuill
          theme="snow"
          value={value}
          onChange={handleChange}
          modules={modules}
          formats={formats}
        />
      </Box>

      <Stack direction="row" justifyContent="flex-end" spacing={1} mt={2}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClear}
          size="small"
        >
          Limpar
        </Button>
      </Stack>
    </Box>
  );
};

export default RichTextEditor;
