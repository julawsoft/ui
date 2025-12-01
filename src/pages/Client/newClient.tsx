import React, { useEffect, useState } from 'react';
import { Box, Grid, Alert, Stack, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useNavigate } from 'react-router-dom';
import BoxCard from '../../components/common/BoxCard';
import BoxTop from '../../components/common/BoxTop';
import Input from '../../components/common/Input';
import SelectBox from '../../components/common/SelectBox';
import Textarea from '../../components/common/Textarea';
import PrimaryButton from '../../components/common/PrimaryButton';
import { toast } from 'react-toastify';
import { ClientService } from '../../services/ClientService';
import { clienteSchema, type ClienteFormData } from '../../validation/clienteSchema';
import BreadcrumbsNav from '../../components/common/BreadcrumbsNav';
import StateHandler from '../../components/common/StateHandler';
import { ROUTES_PATH } from '../../routes/routePaths';

const tiposCliente = [
  { label: 'Empresa', value: '1' },
  { label: 'Particular', value: '2' },
  { label: 'Ministério', value: '3' },
  { label: 'Instituto Público', value: '4' },
  { label: 'Associação', value: '5' },
  { label: 'Outro', value: '6' },
];

const NewClient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [, setSuccess] = useState(false);

  const { handleSubmit, control, formState: { errors }, reset, setValue } = useForm<ClienteFormData>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      tipo_id: '',
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

  // Buscar cliente para edição
  useEffect(() => {
    if (!id) return;

    const fetchClient = async () => {
      setLoading(true);
      try {
        const client = await ClientService.getById(Number(id));
        if (!client) throw new Error('Cliente não encontrado');
        // Preencher formulário
        Object.keys(client).forEach((key) => {
          const value = client[key as keyof typeof client];
          setValue(key as keyof ClienteFormData, value != null ? String(value) : '');
        });

      } catch (err: any) {
        setError(err.message || 'Erro ao carregar cliente');
        toast.error(err.message || 'Erro ao carregar cliente');
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id, setValue]);

  const onSubmit = async (data: ClienteFormData) => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {

      if (id) {
        await ClientService.update(Number(id), data);
        toast.success('Cliente atualizado com sucesso!');
      } else {
        await ClientService.save(data);
        toast.success('Cliente cadastrado com sucesso!');
        reset();
      }
      setSuccess(true);
      navigate('/clientes'); // opcional: voltar para lista após salvar
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
      toast.error(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
        navigate(ROUTES_PATH.Client)
  }

  return (
    <>
      <BreadcrumbsNav
        items={[
          { label: "Início", path: "/" },
          { label: "Clientes", path: "/clientes" },
          { label: id ? "Editar Cliente" : "Novo Cliente" } // último sem path
        ]}
      />
      <BoxTop title={id ? 'Editar Cliente' : 'Novo Cliente'} />
      <BoxCard>
        {loading &&
          <StateHandler
            isLoading={loading}
            error={error}
            hasData={loading}
          />
        }
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

              {/* Demais campos */}
              <Grid item xs={12} md={4}>
                <Controller name="denominacao" control={control} render={({ field }) => <Input label="Nome/Denominação" {...field} />} />
                {errors.denominacao && <Alert severity="error">{errors.denominacao.message}</Alert>}
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller name="nif" control={control} render={({ field }) => <Input label="NIF" {...field} />} />
                {errors.nif && <Alert severity="error">{errors.nif.message}</Alert>}
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller name="pessoa_contacto" control={control} render={({ field }) => <Input label="Pessoa de Contacto" {...field} />} />
                {errors.pessoa_contacto && <Alert severity="error">{errors.pessoa_contacto.message}</Alert>}
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller name="contacto_cobranca" control={control} render={({ field }) => <Input label="Contacto de Cobrança" {...field} />} />
                {errors.contacto_cobranca && <Alert severity="error">{errors.contacto_cobranca.message}</Alert>}
              </Grid>

              <Grid item xs={12} md={4}>
                <Controller name="e_mail" control={control} render={({ field }) => <Input label="E-mail" type="email" {...field} />} />
                {errors.e_mail && <Alert severity="error">{errors.e_mail.message}</Alert>}
              </Grid>

              <Grid item xs={12}>
                <Controller name="endereco" control={control} render={({ field }) => <Input label="Endereço" {...field} />} />
                {errors.endereco && <Alert severity="error">{errors.endereco.message}</Alert>}
              </Grid>

              <Grid item xs={12}>
                <Controller name="nota" control={control} render={({ field }) => <Textarea label="Nota" {...field} value={field.value || ''} />} />
                {errors.nota && <Alert severity="error">{errors.nota.message}</Alert>}
              </Grid>

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

export default NewClient;
