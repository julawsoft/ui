import React, { useEffect, useState } from 'react';
import { Box, Grid, Alert } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import BoxCard from '../../components/common/BoxCard';
import BoxTop from '../../components/common/BoxTop';
import Loader from '../Loader';
import Input from '../../components/common/Input';
import SelectBox from '../../components/common/SelectBox2';
import PrimaryButton from '../../components/common/PrimaryButton';
import { toast } from 'react-toastify';
import { ColaboradorService } from '../../services/ColaboradorService';
import {
  colaboradorSchema,
  type ColaboradorFormData,
} from '../../validation/colaboradorSchema';
import { useNavigate, useParams } from 'react-router-dom';
import type {
  ICategoriaColaborador,
  IColaboradorInput,
  ITipoColaborador,
} from '../../schema/InterfaceColaboradores';

const statusOptions = [
  { label: 'Ativo', value: 'active' },
  { label: 'Inativo', value: 'inactive' },
];

const funcaoOptions = [
  { label: 'Administrativo', value: 'Administrativo' },
  { label: 'Advogado', value: 'Advogado' },
  { label: 'Estagiário', value: 'Estagiario' },
];

const NewColaborador: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tiposColaborador, setTiposColaborador] = useState<ITipoColaborador[]>([]);
  // const [colaborador, setColaborador] = useState<IColaborador>({});
  const [categorias, setCategorias] = useState<ICategoriaColaborador[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTipoColaboradores = async () =>
    setTiposColaborador(await ColaboradorService.getAllTiposColaboradores());
  const fetchCategoriasColaboradores = async () =>
    setCategorias(await ColaboradorService.getAllCategoriasColaborador());

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue
  } = useForm<ColaboradorFormData>({
    resolver: zodResolver(colaboradorSchema),
    defaultValues: {
      nome_completo: '',
      nome_profissional: '',
      funcao: '',
      tipo_colaborador_id: null,
      categoria_id: null,
      data_nascimento: '',
      taxa_horaria: '',
      status: 'active',
      contacto_pessoal: '',
      contacto_emergencia: '',
      n_identificacao: '',
      n_cedula_ordem: '',
      email_pessoal: '',
      email_corporativo: '',
      userName: '',
    },
  });


  useEffect(() => {

    if (id) {
      getColaboradorById(Number(id))
    }
    const fetchAll = async () => {
      try {
        setIsLoading(true);
        await Promise.all([fetchTipoColaboradores(), fetchCategoriasColaboradores()]);
      } catch (e) {
        toast.error(String(e));
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, [id, setValue]);

  const getColaboradorById = async function (id: number) {
    try {
      const colaborador = await ColaboradorService.getById(id)
      Object.keys(colaborador).forEach((key) => {
        const value = colaborador[key as keyof typeof colaborador];
        setValue(key as keyof ColaboradorFormData, value != null ? 
          
         String(value) 
          
          : '');
      });
    } catch (e: any) {
      toast.error(e.message || 'Erro ao carregar cliente');
    }
  }



  const onSubmit = async (data: ColaboradorFormData) => {
    try {
      setIsLoading(true);
      const dataToSave: IColaboradorInput = {
        nomeCompleto: data.nome_completo,
        nomeProfissional: data.nome_profissional ?? '',
        funcao: data.funcao ?? '',
        tipoColaboradorId: Number(data.tipo_colaborador_id) ?? 0,
        dataNascimento: data.data_nascimento ?? '',
        taxaHoraria: Number(data.taxa_horaria) ?? 0,
        status: data.status ?? 'active',
        contactoPessoal: Number(data.contacto_pessoal) ?? null,
        contactoEmergencia: Number(data.contacto_emergencia) ?? null,
        nIdentificacao: data.n_identificacao ?? '',
        nCedulaOrdem: data.n_cedula_ordem ?? '',
        emailPessoal: data.email_pessoal ?? '',
        emailCorporativo: data.email_corporativo ?? '',
        categoriaId: Number(data.categoria_id) ?? 0,
        userName: data.userName
      };

      if(!id){
        await ColaboradorService.save(dataToSave);
        toast.success('Colaborador cadastrado com sucesso!');
        reset();     
      }else{
        const dataToUpdate: any = {
          nomeCompleto: data.nome_completo,
          nomeProfissional: data.nome_profissional ?? '',
          funcao: data.funcao ?? '',
          tipoColaboradorId: Number(data.tipo_colaborador_id) ?? 0,
          dataNascimento: data.data_nascimento ?? '',
          taxaHoraria: Number(data.taxa_horaria) ?? 0,
          status: data.status ?? 'active',
          contactoPessoal: Number(data.contacto_pessoal) ?? null,
          contactoEmergencia: Number(data.contacto_emergencia) ?? null,
          nIdentificacao: data.n_identificacao ?? '',
          nCedulaOrdem: data.n_cedula_ordem ?? '',
          emailPessoal: data.email_pessoal ?? '',
          emailCorporativo: data.email_corporativo ?? '',
          categoriaId: Number(data.categoria_id) ?? 0,
        };
        await ColaboradorService.update(dataToUpdate, Number(id));
        toast.success('Colaborador alterado com sucesso!');
        reset();   
      }
      reset();
      setTimeout(() => navigate('/colaboradores'), 1000);
    } catch (err: any) {
      toast.error(err.message || 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <BoxTop title={id ? 'Alterar Colaborador' :'Novo Colaborador'} />
      <BoxCard>
        {isLoading && <Loader />}
        {!isLoading && (
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {/* Nome Completo */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="nome_completo"
                  control={control}
                  render={({ field }) => (
                    <Input label="Nome Completo" {...field} value={field.value ?? ''} />
                  )}
                />
                {errors.nome_completo && (
                  <Alert severity="error">{errors.nome_completo.message}</Alert>
                )}
              </Grid>

              {/* Nome Profissional */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="nome_profissional"
                  control={control}
                  render={({ field }) => (
                    <Input label="Nome Profissional" {...field} value={field.value ?? ''} />
                  )}
                />
                {errors.nome_profissional && (
                  <Alert severity="error">{errors.nome_profissional.message}</Alert>
                )}
              </Grid>

              {/* Inicial */}
              <Grid item xs={12} md={3}>
                <Controller
                  name="inicial"
                  control={control}
                  render={({ field }) => (
                    <Input label="Inicial" {...field} value={field.value ?? ''} />
                  )}
                />
                {errors.inicial && <Alert severity="error">{errors.inicial.message}</Alert>}
              </Grid>

              {/* Função */}
              <Grid item xs={12} md={3}>
                <Controller
                  name="funcao"
                  control={control}
                  render={({ field }) => (
                    <>
                      <SelectBox
                        label="Função"
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.value)}
                        options={funcaoOptions}
                        ref={field.ref}
                      />
                      {errors.funcao && (
                        <Alert severity="error">{errors.funcao.message}</Alert>
                      )}
                    </>
                  )}
                />
              </Grid>

              {/* Tipo Colaborador */}
              <Grid item xs={12} md={3}>
                <Controller
                  name="tipo_colaborador_id"
                  control={control}
                  render={({ field }) => (
                    <>
                      <SelectBox
                        label="Tipo Colaborador"
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.value)}
                        options={tiposColaborador.map((tipo) => ({
                          label: tipo.description,
                          value: String(tipo.id),
                        }))}
                        ref={field.ref}
                      />
                      {errors.tipo_colaborador_id && (
                        <Alert severity="error">
                          {errors.tipo_colaborador_id.message}
                        </Alert>
                      )}
                    </>
                  )}
                />
              </Grid>

              {/* Categoria */}
              <Grid item xs={12} md={3}>
                <Controller
                  name="categoria_id"
                  control={control}
                  render={({ field }) => (
                    <>
                      <SelectBox
                        label="Categoria"
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.value)}
                        options={categorias.map((cat) => ({
                          label: cat.descricao,
                          value: String(cat.id),
                        }))}
                        ref={field.ref}
                      />
                      {errors.categoria_id && (
                        <Alert severity="error">{errors.categoria_id.message}</Alert>
                      )}
                    </>
                  )}
                />
              </Grid>

              {/* Data de Nascimento */}
              <Grid item xs={12} md={4}>
                <Controller
                  name="data_nascimento"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Data de Nascimento"
                      type="date"
                      {...field}
                      value={field.value ?? ''}
                    />
                  )}
                />
                {errors.data_nascimento && (
                  <Alert severity="error">{errors.data_nascimento.message}</Alert>
                )}
              </Grid>

              {/* Taxa Horária */}
              <Grid item xs={12} md={4}>
                <Controller
                  name="taxa_horaria"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Taxa Horária (AOA)"
                      type="number"
                      {...field}
                      value={field.value ?? ''}
                    />
                  )}
                />
                {errors.taxa_horaria && (
                  <Alert severity="error">{errors.taxa_horaria.message}</Alert>
                )}
              </Grid>

              {/* Status */}
              <Grid item xs={12} md={4}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <SelectBox
                      label="Status"
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(e.target.value)}
                      options={statusOptions}
                      ref={field.ref}
                    />
                  )}
                />
                {errors.status && (
                  <Alert severity="error">{errors.status.message}</Alert>
                )}
              </Grid>

              {/* Contacto Pessoal */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="contacto_pessoal"
                  control={control}
                  render={({ field }) => (
                    <Input label="Contacto Pessoal" {...field} value={field.value ?? ''} />
                  )}
                />
                {errors.contacto_pessoal && (
                  <Alert severity="error">{errors.contacto_pessoal.message}</Alert>
                )}
              </Grid>

              {/* Contacto Emergência */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="contacto_emergencia"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Contacto Emergência"
                      {...field}
                      value={field.value ?? ''}
                    />
                  )}
                />
                {errors.contacto_emergencia && (
                  <Alert severity="error">{errors.contacto_emergencia.message}</Alert>
                )}
              </Grid>

              {/* Nº Identificação */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="n_identificacao"
                  control={control}
                  render={({ field }) => (
                    <Input label="Nº Identificação" {...field} value={field.value ?? ''} />
                  )}
                />
                {errors.n_identificacao && (
                  <Alert severity="error">{errors.n_identificacao.message}</Alert>
                )}
              </Grid>

              {/* Nº Cédula Ordem */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="n_cedula_ordem"
                  control={control}
                  render={({ field }) => (
                    <Input label="Nº Cédula Ordem" {...field} value={field.value ?? ''} />
                  )}
                />
                {errors.n_cedula_ordem && (
                  <Alert severity="error">{errors.n_cedula_ordem.message}</Alert>
                )}
              </Grid>

              {/* Email Pessoal */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="email_pessoal"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Email Pessoal"
                      type="email"
                      {...field}
                      value={field.value ?? ''}
                    />
                  )}
                />
                {errors.email_pessoal && (
                  <Alert severity="error">{errors.email_pessoal.message}</Alert>
                )}
              </Grid>

              {/* Email Corporativo */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="email_corporativo"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Email Corporativo"
                      type="email"
                      {...field}
                      value={field.value ?? ''}
                    />
                  )}
                />
                {errors.email_corporativo && (
                  <Alert severity="error">{errors.email_corporativo.message}</Alert>
                )}
              </Grid>

              {/* Usuário */}
              <Grid item xs={12}>
                <Controller
                  name="userName"
                  control={control}
                  render={({ field }) => (
                    <Input label="Usuário" type="text" {...field} value={field.value ?? ''} />
                  )}
                />
                {errors.userName && (
                  <Alert severity="error">{errors.userName.message}</Alert>
                )}
              </Grid>

              {/* Botão */}
              <Grid item xs={12}>
                <PrimaryButton type="submit">
                  Salvar Colaborador</PrimaryButton>
              </Grid>
            </Grid>
          </Box>
        )}
      </BoxCard>
    </>
  );
};

export default NewColaborador;
