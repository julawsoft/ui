// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Typography } from '@mui/material';
import useAuthStore from '../../context/authStore';
import { DocumentsService, IDocuments } from '../../services/Documents';
import { toast } from 'react-toastify';
import PaginatedTable from '../../components/PaginatedTable';
import PermissionGate from '../../utils/PermissionGate';
import { AppRoles } from '../../routes/AppRoles';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATH } from '../../routes/routePaths';
import { previewAttachments } from '../../utils/preview_attach';

const Home: React.FC = () => {

  const user = useAuthStore((state) => state.user)
  const [open, setOpen] = useState(false);
  const [pathAttachPreview, setPathAttachPreview] = useState('');
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

  const handleEdit = (id: number | undefined) => {
    console.log('handleEdit' , id)
  }
  const handleDelete = (id: number | undefined) => {
    console.log('handleDelete', id)
  }
  const handleView = (attach: string) => {

    let url = previewAttachments(attach)
    setPathAttachPreview(url)
    setOpen(true)
    console.log('handleView', attach)

  }

  const handleClose = () =>  setOpen(false);

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
                  <PaginatedTable
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleView={handleView}
                  key={1} 
                  data={documents} />
                  : null
              }
            </>
        }
      
      </div>
      <Dialog open={open} onClose={handleClose}  
       maxWidth="lg" // Define a largura máxima como 'large'
      fullWidth

      PaperProps={{
        sx: { height: "80%" }, // Largura de 80% e altura máxima de 90%
      }}
       
        >
        <DialogTitle>Preview do Documento Anexado</DialogTitle>
        <DialogContent>
          {
            pathAttachPreview && <iframe src={pathAttachPreview} width="100%" height={'100%'} ></iframe>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
      </>
  );
};

export default Home;
