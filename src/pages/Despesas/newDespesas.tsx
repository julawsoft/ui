import React, { useEffect, useState } from 'react';
import { Box, Grid, Alert, Stack, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import BoxCard from '../../components/common/BoxCard';
import BoxTop from '../../components/common/BoxTop';
import Loader from '../Loader';
import Input from '../../components/common/Input';
import SelectBox from '../../components/common/SelectBox';

import { ClientService } from '../../services/ClientService';
import { DespesasService } from '../../services/DespesasService';
import { useUserLogged } from '../../hooks/useUserLogged';
import { despesasSchema } from '../../validation/despesasSchema';

import type { DespesasFormData } from '../../validation/despesasSchema';
import type { IDespesas, ITipoDespesas } from '../../schema/interfaceDespesas';
import type { IProcesso } from '../../schema/InterfaceProcess';
import type { IClient } from '../../schema/InterfaceClient';
import { convertMoeda, parseValorBR } from '../../utils/data';

const NewDespesas: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUserLogged();

  const [tiposDespesas, setTiposDespesas] = useState<ITipoDespesas[]>([]);
  const [processos, setProcessos] = useState<IProcesso[]>([]);
  const [clientes, setClientes] = useState<IClient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<IDespesas | null>(null);

  const isEdit = Boolean(id);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<DespesasFormData>({
    resolver: zodResolver(despesasSchema),
    defaultValues: {
      tipo_despesa: '',
      processo_n: '',
      cliente_id: '',
      valor: '',
    },
  });

  // Carregar listas iniciais
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        const [tipos, clients] = await Promise.all([
          DespesasService.getAllTiposDespesas(),
          ClientService.getAll(),
        ]);
        setTiposDespesas(tipos);
        setClientes(clients);

        console.log("Os clientes ", clientes)

        // Se for edição, busca a despesa e preenche o form
        if (isEdit && id) {

          const despesa = await DespesasService.getById(Number(id));
          setData(despesa);

        const processosCliente = await ClientService.getProcessos(despesa.clienteId);
        setProcessos(processosCliente);

          reset({
            tipo_despesa: String(despesa.tipoDespesaId),
            processo_n: String(despesa.idProcesso),
            cliente_id: String(despesa.clienteId),
            valor:String(parseValorBR(String(despesa.valor))),
          });
        }
      } catch (error: any) {
        toast.error('Erro ao carregar dados iniciais.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [id, isEdit, reset]);

  const handleFetchProcessos = async (clientId: number) => {
    if (!clientId) return;
    try {
      const processos = await ClientService.getProcessos(clientId);
      setProcessos(processos);
    } catch (error) {
      toast.error('Erro ao carregar processos do cliente.');
    }
  };

  const onSubmit = async (formData: DespesasFormData) => {
    setIsSubmitting(true);

    const dataDTO = {
      processoId: formData.processo_n,
      valor: String(formData.valor),
      dataMovimento: String(new Date().toISOString().split('T')[0]),
      colaboradorId: Number(user?.id),
      clienteId: formData.cliente_id,
      tipoDespesaId: formData.tipo_despesa,
    };


    try {
      if (isEdit && id) {
        await DespesasService.update(Number(id), dataDTO);
        toast.success('Despesa atualizada com sucesso!');
      } else {
        await DespesasService.save(dataDTO);
        toast.success('Despesa cadastrada com sucesso!');
      }
      navigate('/despesas');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao salvar despesa.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => navigate('/despesas');

  if (isLoading) return <Loader />;

  return (
    <>
      <BoxTop title={isEdit ? 'Editar Despesa' : 'Nova Despesa'} />
      <BoxCard>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {/* Cliente */}
            <Grid item xs={12} md={3}>
              <Controller
                name="cliente_id"
                control={control}
                render={({ field }) => (
                  <>
                    <SelectBox
                      label="Cliente"
                      {...field}
                      onChange={(e) => {
                        const clientId = Number(e.target.value);
                        field.onChange(String(clientId));
                        handleFetchProcessos(clientId);
                      }}
                      options={clientes.map(c => ({ label: c.denominacao, value: String(c.id) }))}
                    />
                    {errors.cliente_id && <Alert severity="error">{errors.cliente_id.message}</Alert>}
                  </>
                )}
              />
            </Grid>

            {/* Processo */}
            <Grid item xs={12} md={3}>
              <Controller
                name="processo_n"
                control={control}
                render={({ field }) => (
                  <>
                    <SelectBox
                      label="Processo"
                      {...field}
                      options={processos.map(p => ({ label: p.ref, value: String(p.id) }))}
                    />
                    {errors.processo_n && <Alert severity="error">{errors.processo_n.message}</Alert>}
                  </>
                )}
              />
            </Grid>

            {/* Tipo de Despesa */}
            <Grid item xs={12} md={3}>
              <Controller
                name="tipo_despesa"
                control={control}
                render={({ field }) => (
                  <>
                    <SelectBox
                      label="Tipo de Despesa"
                      {...field}
                      options={tiposDespesas.map(d => ({ label: d.descricao, value: String(d.id) }))}
                    />
                    {errors.tipo_despesa && <Alert severity="error">{errors.tipo_despesa.message}</Alert>}
                  </>
                )}
              />
            </Grid>

            {/* Valor */}
            <Grid item xs={12} md={3}>
              <Controller
                name="valor"
                control={control}
                render={({ field }) => <Input label="Valor" type="text" {...field} />}
              />
              {errors.valor && <Alert severity="error">{errors.valor.message}</Alert>}
            </Grid>

            {/* Botões */}
            <Stack width="100%" direction="row" justifyContent="flex-end" gap={2} mt={3}>
              <Button onClick={handleCancel} color="inherit">
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? 'A guardar...'
                  : isEdit
                  ? 'Atualizar'
                  : 'Guardar'}
              </Button>
            </Stack>
          </Grid>
        </Box>
      </BoxCard>
    </>
  );
};

export default NewDespesas;
