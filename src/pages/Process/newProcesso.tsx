import React, { useEffect, useState } from 'react';
import { Box, Grid, Stack, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import BoxCard from '../../components/common/BoxCard';
import BoxTop from '../../components/common/BoxTop';
import Input from '../../components/common/Input';
import SelectBox from '../../components/common/SelectBox2';
import PrimaryButton from '../../components/common/PrimaryButton';
import Loader from '../Loader';
import { toast } from 'react-toastify';
import type { IProcessoInput, IProcessoInstituicoes, IProcessoModoFacturacao, IProcessoStatus } from '../../schema/InterfaceProcess';
import { ProcessoService } from '../../services/ProcessoService';
import { ColaboradorService } from '../../services/ColaboradorService';
import { ClientService } from '../../services/ClientService';
import type { IClient } from '../../schema/InterfaceClient';
import type { IColaborador } from '../../schema/InterfaceColaboradores';
import BreadcrumbsNav from '../../components/common/BreadcrumbsNav';
import { ROUTES_PATH } from '../../routes/routePaths';

const NewProcesso: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [instituicoes, setInstituicoes] = useState<IProcessoInstituicoes[]>([]);
  const [clientes, setClientes] = useState<IClient[]>([]);
  const [gestores, setGestores] = useState<IColaborador[]>([]);
  const [statusOptions, setStatusOptions] = useState<IProcessoStatus[]>([]);
  const [modosFacturacao, setModosFacturacao] = useState<IProcessoModoFacturacao[]>([]);
  const [isDisableValor, setIsDisabledValor] = useState<boolean>(false)

  const fases = [
    {
      id: 'Judicial',
      label: 'Judicial'
    },
    {
      id: 'Extrajudicial',
      label: 'Extrajudicial'
    }
  ]

  const fetchGestores = async () =>
    setGestores(await ColaboradorService.getAll());
  const fetchClientes = async () =>
    setClientes(await ClientService.getAll());

  const fetchInstituicaoes = async () =>
    setInstituicoes(await ProcessoService.listInstituicoes());

  const fetchModoFacturacao = async () =>
    setModosFacturacao(await ProcessoService.listModoFacturacao());

  const fetchStatus = async () =>
    setStatusOptions(await ProcessoService.listStatus());


  const {
    handleSubmit,
    control,
    setValue,
  } = useForm<IProcessoInput>({
    defaultValues: {
      nProcessoJudicial: '',
      assunto: '',
      area: '',
      fase: '',
      instituicaoId: 1,
      modoFacturacaoId: 1,
      gestorId: 1,
      clienteId: 1,
      contraParte: '',
      dataRegisto: '',
      horasMes: '',
      valorTotal: null,
      statusId: 1,
    },
  });


  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([fetchGestores(), fetchClientes(), fetchInstituicaoes(), fetchModoFacturacao(), fetchStatus()]);
        if (id) {
          const processo = await ProcessoService.getById(Number(id));

          const processoAdapter: IProcessoInput = {
              assunto: processo.assunto,
              area: processo.area,
              fase: processo.fase,
              instituicaoId: Number(processo.instituicao_id),
              modoFacturacaoId: Number(processo.modo_facturacao_id),
              gestorId: Number(processo.gestor_id),
              clienteId: Number(processo.cliente_id),
              contraParte: String(processo.contra_parte),
              dataRegisto: processo.data_registo.substring(0,10),
              statusId: Number(processo.status_id), 
              horasMes: processo.horas_mes,
              nProcessoJudicial: String(processo.n_processo_judicial),
              valorTotal: processo.valor_total ?? 0
          }

          Object.keys(processoAdapter).forEach((key) => {
            const value = processoAdapter[key as keyof typeof processoAdapter];
            setValue(key as keyof IProcessoInput, value != null ? String(value) : '');
          });
        }
      } catch (e: any) {
        toast.error('Erro ao carregar processo: ' + e.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [id]);

  const onSubmit = async (data: IProcessoInput) => {
    try {
      setIsLoading(true);

      const dataToSave: IProcessoInput = {
        "assunto": data.assunto,
        "area": data.area,
        "fase": data.fase,
        "instituicaoId": Number(data.instituicaoId),
        "modoFacturacaoId": Number(data.modoFacturacaoId),
        "gestorId": Number(data.gestorId),
        "clienteId": data.clienteId,
        "contraParte": data.contraParte ?? '',
        "dataRegisto": data.dataRegisto,
        "statusId": data.statusId,
        "horasMes": data.horasMes,
        "valorTotal": data.valorTotal,
        "nProcessoJudicial": data.nProcessoJudicial ?? ''
      }

      if (id) {
        await ProcessoService.update(dataToSave, Number(id));
        toast.success('Processo atualizado com sucesso!');
      } else {
        await ProcessoService.save(dataToSave);
        toast.success('Processo criado com sucesso!');
      }
      navigate('/processos');
    } catch (e: any) {
      toast.error('Erro ao salvar processo: ' + e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    navigate(ROUTES_PATH.Process)
  }

  const handleChangeModoFacturacao = (value: any, field: any) => {
    const index = Number(value.target.value)
    field.onChange(index)
    index === 1 ? setIsDisabledValor(false) : setIsDisabledValor(true)
  }

  return (
    <>
      <BreadcrumbsNav
        items={[
          { label: "Início", path: "/" },
          { label: "Lista dos Processos ", path: "/processos" },
          { label: id ? "Editar Processo" : "Novo Processo" }
        ]}
      />
      <BoxTop title={id ? 'Editar Processo' : 'Novo Processo'} />
      <BoxCard>
        {isLoading && <Loader />}
        {!isLoading && (
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {/* Referência */}
              <Grid item xs={12} md={3}>
                <Controller
                  name="nProcessoJudicial"
                  control={control}
                  render={({ field }) => (
                    <Input label="N.º Processo Judicial" {...field} value={field.value ?? ''} />
                  )}
                />
              </Grid>
              {/* Referência */}
              <Grid item xs={12} md={3}>
                <Controller
                  name="contraParte"
                  control={control}
                  render={({ field }) => (
                    <Input label="Contra Parte" {...field} value={field.value ?? ''} />
                  )}
                />
              </Grid>
              {/* Assunto */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="assunto"
                  control={control}
                  render={({ field }) => (
                    <Input label="Assunto" {...field} value={field.value ?? ''} />
                  )}
                />
              </Grid>

              {/* Área e Fase */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="area"
                  control={control}
                  render={({ field }) => (
                    <Input label="Área" {...field} value={field.value ?? ''} />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="fase"
                  control={control}
                  render={({ field }) => (
                    <SelectBox
                      label="Fase"
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(e.target.value)}
                      options={fases.map((c) => ({
                        label: c.label,
                        value: String(c.id),
                      }))}
                    />
                  )}
                />
              </Grid>

              {/* Cliente */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="clienteId"
                  control={control}
                  render={({ field }) => (
                    <SelectBox
                      label="Cliente"
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(e.target.value)}
                      options={clientes.map((c) => ({
                        label: c.denominacao,
                        value: String(c.id),
                      }))}
                    />
                  )}
                />
              </Grid>

              {/* Instituição */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="instituicaoId"
                  control={control}
                  render={({ field }) => (
                    <SelectBox
                      label="Instituição"
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(e.target.value)}
                      options={instituicoes.map((i) => ({
                        label: i.descricao,
                        value: String(i.id),
                      }))}
                    />
                  )}
                />
              </Grid>

              {/* Gestor e Modo de Facturação */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="gestorId"
                  control={control}
                  render={({ field }) => (
                    <SelectBox
                      label="Gestor"
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(e.target.value)}
                      options={gestores.map((g) => ({
                        label: String(g.nome_completo),
                        value: String(g.id),
                      }))}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="modoFacturacaoId"
                  control={control}
                  render={({ field }) => (
                    <SelectBox
                      label="Modo de Facturação"
                      value={field.value ?? ''}
                      onChange={(e: any) => handleChangeModoFacturacao(e, field)}
                      options={modosFacturacao.map((m) => ({
                        label: String(m.descricao),
                        value: String(m.id),
                      }))}
                    />
                  )}
                />
              </Grid>

              {
                isDisableValor ? (<Grid item xs={12} md={4}>
                  <Controller
                    name="valorTotal"
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="Valor Total (AOA)"
                        type="number"

                        {...field}
                        value={String(field.value)}
                      />
                    )}
                  />
                </Grid>
                ) : (<Grid item xs={12} md={4}>
                  <Controller
                    name="horasMes"
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="Horas / Mês"
                        type="number"
                        {...field}
                        value={String(field.value)}
                      />
                    )}
                  />
                </Grid>)
              }
              {/* Valor total */}

              <Grid item xs={12} md={4}>
                <Controller
                  name="dataRegisto"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Data Registo"
                      type="date"
                      {...field}
                      value={field.value ?? ''}
                    />
                  )}
                />
              </Grid>

              {/* Estado */}
              <Grid item xs={12} md={4}>
                <Controller
                  name="statusId"
                  control={control}
                  render={({ field }) => (
                    <SelectBox
                      label="Estado"
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(e.target.value)}
                      options={statusOptions.map((m) => ({
                        label: String(m.descricao),
                        value: String(m.id),
                      }))}
                    />
                  )}
                />
              </Grid>


              {/* Botões */}
              <Grid item xs={12} md={12}>
                <Stack width={'100%'} direction="row" justifyContent="flex-end" gap={2} mt={3}>
                  <Button onClick={handleClose} color="inherit">
                    Cancelar
                  </Button>
                  <PrimaryButton type="submit">{id ? 'Atualizar' : 'Salvar'}</PrimaryButton>

                </Stack>
              </Grid>
            </Grid>
          </Box>
        )}
      </BoxCard>
    </>
  );
};

export default NewProcesso;
