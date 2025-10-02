import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Alert, Tabs, Tab, Typography } from '@mui/material';
import BoxCard from '../../components/common/BoxCard';
import BoxTop from '../../components/common/BoxTop';
import Loader from '../../components/common/Loader';
import DataTable from '../../components/common/DataTable';
import StateHandler from '../../components/common/StateHandler';
import { ClientService } from '../../services/ClientService';
import { IClient } from '../../schema/InterfaceClient';
import { IProcesso } from '../../schema/InterfaceProcess';
import { processoColumns, transformDataProcesso } from '../Process/transformProcesso';
import { toast } from 'react-toastify';
import BreadcrumbsNav from '../../components/common/BreadcrumbsNav';
import { generateClientPDF } from '../../utils/reports/generateClientPDF';
import PrimaryButton from '../../components/common/PrimaryButton';

const tiposCliente = [
  { label: 'Empresa', value: 1 },
  { label: 'Particular', value: 2 },
  { label: 'Ministério', value: 3 },
  { label: 'Instituto Público', value: 4 },
  { label: 'Associação', value: 5 },
  { label: 'Outro', value: 6 },
];

const statusOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
];

const ViewClientTabs: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<IClient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [tabIndex, setTabIndex] = useState(0);
  const [processos, setProcessos] = useState<IProcesso[]>([]);
  const [tabLoading, setTabLoading] = useState(false);
  const [tabError, setTabError] = useState('');

  useEffect(() => {
    const fetchClient = async () => {
      setLoading(true);
      try {
        if (!id) throw new Error('ID do cliente não fornecido');
        const data = await ClientService.getById(Number(id));
        setClient(data);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar o cliente');
        toast.error(err.message || 'Erro ao carregar o cliente');
      } finally {
        setLoading(false);
      }
    };
    fetchClient();
  }, [id]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    fetchTabData(newValue);
  };

  const fetchTabData = async (index: number) => {
    if (!client) return;
    setTabLoading(true);
    setTabError('');
    try {
      switch (index) {
        /* case 0: // Processos
          const proc = await ProcessoService.getByClientId(client.id);
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
  if (!client) return <Alert severity="warning">Cliente não encontrado</Alert>;

  const getTipoLabel = (value: number) => tiposCliente.find(t => t.value === value)?.label || '';
  const getStatusLabel = (value: string) => statusOptions.find(s => s.value === value)?.label || '';

  return (
    <>
      <BreadcrumbsNav
        items={[
          { label: "Clientes", path: "/clientes" },
          // { label: "Configurações", path: "/settings" },
          { label: "Detalhes do cliente" } // último sem path
        ]}
      />
      <BoxTop
        title={`Cliente: ${client.denominacao}`}
        actions={
          <>
            <PrimaryButton onClick={()=> generateClientPDF(client)}>Imprimir</PrimaryButton>
          </>
        }
        />
      <Grid container spacing={2}>
        {/* Coluna esquerda: detalhes do cliente */}
        <Grid item xs={12} md={3}>
          <BoxCard>
            <Typography variant="h6" mb={2}>Detalhes</Typography>
            <Typography variant="subtitle2" color="textSecondary">Tipo</Typography>
            <Typography mb={1}>{getTipoLabel(client.tipo_id)}</Typography>

            <Typography variant="subtitle2" color="textSecondary">Nome/Denominação</Typography>
            <Typography mb={1}>{client.denominacao}</Typography>

            <Typography variant="subtitle2" color="textSecondary">NIF</Typography>
            <Typography mb={1}>{client.nif}</Typography>

            <Typography variant="subtitle2" color="textSecondary">Pessoa de Contacto</Typography>
            <Typography mb={1}>{client.pessoa_contacto}</Typography>

            <Typography variant="subtitle2" color="textSecondary">Contacto de Cobrança</Typography>
            <Typography mb={1}>{client.contacto_cobranca}</Typography>

            <Typography variant="subtitle2" color="textSecondary">E-mail</Typography>
            <Typography mb={1}>{client.e_mail}</Typography>

            <Typography variant="subtitle2" color="textSecondary">Endereço</Typography>
            <Typography mb={1}>{client.endereco}</Typography>

            <Typography variant="subtitle2" color="textSecondary">Nota</Typography>
            <Typography mb={1}>{client.nota || '-'}</Typography>

            <Typography variant="subtitle2" color="textSecondary">Status</Typography>
            <Typography mb={1}>{getStatusLabel(client.status)}</Typography>
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

export default ViewClientTabs;
