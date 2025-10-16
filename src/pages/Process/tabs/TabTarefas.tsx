import React, { useState } from 'react';
import { Button, Stack, Alert } from '@mui/material';
import { Add } from '@mui/icons-material';
import DataTable from '../../../components/common/DataTable';
import SimpleModal from '../../../components/common/SimpleModal';
import TextField from '@mui/material/TextField';

interface Props {
  equipas: any[];
}

const TabTarefas: React.FC<Props> = ({ equipas }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
          Nova Equipa
        </Button>
      </Stack>
      {equipas.length > 0 ? (
        <DataTable
          columns={[
            { id: 'colaborador', label: 'Colaborador' },
            { id: 'funcao', label: 'Função' },
            { id: 'colaborador_tipo', label: 'Tipo' },
          ]}
          rows={equipas}
        />
      ) : (
        <Alert severity="info">Nenhuma equipa encontrada.</Alert>
      )}

      <SimpleModal open={open} onClose={() => setOpen(false)} title="Nova Equipa">
        <TextField label="Colaborador" fullWidth margin="dense" />
        <TextField label="Função" fullWidth margin="dense" />
      </SimpleModal>
    </>
  );
};

export default TabTarefas;
