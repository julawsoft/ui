import React, { useEffect, useState, type ReactNode } from 'react';
import { Button, Stack, Alert, IconButton, Grid } from '@mui/material';
import { Add } from '@mui/icons-material';
import DataTable from '../../../components/common/DataTable';
import SimpleModal from '../../../components/common/SimpleModal';
import type { IProcesso, IProcessoPrecedentes, ITarefa } from '../../../schema/InterfaceProcess';

import SelectBox from '../../../components/common/SelectBox';
import { toast } from 'react-toastify';
import { ProcessoService } from '../../../services/ProcessoService';
import { Delete } from '@mui/icons-material';

interface Props {
  data: IProcessoPrecedentes[];
  onDelete: (item: IProcessoPrecedentes) => void
  idProcesso: number
  setReloadFetch: (status: boolean) => void
}

const TabAssociados: React.FC<Props> = ({ data, onDelete, idProcesso, setReloadFetch }) => {

  const [open, setOpen] = useState(false);
  const [processos, setProcessos] = useState<IProcesso[]>([])
  const [selectedValue, setSelectedValue] = useState<number>()

  useEffect(() => {
    const fetchAll = async () => {
      try {
        await Promise.all([fetchColaboradores()]);
      } catch (error) {
        toast.error('Erro ao carregar dados iniciais.');
      }
    };
    fetchAll();
  }, [])

  const fetchColaboradores = async () => setProcessos(await ProcessoService.getAllColaboradoresWithoutAssociadoProcesso());

  const saveAssociados = async () => {
    try {
      await ProcessoService.addAssociadosProcesso({
        processoId: idProcesso,
        precedentes: [Number(selectedValue)]
      })
      setOpen(false)
      setReloadFetch(true)
    } catch (error) {
      toast.error('Erro ao carregar dados iniciais.');
    }
  }

  /*
  type IRow = Pick<
  IProcessoPrecedentes,
    | "id"
    | "precedente_refencia"
    | "precedente_assunto"
  > & {
    actions: ReactNode;
  };
  */

  const columns = [
    { id: 'id', label: '#' },
    { id: 'processo', label: 'Ref. Processo' },
    { id: 'assunto', label: 'Assunto' },
    { id: 'actions', label: 'Opções' },
  ]

  const transformData = (
    data: IProcessoPrecedentes[]
  ): any[] => {
    return data.map((item:IProcessoPrecedentes, index) => ({
      id: index + 1,
      processo: item.precedente_refencia,
      assunto: item.precedente_assunto,
      actions: (
        <>
          <IconButton
            color="error"
            onClick={() => onDelete(item)}
            size="small"
          >
            <Delete fontSize="inherit" />
          </IconButton>
        </>
      ),
    }));
  };

  return (
    <>
      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
          Associar
        </Button>
      </Stack>
      {data.length > 0 ? (
        <DataTable
          columns={columns}
          rows={transformData(data)}
        />
      ) : (
        <Alert severity="info">Nenhuma tarefa associada.</Alert>
      )}
      <SimpleModal open={open} onClose={() => setOpen(false)} title="Nova Equipa">
        <Grid item xs={12} md={12}>
          <SelectBox
            label="Processos"
            value={Number(selectedValue)}
            fullWidth
            options={
              (processos?.map((processo: IProcesso) => ({
                value: processo.id,
                label: processo.ref ? `${processo.ref} | ${processo.assunto}` : ''
              })) ?? [])
            }
            onChange={(selectedValue) => {
              console.log(" selectedValue >>> ", selectedValue)
              setSelectedValue(selectedValue.target.value)
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} mt={2}>
          <Button variant="contained" onClick={saveAssociados}>
            Associar
          </Button>
        </Grid>
      </SimpleModal>
    </>
  );
};

export default TabAssociados;
