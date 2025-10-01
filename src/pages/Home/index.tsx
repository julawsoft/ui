// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Stack, Typography } from '@mui/material';
import useAuthStore from '../../context/authStore';
import { DocumentsService, IDocuments } from '../../services/Documents';
import { toast } from 'react-toastify';
import PaginatedTable from '../../components/PaginatedTable';
import PermissionGate from '../../utils/PermissionGate';
import { AppRoles } from '../../routes/AppRoles';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATH } from '../../routes/routePaths';
import { previewAttachments } from '../../utils/preview_attach';
import Label from '../../components/common/Label';
import Input from '../../components/common/Input';
import SelectBox from '../../components/common/SelectBox';
import DataTable from '../../components/common/DataTable';
import BoxCard from '../../components/common/BoxCard';
import Loader from '../../components/common/Loader';
import PrimaryButton from '../../components/common/PrimaryButton';
import SecondaryButton from '../../components/common/SecondaryButton';
import NormalButton from '../../components/common/NormalButton';

const Home: React.FC = () => {

  const user = useAuthStore((state) => state.user)
  const [open, setOpen] = useState(false);
  const [pathAttachPreview, setPathAttachPreview] = useState('');
  const [documents, setDocuments] = useState<IDocuments[]>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(async () => {
      // await getDocuments()
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

  const handleEdit = (id: number | undefined) => {
    console.log('handleEdit', id)
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

  const handleClose = () => setOpen(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const roles = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
  ];

  const columns = [
    { id: "id", label: "ID" },
    { id: "name", label: "Nome" },
    { id: "role", label: "Função" },
  ];

  const rows = [
    { id: 1, name: "Anselmo", role: "Admin" },
    { id: 2, name: "João", role: "User" },
    { id: 3, name: "Maria", role: "User" },
  ];

  return (
    <div style={{ padding: 10 }}>
      {loading ? (
        <Loader fullscreen />
      ) : (
        <BoxCard
          title="Formulário"
          action={<Button size="small">Ação</Button>}
          footer={<Button variant="contained">Salvar</Button>}
        >
          <Label text="Nome" />
          <Input label="Digite seu nome" value={name} onChange={(e) => setName(e.target.value)} />

          <br /><br />

          <Stack spacing={2} direction="row">
            <PrimaryButton onClick={() => alert("Primário clicado!")}>
              Primário
            </PrimaryButton>

            <SecondaryButton onClick={() => alert("Secundário clicado!")}>
              Secundário
            </SecondaryButton>

            <NormalButton onClick={() => alert("Normal clicado!")}>
              Normal
            </NormalButton>
          </Stack>

          <Label text="Função" />
          <SelectBox label="Selecione" value={role} onChange={(e) => setRole(e.target.value)} options={roles} />

          <br /><br />

          <DataTable columns={columns} rows={rows} />
        </BoxCard>
      )}
    </div>
  );
};

export default Home;
