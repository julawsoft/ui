// src/pages/Colaborador/NewColaborador.tsx
import React, { useState } from 'react';
import { Box, Grid, Alert } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import BoxCard from '../../components/common/BoxCard';
import BoxTop from '../../components/common/BoxTop';
import Loader from '../Loader';
import Input from '../../components/common/Input';
import SelectBox from '../../components/common/SelectBox';
import Textarea from '../../components/common/Textarea';
import PrimaryButton from '../../components/common/PrimaryButton';
import { toast } from 'react-toastify';
import { ColaboradorService } from '../../services/ColaboradorService';
import { colaboradorSchema, type ColaboradorFormData } from '../../validation/colaboradorSchema';

const tiposColaborador = [
  { label: 'Advogado Júnior', value: 1 },
  { label: 'Advogado Sênior', value: 2 },
  { label: 'Administrativo', value: 3 },
  { label: 'Estagiário', value: 4 },
];

const categorias = [
  { label: 'Categoria A', value: 1 },
  { label: 'Categoria B', value: 2 },
  { label: 'Categoria C', value: 3 },
];

const statusOptions = [
  { label: 'Ativo', value: 'active' },
  { label: 'Inativo', value: 'inactive' },
];

const NewColaborador: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { handleSubmit, control, formState: { errors }, reset } = useForm<ColaboradorFormData>({
    resolver: zodResolver(colaboradorSchema),
    defaultValues: {
      nome_completo: '',
      nome_profissional: '',
      inicial: '',
      funcao: '',
      tipo_colaborador_id: null,
      categoria_id: null,
      data_nascimento: '',
      taxa_horaria: null,
      status: 'active',
      contacto_pessoal: '',
      contacto_emergencia: '',
      n_identificacao: '',
      n_cedula_ordem: '',
      email_pessoal: '',
      email_corporativo: '',
    },
  });

  const onSubmit = async (data: ColaboradorFormData) => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await ColaboradorService.save(data);
      setSuccess(true);
      reset();
      toast.success('Colaborador cadastrado com sucesso!');
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
      toast.error(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BoxTop title="Novo Colaborador" />
      <BoxCard>
        {loading && <Loader />}
        {!loading && (
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {/* Nome Completo */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="nome_completo"
                  control={control}
                  render={({ field }) => <Input label="Nome Completo" {...field} />}
                />
                {errors.nome_completo && <Alert severity="error">{errors.nome_completo.message}</Alert>}
              </Grid>

              {/* Nome Profissional */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="nome_profissional"
                  control={control}
                  render={({ field }) => <Input label="Nome Profissional" {...field} />}
                />
                {errors.nome_profissional && <Alert severity="error">{errors.nome_profissional.message}</Alert>}
              </Grid>

              {/* Inicial */}
              <Grid item xs={12} md={3}>
                <Controller
                  name="inicial"
                  control={control}
                  render={({ field }) => <Input label="Inicial" {...field} />}
                />
              </Grid>

              {/* Função */}
              <Grid item xs={12} md={3}>
                <Controller
                  name="funcao"
                  control={control}
                  render={({ field }) => <Input label="Função" {...field} />}
                />
              </Grid>

              {/* Tipo Colaborador */}
              <Grid item xs={12} md={3}>
                <Controller
                  name="tipo_colaborador_id"
                  control={control}
                  render={({ field }) => <SelectBox label="Tipo Colaborador" {...field} options={tiposColaborador} />}
                />
              </Grid>

              {/* Categoria */}
              <Grid item xs={12} md={3}>
                <Controller
                  name="categoria_id"
                  control={control}
                  render={({ field }) => <SelectBox label="Categoria" {...field} options={categorias} />}
                />
              </Grid>

              {/* Data de Nascimento */}
              <Grid item xs={12} md={4}>
                <Controller
                  name="data_nascimento"
                  control={control}
                  render={({ field }) => <Input label="Data de Nascimento" type="date" {...field} />}
                />
              </Grid>

              {/* Taxa Horária */}
              <Grid item xs={12} md={4}>
                <Controller
                  name="taxa_horaria"
                  control={control}
                  render={({ field }) => <Input label="Taxa Horária (€)" type="number" {...field} />}
                />
              </Grid>

              {/* Status */}
              <Grid item xs={12} md={4}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => <SelectBox label="Status" {...field} options={statusOptions} />}
                />
              </Grid>

              {/* Contacto Pessoal */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="contacto_pessoal"
                  control={control}
                  render={({ field }) => <Input label="Contacto Pessoal" {...field} />}
                />
              </Grid>

              {/* Contacto Emergência */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="contacto_emergencia"
                  control={control}
                  render={({ field }) => <Input label="Contacto Emergência" {...field} />}
                />
              </Grid>

              {/* N Identificação */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="n_identificacao"
                  control={control}
                  render={({ field }) => <Input label="Nº Identificação" {...field} />}
                />
              </Grid>

              {/* Nº Cédula Ordem */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="n_cedula_ordem"
                  control={control}
                  render={({ field }) => <Input label="Nº Cédula Ordem" {...field} />}
                />
              </Grid>

              {/* Email Pessoal */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="email_pessoal"
                  control={control}
                  render={({ field }) => <Input label="Email Pessoal" type="email" {...field} />}
                />
              </Grid>

              {/* Email Corporativo */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="email_corporativo"
                  control={control}
                  render={({ field }) => <Input label="Email Corporativo" type="email" {...field} />}
                />
              </Grid>

              {/* Botão Salvar */}
              <Grid item xs={12}>
                <PrimaryButton type="submit">Salvar Colaborador</PrimaryButton>
              </Grid>
            </Grid>
          </Box>
        )}
      </BoxCard>
    </>
  );
};

export default NewColaborador;
