import React, { useEffect, useState } from 'react';
import { Button, Stack, Alert, IconButton, Grid } from '@mui/material';
import { Add } from '@mui/icons-material';
import DataTable from '../../../components/common/DataTable';
import SimpleModal from '../../../components/common/SimpleModal';
import type { IEquipa } from '../../../schema/InterfaceProcess';

import type { IColaborador } from '../../../schema/InterfaceColaboradores';
import SelectBox from '../../../components/common/SelectBox';
import { ColaboradorService } from '../../../services/ColaboradorService';
import { toast } from 'react-toastify';
import { ProcessoService } from '../../../services/ProcessoService';
import { Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ROUTES_PATH } from '../../../routes/routePaths';

interface Props {
  equipas: IEquipa[];
  onDelete: (item: IEquipa) => void
  idProcesso: number
  setReloadFetch: (status: boolean) => void
}

const TabEquipas: React.FC<Props> = ({ equipas, onDelete, idProcesso, setReloadFetch }) => {

  const [open, setOpen] = useState(false);
  const [colaboradores, setColaboradores] = useState<IColaborador[]>([])
  const [selectedValue, setSelectedValue] = useState<number>()

  useEffect(() => {
    const fetchAll = async () => {
      try {
        await Promise.all([fetchColaboradores()]);
      } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
        toast.error('Erro ao carregar dados iniciais.');
      }
    };
    fetchAll();
  }, [])

  const fetchColaboradores = async () => setColaboradores(await ColaboradorService.getAllColaboradoresWithoutEquipaProcesso());

  const saveColaboradores = async () => {
    try {
      await ProcessoService.addEquipasTarefas({
        processoId: idProcesso,
        colaboradoresId: [Number(selectedValue)]
      })
      setOpen(false)
      setReloadFetch(true)
    } catch (error) {
      toast.error('Erro ao carregar dados iniciais.');
    }
  }

  /*
  type IEquipasRow = Pick<
    IEquipa,
    | "id"
    | "colaborador_id"
    | "colaborador"
    | "funcao"
    | "colaborador_tipo"
  > & {
    actions: ReactNode;
  };
  */

  const columnsEquipa = [
    { id: 'id', label: '#' },
    { id: 'colaborador', label: 'Colaborador' },
    { id: 'funcao', label: 'Função' },
    { id: 'colaborador_tipo', label: 'Tipo' },
    { id: 'actions', label: 'Opções' },
  ]

  const transformData = (
    data: IEquipa[]
  ): any[] => {
    return data.map((item, index) => ({
      id: index + 1,
      colaborador: (
        <Link title='Ver detalhes do Colaborador' to={`${ROUTES_PATH.ViewColaborador}/${item.colaborador_id}`}>
          {item.colaborador}
        </Link>
      ),
      funcao: item.funcao,
      colaborador_tipo: item.colaborador_tipo,
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
          Adicionar
        </Button>
      </Stack>
      {equipas.length > 0 ? (
        <DataTable
          columns={columnsEquipa}
          rows={transformData(equipas)}
        />
      ) : (
        <Alert severity="info">Nenhuma colaborador encontrado.</Alert>
      )}
      <SimpleModal open={open} onClose={() => setOpen(false)} title="Nova Equipa">
        <Grid item xs={12} md={12}>
          <SelectBox
            label="Colaboradores"
            value={Number(selectedValue)}
            fullWidth
            options={
              (colaboradores?.map((colaborador: IColaborador) => ({
                value: colaborador.id,
                label: colaborador.nome_completo ?? ''
              })) ?? [])
            }
            onChange={(selectedValue) => {
              console.log(" selectedValue >>> ", selectedValue)
              setSelectedValue(selectedValue.target.value)
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} mt={2}>
          <Button variant="contained" onClick={saveColaboradores}>
            Salvar
          </Button>
        </Grid>
      </SimpleModal>
    </>
  );
};

export default TabEquipas;
