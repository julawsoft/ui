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

  const { handleSubmit, control, formState: { errors }, reset } = useForm<ClienteFormData>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      tipo_id: 1,
      denominacao: '',
      nif: '',
      pessoa_contacto: '',
      contacto_cobranca: '',
      e_mail: '',
      endereco: '',
      nota: '',
      status: 'pending',
    }
  });

  const onSubmit = async (data: ClienteFormData) => {
    console.log("O submit data ", data); // Aqui sim loga os valores preenchidos
  
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
  

  return (
    <>
      <BoxTop title="Novo Cliente" />
      <BoxCard>
        {loading && <Loader />}
        {!loading && (
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {/* Tipo */}
              <Grid container item xs={12} md={4}>
                <Controller
                  name="tipo_id"
                  control={control}
                  render={({ field }) => (
                    <>
                      <SelectBox label="Tipo" {...field} options={tiposCliente} />
                      {errors.tipo_id && <Alert severity="error">{errors.tipo_id.message}</Alert>}
                    </>
                  )}
                />
              </Grid>

              {/* Denominação */}
              <Grid item xs={12} md={4}>
                <Controller
                  name="denominacao"
                  control={control}
                  render={({ field }) => (
                    <Input label="Nome/Denominação" {...field} />
                  )}
                />
                {errors.denominacao && <Alert severity="error">{errors.denominacao.message}</Alert>}
              </Grid>

              {/* NIF */}
              <Grid item xs={12} md={4}>
                <Controller
                  name="nif"
                  control={control}
                  render={({ field }) => (
                    <Input label="NIF" {...field} />
                  )}
                />
                {errors.nif && <Alert severity="error">{errors.nif.message}</Alert>}
              </Grid>

              {/* Pessoa de contacto */}
              <Grid item xs={12} md={4}>
                <Controller
                  name="pessoa_contacto"
                  control={control}
                  render={({ field }) => (
                    <Input label="Pessoa de Contacto" {...field} />
                  )}
                />
                {errors.pessoa_contacto && <Alert severity="error">{errors.pessoa_contacto.message}</Alert>}
              </Grid>

              {/* Contacto cobrança */}
              <Grid item xs={12} md={4}>
                <Controller
                  name="contacto_cobranca"
                  control={control}
                  render={({ field }) => (
                    <Input label="Contacto de Cobrança" {...field} value={field.value} />
                  )}
                />
                {errors.contacto_cobranca && <Alert severity="error">{errors.contacto_cobranca.message}</Alert>}
              </Grid>

              {/* Email */}
              <Grid item xs={12} md={4}>
                <Controller
                  name="e_mail"
                  control={control}
                  render={({ field }) => (
                    <Input label="E-mail" type="email" {...field} />
                  )}
                />
                {errors.e_mail && <Alert severity="error">{errors.e_mail.message}</Alert>}
              </Grid>

              {/* Endereço */}
              <Grid item xs={12}>
                <Controller
                  name="endereco"
                  control={control}
                  render={({ field }) => (
                    <Input label="Endereço" {...field} />
                  )}
                />
                {errors.endereco && <Alert severity="error">{errors.endereco.message}</Alert>}
              </Grid>

              {/* Nota */}
              <Grid item xs={12}>
                <Controller
                  name="nota"
                  control={control}
                  render={({ field }) => (
                    <Textarea label="Nota" {...field} value={field.value || ''} />
                  )}
                />
                {errors.nota && <Alert severity="error">{errors.nota.message}</Alert>}
              </Grid>

              {/* Botão */}
              <Grid item xs={12} md={4}>
                <PrimaryButton type="submit">Salvar Cliente</PrimaryButton>
              </Grid>
            </Grid>
          </Box>
        )}
      </BoxCard>
    </>
  );
};

export default NewClient;
