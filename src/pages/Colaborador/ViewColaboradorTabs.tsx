// src/pages/Colaborador/ViewColaboradorTabs.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Alert, Tabs, Tab, Typography } from '@mui/material';
import BoxCard from '../../components/common/BoxCard';
import BoxTop from '../../components/common/BoxTop';
import Loader from '../../components/common/Loader';
import DataTable from '../../components/common/DataTable';
import StateHandler from '../../components/common/StateHandler';
import BreadcrumbsNav from '../../components/common/BreadcrumbsNav';
import { ColaboradorService } from '../../services/ColaboradorService';
import type { IColaborador } from '../../schema/InterfaceColaboradores';
import { IProcesso } from '../../schema/InterfaceProcess';
import { processoColumns, transformDataProcesso } from '../Process/transformProcesso';
import { toast } from 'react-toastify';
import { generateColaboradorPDF } from '../../utils/reports/generateColaboradorPDF';
import PrimaryButton from '../../components/common/PrimaryButton';

const statusOptions = [
  { label: 'Ativo', value: 'active' },
  { label: 'Inativo', value: 'inactive' },
];

const ViewColaboradorTabs: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [colaborador, setColaborador] = useState<IColaborador | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [tabIndex, setTabIndex] = useState(0);
  const [processos, setProcessos] = useState<IProcesso[]>([]);
  const [tabLoading, setTabLoading] = useState(false);
  const [tabError, setTabError] = useState('');

  useEffect(() => {
    const fetchColaborador = async () => {
      setLoading(true);
      try {
        if (!id) throw new Error('ID do colaborador não fornecido');
        const data = await ColaboradorService.getById(Number(id));
        setColaborador(data);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar o colaborador');
        toast.error(err.message || 'Erro ao carregar o colaborador');
      } finally {
        setLoading(false);
      }
    };
    fetchColaborador();
  }, [id]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    fetchTabData(newValue);
  };

  const fetchTabData = async (index: number) => {
    if (!colaborador) return;
    setTabLoading(true);
    setTabError('');
    try {
      switch (index) {
        /* case 0:
          const proc = await ProcessoService.getByColaboradorId(colaborador.id);
          setProcessos(proc);
          break; */
      }
    } catch (err: any) {
      setTabError(err.message || 'Erro ao carregar dados');
      toast.error(err.message || 'Erro ao carregar dados');
    } finally {
      setTabLoading(false);
    }
  };

  if (loading) return <Loader fullscreen />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!colaborador) return <Alert severity="warning">Colaborador não encontrado</Alert>;

  const getStatusLabel = (value: string) => statusOptions.find(s => s.value === value)?.label || '-';

  return (
    <>
      <BreadcrumbsNav
        items={[
          { label: "Colaboradores", path: "/colaboradores" },
          { label: "Detalhes do colaborador" }
        ]}
      />
      <BoxTop
        title={`Colaborador: ${colaborador.nome_profissional || colaborador.nome_completo}`}
        actions={
          <>
            <PrimaryButton onClick={()=> generateColaboradorPDF(colaborador)}>Imprimir</PrimaryButton>
          </>
        }
      />

      <Grid container spacing={2}>
        {/* Coluna esquerda: detalhes do colaborador */}
        <Grid item xs={12} md={3}>
          <BoxCard>
            <Typography variant="h6" mb={2}>Detalhes</Typography>

            <Typography variant="subtitle2" color="textSecondary">Nome Completo</Typography>
            <Typography mb={1}>{colaborador.nome_completo || '-'}</Typography>

            <Typography variant="subtitle2" color="textSecondary">Nome Profissional</Typography>
            <Typography mb={1}>{colaborador.nome_profissional || '-'}</Typography>

            <Typography variant="subtitle2" color="textSecondary">Inicial</Typography>
            <Typography mb={1}>{colaborador.inicial || '-'}</Typography>

            <Typography variant="subtitle2" color="textSecondary">Função</Typography>
            <Typography mb={1}>{colaborador.funcao || '-'}</Typography>

            <Typography variant="subtitle2" color="textSecondary">Tipo Colaborador</Typography>
            <Typography mb={1}>{colaborador.tipoColaborador || '-'}</Typography>

            <Typography variant="subtitle2" color="textSecondary">Categoria</Typography>
            <Typography mb={1}>{colaborador.categoria || '-'}</Typography>

            <Typography variant="subtitle2" color="textSecondary">Data de Nascimento</Typography>
            <Typography mb={1}>{colaborador.data_nascimento || '-'}</Typography>

            <Typography variant="subtitle2" color="textSecondary">Taxa Horária</Typography>
            <Typography mb={1}>{colaborador.taxa_horaria ?? '-'}</Typography>

            <Typography variant="subtitle2" color="textSecondary">Contacto Pessoal</Typography>
            <Typography mb={1}>{colaborador.contacto_pessoal || '-'}</Typography>

            <Typography variant="subtitle2" color="textSecondary">Contacto Emergência</Typography>
            <Typography mb={1}>{colaborador.contacto_emergencia || '-'}</Typography>

            <Typography variant="subtitle2" color="textSecondary">Nº Identificação</Typography>
            <Typography mb={1}>{colaborador.n_identificacao || '-'}</Typography>

            <Typography variant="subtitle2" color="textSecondary">Nº Cédula Ordem</Typography>
            <Typography mb={1}>{colaborador.n_cedula_ordem || '-'}</Typography>

            <Typography variant="subtitle2" color="textSecondary">Email Pessoal</Typography>
            <Typography mb={1}>{colaborador.email_pessoal || '-'}</Typography>

            <Typography variant="subtitle2" color="textSecondary">Email Corporativo</Typography>
            <Typography mb={1}>{colaborador.email_corporativo || '-'}</Typography>

            <Typography variant="subtitle2" color="textSecondary">Status</Typography>
            <Typography mb={1}>{getStatusLabel(colaborador.status)}</Typography>
          </BoxCard>
        </Grid>

        {/* Coluna direita: tabs */}
        <Grid item xs={12} md={9}>
          <BoxCard>
            <Tabs value={tabIndex} onChange={handleTabChange}>
              <Tab label="Processos" />
              <Tab label="TimeSheets" />
              <Tab label="Honorários" />
            </Tabs>

            <Box sx={{ mt: 2 }}>
              <StateHandler
                isLoading={tabLoading}
                error={tabError}
                hasData={tabIndex === 0 ? processos.length > 0 : false}
              />

              {!tabLoading && !tabError && tabIndex === 0 && processos.length > 0 && (
                <DataTable
                  columns={processoColumns}
                  rows={transformDataProcesso(processos, () => { }, () => { })}
                />
              )}
            </Box>
          </BoxCard>
        </Grid>
      </Grid>
    </>
  );
};

export default ViewColaboradorTabs;
