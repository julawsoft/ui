import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CloseIcon from "@mui/icons-material/Close";
import { RequestApi } from "../../utils/http/request";

interface AttachmentPreviewProps {
  id: number;
  fetchUrl: string;
}

interface AttachmentData {
  path: string;
  fileName: string;
}

const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({ id, fetchUrl }) => {
  const [fileData, setFileData] = useState<AttachmentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    const fetchAttachment = async () => {
      try {
        setLoading(true);
        const result = await new RequestApi().get<AttachmentData>(
          `view_anexo_processo/${id}`
        );

        if (result?.status === 200 && result.data) {
          setFileData({
            path: result.data.path,
            fileName: result.data.fileName,
          });
        } else {
          setError(String(result?.errors) || "Erro ao carregar o anexo.");
        }
      } catch {
        setError("Falha ao buscar o anexo.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAttachment();
  }, [id, fetchUrl]);

  if (loading)
    return (
      <Box textAlign="center" mt={3}>
        <CircularProgress />
        <Typography variant="body2" mt={1}>
          A carregar anexo...
        </Typography>
      </Box>
    );

  if (error)
    return (
      <Typography color="error" textAlign="center">
        {error}
      </Typography>
    );

  if (!fileData) return null;

  const fileUrl = fileData.path;
  const fileName = fileData.fileName;
  const fileExtension = fileName.split(".").pop()?.toLowerCase();
  const isImage = ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(
    fileExtension || ""
  );
  const isPDF = fileExtension === "pdf";

  // alternar expansão
  const toggleExpand = () => setExpanded(!expanded);

  return (
    <>
      {/* Card principal */}
      <Card
        sx={{
          width: "100%",
          maxWidth: 900,
          margin: "20px auto",
          p: 2,
          boxShadow: 4,
          borderRadius: 3,
          transition: "all 0.3s ease",
        }}
      >
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Pré-visualização do Anexo</Typography>
            {(isImage || isPDF) && (
              <IconButton onClick={toggleExpand} color="primary">
                <ZoomInIcon />
              </IconButton>
            )}
          </Stack>

          {/* Preview da imagem */}
          {isImage && (
            <CardMedia
              component="img"
              image={fileUrl}
              alt={fileName}
              sx={{
                borderRadius: 2,
                maxHeight: 600,
                objectFit: "contain",
                border: "1px solid #ddd",
              }}
            />
          )}

          {/* Preview do PDF */}
          {isPDF && (
            <Box
              sx={{
                mt: 2,
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid #ddd",
                height: 600,
              }}
            >
              <iframe
                src={fileUrl}
                width="100%"
                height="100%"
                style={{ border: "none" }}
                title={fileName}
              />
            </Box>
          )}

          {/* Formato não suportado */}
          {!isImage && !isPDF && (
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              justifyContent="center"
              sx={{ mt: 3 }}
            >
              <InsertDriveFileIcon color="action" sx={{ fontSize: 60 }} />
              <Typography variant="body2" mt={1}>
                Pré-visualização não suportada para este tipo de ficheiro.
              </Typography>
            </Box>
          )}

          {/* Botão de download */}
          <Box textAlign="center" mt={3}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DownloadIcon />}
              href={fileUrl}
              download={fileName}
            >
              Baixar {fileExtension?.toUpperCase()}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Modal fullscreen de preview */}
      {expanded && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 2000,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <IconButton
            onClick={toggleExpand}
            sx={{ position: "absolute", top: 16, right: 16, color: "#fff" }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>

          {isImage ? (
            <img
              src={fileUrl}
              alt={fileName}
              style={{
                maxWidth: "95%",
                maxHeight: "95%",
                objectFit: "contain",
                borderRadius: 8,
              }}
            />
          ) : isPDF ? (
            <iframe
              src={fileUrl}
              width="90%"
              height="90%"
              style={{ border: "none", borderRadius: 8, backgroundColor: "#fff" }}
              title={fileName}
            />
          ) : (
            <Typography color="white" variant="h6">
              Visualização não suportada.
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default AttachmentPreview;
