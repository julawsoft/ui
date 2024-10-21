// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { Button, LinearProgress, Typography } from '@mui/material';
import useAuthStore from '../../context/authStore';
import { DocumentsService, IDocuments } from '../../services/Documents';
import { toast } from 'react-toastify';
import PaginatedTable from '../../components/PaginatedTable';
import PermissionGate from '../../utils/PermissionGate';
import { AppRoles } from '../../routes/AppRoles';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATH } from '../../routes/routePaths';

const Home: React.FC = () => {

  const user = useAuthStore((state) => state.user)
  const [documents, setDocuments] = useState<IDocuments[]>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(async () => {
      await getDocuments()
    }, 1000)
  }, [])

  const getDocuments = async () => {
    try {
      const response = await DocumentsService.getList()
      setDocuments(response?.data)
      setIsLoading(false)
    } catch (err: any) {
      toast.error(err.message)
      setIsLoading(false)
    }
  }

  const handleCreateDocument = () => {
    return navigate(ROUTES_PATH.CreateDocument);
  };

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
            onClick={handleCreateDocument}
          >
            Adicionar
          </Button>
        </PermissionGate>
        {
          isLoading ? <><LinearProgress /></> :
            <>
              <Typography variant="h6">Lista documentos</Typography>
              <hr />
              {
                documents ?
                  <PaginatedTable key={1} data={documents} />
                  : null
              }
            </>
        }

      </div></>
  );
};

export default Home;
