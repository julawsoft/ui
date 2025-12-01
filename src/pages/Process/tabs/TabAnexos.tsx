import React, { useState, type ReactNode } from 'react';
import {
  Button,
  Stack,
  Alert,
  IconButton,
  Grid,
  TextField,
  Modal,
  Box
} from '@mui/material';
import { AttachFile, Close, Delete } from '@mui/icons-material';
import DataTable from '../../../components/common/DataTable';
import SimpleModal from '../../../components/common/SimpleModal';
import type { IProcessoAnexos } from '../../../schema/InterfaceProcess';
import { toast } from 'react-toastify';
import { ProcessoService } from '../../../services/ProcessoService';
import FileUploader from '../../../components/uploads/FileUploader';
import AttachmentPreview from '../../../components/common/AttachmentPreview';
import PreviewIcon from "@mui/icons-material/Preview";
interface Props {
  data: IProcessoAnexos[];
  onDelete: (item: IProcessoAnexos) => void;
  idProcesso: number;
  idColaborador: number;
  setReloadFetch: (status: boolean) => void
}

const TabAnexos: React.FC<Props> = ({ data, onDelete, idProcesso, idColaborador, setReloadFetch }) => {
  const [open, setOpen] = useState(false);
  const [descricao, setDescricao] = useState<string>('');
  const [file, setFile] = useState<string>('');
  const [selectedAnexo, setSelectedAnexo] = useState<IProcessoAnexos | null>(null);

  const saveAnexo = async () => {
    try {
      await ProcessoService.addAnexosProcesso({
        processoId: idProcesso,
        colaboradorId: idColaborador,
        anexos: [{ descricao, anexo: file }]
      });
      toast.success('Anexo adicionado com sucesso!');
      setOpen(false);
      setReloadFetch(true)
    } catch {
      toast.error('Erro ao adicionar anexo.');
    }
  };

  type IRow = Pick<IProcessoAnexos, 'id' | 'descricao' | 'path'> & { actions: ReactNode };

  const columns = [
    { id: 'id', label: '#' },
    { id: 'descricao', label: 'Descrição' },
    { id: 'actions', label: 'Opções' }
  ];

  const transformData = (data: IProcessoAnexos[]): IRow[] =>
    data.map((item, index) => ({
      id: index + 1,
      descricao: item.descricao,
      path: item.path,
      actions: (
        <>
          <IconButton color="primary" onClick={() => viewAnexo(item)} size="small">
            <PreviewIcon fontSize="inherit" />
          </IconButton>
          <IconButton color="error" onClick={() => onDelete(item)} size="small">
            <Delete fontSize="inherit" />
          </IconButton>
        </>
      )
    }));

  const handleFilesChange = (files: any) => {
    if (files && files[0]?.base64) {
      setFile(files[0].base64);
    }
  };

  const viewAnexo = (item: IProcessoAnexos) => {
    setSelectedAnexo(item);
  };

  const closePreview = () => {
    setSelectedAnexo(null);
  };

  return (
    <>
      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <Button variant="contained" startIcon={<AttachFile />} onClick={() => setOpen(true)}>
          Anexar
        </Button>
      </Stack>

      {data.length > 0 ? (
        <DataTable columns={columns} rows={transformData(data)} />
      ) : (
        <Alert severity="info">Nenhum anexo encontrado.</Alert>
      )}

      <SimpleModal open={open} onClose={() => setOpen(false)} title="Adicionar Anexo">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={12}>
            <FileUploader onFilesChange={handleFilesChange} />
          </Grid>
          <Grid item xs={12} mt={2}>
            <Button variant="contained" onClick={saveAnexo}>
              Salvar
            </Button>
          </Grid>
        </Grid>
      </SimpleModal>

      {/* Modal de preview fullscreen */}
      <Modal open={!!selectedAnexo} onClose={closePreview}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            bgcolor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <IconButton
            onClick={closePreview}
            sx={{ position: 'absolute', top: 16, right: 16, color: '#fff' }}
          >
            <Close fontSize="large" />
          </IconButton>

          {selectedAnexo && (
            <AttachmentPreview
              id={Number(selectedAnexo.id)}
              fetchUrl={selectedAnexo.path}
            />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default TabAnexos;
