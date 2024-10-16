// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import useAuthStore from '../../context/authStore';
import { DocumentsService, IDocuments } from '../../services/Documents';
import { toast } from 'react-toastify';
import PaginatedTable from '../../components/PaginatedTable';
import PermissionGate from '../../utils/PermissionGate';
import { AppRoles } from '../../routes/AppRoles';

const Home: React.FC = () => {

  const user = useAuthStore((state) => state.user)
  const [documents, setDocuments] = useState<IDocuments[]>()

  useEffect(() => {
    getDocuments()
  }, [])

  const getDocuments = async () => {
    try {
      const response = await DocumentsService.getList()
      console.log("documentos ", response)
      setDocuments(response?.data)
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  return (
    <><div >
      <Typography variant="h5">{user?.name}</Typography>
      <Typography mb={5}>
        Welcome to the Home page!
      </Typography>
    </div>
      <div>
        <PermissionGate roles={[AppRoles.HOME.podeCadastrarDocumento]}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Adicionar
          </Button>
        </PermissionGate>
        <Typography variant="h6">Lista documentos</Typography>
        <hr />
        {
          documents ?
            <PaginatedTable key={1} data={documents} />
            : null
        }
      </div></>
  );
};

export default Home;
