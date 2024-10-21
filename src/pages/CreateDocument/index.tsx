import React, { useState } from 'react';
import { TextField, Button, Box, Typography, LinearProgress } from '@mui/material';
import useAuthStore from '../../context/authStore';
import { toast } from 'react-toastify';
import { DocumentsService } from '../../services/Documents';
import { ROUTES_PATH } from '../../routes/routePaths';
import { useNavigate } from 'react-router-dom';

const CreateDocument: React.FC = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)

  const [formData, setFormData] = useState({
    descricao: '',
    email: user?.email,
    file: '',
    fileName: '',
  });

  // Função para lidar com as mudanças nos campos de texto
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        console.log(evt.target?.result);
        setFormData({
          ...formData,
          file: String(evt.target?.result),
          fileName: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    try{
      setIsLoading(true);
      const response = await DocumentsService.save({
        "description": formData?.descricao,
        "user_email": String(formData?.email),
        "attach": formData?.file
      })

      if(response && response.statusCode === 201){
        toast.success(response.response.message)
        setTimeout(() => {
          navigate(ROUTES_PATH.Home)
        },1000)
      }else{
        toast.warn(response.response.message)
      }
      setIsLoading(false)
  
    }catch(e){
      toast.error(String(e))
      setIsLoading(false);
      return;
    }
  };

  return (
    <>
      <div>
        <Typography variant="h4">Cadastro de Documento</Typography>
        <Typography paragraph>
          Defina uma descrição e escolhe um ficheiro.
        </Typography>
      </div>
      <hr />
      {isLoading ? <><LinearProgress defaultValue={'Salvando...'} /></> : null}
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" component="div" textAlign="center">
        Cadastro de Documento
        </Typography>

        <TextField
          label="Descrição"
          name="descricao"
          variant="outlined"
          value={formData.descricao}
          onChange={handleInputChange}
          fullWidth
          required
        />

        <Button
          variant="contained"
          component="label"
        >
          Upload Arquivo
          <input
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </Button>

        {formData.file && <Typography variant="body2">Arquivo selecionado: {formData.fileName}</Typography>}

        <Button  disabled={isLoading} type="submit" variant="contained" color="primary" fullWidth>
          Cadastrar
        </Button>
      </Box>
    </>
  );
};

export default CreateDocument;
