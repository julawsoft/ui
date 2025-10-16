import React, { useState, DragEvent, ChangeEvent } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";

// Interface para representar o ficheiro com Base64
interface FileWithBase64 {
  name: string;
  size: number;
  type: string;
  base64: string;
}

interface FileUploaderProps {
  onFilesChange?: (files: FileWithBase64[]) => void; // Evento emitido quando há mudanças
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesChange }) => {
  const [files, setFiles] = useState<FileWithBase64[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Converte ficheiro para base64
  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  // Adiciona ficheiros novos
  const addFiles = async (selectedFiles: File[]) => {
    const newFiles: FileWithBase64[] = [];
    for (const file of selectedFiles) {
      const base64 = await toBase64(file);
      newFiles.push({
        name: file.name,
        size: file.size,
        type: file.type,
        base64,
      });
    }
    const updated = [...files, ...newFiles];
    setFiles(updated);
    onFilesChange?.(updated); // dispara evento
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    await addFiles(Array.from(event.dataTransfer.files));
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      await addFiles(Array.from(event.target.files));
    }
  };

  const handleRemoveFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFilesChange?.(updated);
  };

  const handleClearFiles = () => {
    setFiles([]);
    onFilesChange?.([]);
  };

  return (
    <Box>
      {/* Área de upload */}
      <Box
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          border: "2px dashed",
          borderColor: isDragging ? "primary.main" : "grey.400",
          borderRadius: 2,
          p: 4,
          textAlign: "center",
          cursor: "pointer",
          transition: "0.3s",
          backgroundColor: isDragging ? "action.hover" : "background.paper",
        }}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <UploadFileIcon sx={{ fontSize: 50, color: "primary.main" }} />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Arraste os ficheiros aqui ou <b>clique para selecionar</b>
        </Typography>
        <input
          id="fileInput"
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Box>

      {/* Lista de ficheiros */}
      {files.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Ficheiros selecionados:
          </Typography>
          <List dense>
            {files.map((file, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleRemoveFile(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={file.name}
                  secondary={`${(file.size / 1024).toFixed(2)} KB`}
                />
              </ListItem>
            ))}
          </List>

          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleClearFiles}
          >
            Limpar todos
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FileUploader;
