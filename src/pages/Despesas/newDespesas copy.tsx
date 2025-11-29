import React, { useEffect, useState } from 'react';
import { Box, Grid, Alert, Stack, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import BoxCard from '../../components/common/BoxCard';
import BoxTop from '../../components/common/BoxTop';
import Loader from '../Loader';
import Input from '../../components/common/Input';
import SelectBox from '../../components/common/SelectBox';
import PrimaryButton from '../../components/common/PrimaryButton';
import { toast } from 'react-toastify';
import { ClientService } from '../../services/ClientService';
import { DespesasService } from '../../services/DespesasService';
import { ProcessoService } from '../../services/ProcessoService';
import type { IDespesas, ITipoDespesas } from '../../schema/interfaceDespesas';
import type { IProcesso } from '../../schema/InterfaceProcess';
import type { IClient } from '../../schema/InterfaceClient';
import type { DespesasFormData } from '../../validation/despesasSchema';
import { despesasSchema } from '../../validation/despesasSchema';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserLogged } from '../../hooks/useUserLogged';
import { parseValorBR } from '../../utils/data';

const NewDespesas: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUserLogged()
  const [despesas, setDespesas] = useState<ITipoDespesas[]>([]);
  const [processos, setProcessos] = useState<IProcesso[]>([]);
  const [clientes, setClientes] = useState<IClient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IDespesas>();

  useEffect(() => {
    if(!id) return

    const fetchDespesa = async () => {
      try{        
        const response = await DespesasService.getById(Number(id))
        setData(response)
      }catch(e){
        toast.error(String(e))
      }
    }
    fetchDespesa()
  },[])

  // React Hook Form
  const { control, handleSubmit, formState: { errors } } = useForm<DespesasFormData>({
    resolver: zodResolver(despesasSchema),
   defaultValues:  {
        tipo_despesa: data?.tipoMovimento,
        processo_n: data?.idProcesso,
        cliente_id: data?.clienteId,
        valor: data?.valor ? parseValorBR(String(data?.valor)) : 0,
    }
        
  });

  // Funções para buscar dados
  const fetchTiposDespesas = async () => setDespesas(await DespesasService.getAllTiposDespesas());
  const fetchClientes = async () => setClientes(await ClientService.getAll());
  const fetchProcessosByClientId = async (idClient: number) => setProcessos(await ClientService.getProcessos(idClient));

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setIsLoading(true);
        await Promise.all([fetchTiposDespesas(), fetchClientes()]);
      } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
        toast.error('Erro ao carregar dados iniciais.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, []);

  const onSubmit = async (data: DespesasFormData) => {
    console.log('Dados do formulário:', data);
    try {
      const dataDTO: any = {
        processoId: data.processo_n,
        valor: data.valor,
        dataMovimento: new Date(),
        colaboradorId: user?.id,
        clienteId: data.cliente_id,
        tipoDespesaId: data.tipo_despesa
      }
      await DespesasService.save(dataDTO);
      toast.success('Despesa cadastrada com sucesso!');
      navigate('/despesas'); // Redireciona após salvar
    } catch (error: any) {
      toast.error(error.message || 'Erro ao salvar despesa.');
    }
  };

  const handleClose = () => {
    navigate('/despesas');
  }

  if (isLoading) return <Loader />;

  return (
    <>
      <BoxTop title="Nova Despesa" />
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
                      onChange={(selectedValue) => {
                        console.log("selectedValue ", selectedValue)
                        field.onChange(selectedValue);        // Atualiza o RHF
                        fetchProcessosByClientId(selectedValue.target.value); // Busca processos do cliente
                      }}
                      options={clientes.map(c => ({ label: c.denominacao, value: c.id }))}
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
                      options={processos.map(p => ({ label: p.ref, value: p.id }))}
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
                      options={despesas.map(d => ({ label: d.descricao, value: d.id }))}
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

            {/* Botão de salvar */}
            <Stack width={'100%'} direction="row" justifyContent="flex-end" gap={2} mt={3}>
              <Button onClick={handleClose} color="inherit">
                Cancelar
              </Button>
              <Button type="submit" variant="contained" disabled={isLoading}>
                {isLoading ? 'A guardar...' : 'Guardar'}
              </Button>
            </Stack>
          </Grid>
        </Box>
      </BoxCard>
    </>
  );
};

export default NewDespesas;
