// src/pages/Settings.tsx
import React, { useState } from 'react';
import { Box, Grid2 as Grid, Stack, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import BoxCard from '../../components/common/BoxCard';
import BoxTop from '../../components/common/BoxTop';
import Loader from '../Loader';
import Input from '../../components/common/Input';
import SelectBox from '../../components/common/SelectBox';
import PrimaryButton from '../../components/common/PrimaryButton';
import { toast } from 'react-toastify';
import { ClientService } from '../../services/ClientService';
import { clienteSchema, type ClienteFormData } from '../../validation/clienteSchema';

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

const NewClient: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<ClienteFormData>({
    resolver: zodResolver(clienteSchema),
  });

  const onSubmit = async (data: ClienteFormData) => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await ClientService.save(data);
      setSuccess(true);
      reset();
      toast.success('Cliente cadastrado com sucesso!');
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
      toast.error(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (name: keyof ClienteFormData, label: string, type: string = 'text', extraProps: any = {}) => (
    <>
      <Input
        label={label}
        value={watch(name) || ''}
        onChange={register(name).onChange}
        type={type}
        {...extraProps}
      />
      {errors[name] && <Alert severity="error">{errors[name]?.message}</Alert>}
    </>
  );

  const renderSelect = (name: keyof ClienteFormData, label: string, options: { label: string; value: any }[]) => (
    <>
      <SelectBox
        label={label}
        value={watch(name) || ''}
        onChange={register(name).onChange}
        options={options}
      />
      {errors[name] && <Alert severity="error">{errors[name]?.message}</Alert>}
    </>
  );

  return (
    <>
      <BoxTop title="Cadastro de Cliente" />
      <BoxCard>
        {loading && <Loader />}
        {!loading && (
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
            <Stack spacing={2}>
              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">Cliente cadastrado com sucesso!</Alert>}

              <Grid container spacing={2}>
                {/* Coluna 1 */}
                <Grid item xs={12} md={4}>
                  {renderInput('denominacao', 'Denominação')}
                  {renderInput('nif', 'NIF')}
                  {renderInput('endereco', 'Endereço')}
                </Grid>

                {/* Coluna 2 */}
                <Grid item xs={12} md={4}>
                  {renderInput('pessoa_contacto', 'Pessoa de Contacto')}
                  {renderInput('contacto_cobranca', 'Contacto de Cobrança')}
                  {renderInput('e_mail', 'E-mail', 'email')}
                </Grid>

                {/* Coluna 3 */}
                <Grid item xs={12} md={4}>
                  {renderInput('uuid', 'UUID')}
                  {renderSelect('tipo_id', 'Tipo', tiposCliente)}
                  {renderSelect('status', 'Status', statusOptions)}
                  {renderInput('nota', 'Nota')}
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid size={8}>
                  <Item>size=8</Item>
                </Grid>
                <Grid size={4}>
                  <Item>size=4</Item>
                </Grid>
                <Grid size={4}>
                  <Item>size=4</Item>
                </Grid>
                <Grid size={8}>
                  <Item>size=8</Item>
                </Grid>
              </Grid>

              <PrimaryButton type="submit" sx={{ mt: 2 }}>
                Salvar Cliente
              </PrimaryButton>
            </Stack>
          </Box>
        )}
      </BoxCard>
    </>
  );
};

export default NewClient;
