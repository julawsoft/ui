// src/pages/Colaborador.tsx
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BoxCard from '../../components/common/BoxCard';
import DataTable from '../../components/common/DataTable';
import { columns, transformDataColaborador } from './transform';
import BoxTop from '../../components/common/BoxTop';
import { ROUTES_PATH } from '../../routes/routePaths';
import type { ICategoriaColaborador, IColaborador, ITipoColaborador } from '../../schema/InterfaceColaboradores';
import { ColaboradorService } from '../../services/ColaboradorService';
import StateHandler from '../../components/common/StateHandler';
import BreadcrumbsNav from '../../components/common/BreadcrumbsNav';
import PrimaryButton from '../../components/common/PrimaryButton';
import { generateColaboradoresListPDF } from '../../utils/reports/generateListColaboradoresPDF';
import { Box, Button, MenuItem, Select, Typography } from '@mui/material';

const Colaborador: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = React.useState<IColaborador[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const [tipo, setTipo] = useState()
  const [tipos, setTipos] = useState<ITipoColaborador[]>([])

  const [categoria, setCategoria] = useState()
  const [categorias, setCategorias] = useState<ICategoriaColaborador[]>([])

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getAllColaboradores();
      fetchTipoColaboradores()
      fetchCategoriasColaboradores()
    }, 1000)
  }, []);

    const fetchTipoColaboradores = async () =>
      setTipos(await ColaboradorService.getAllTiposColaboradores());
    const fetchCategoriasColaboradores = async () =>
      setCategorias(await ColaboradorService.getAllCategoriasColaborador());
  

  const getAllColaboradores = async () => {
    try {
      const dataResponse = await ColaboradorService.getAll();
      setData(dataResponse);
      setError(null);
    } catch (err: any) {
      const message = err.message || "Erro ao carregar os colaboradores";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNovoColaborador = () => {
    navigate(ROUTES_PATH.NewColaborador);
  };

  const handleEdit = (colaborador: IColaborador) => {
    navigate(`${ROUTES_PATH.NewColaborador}/${colaborador.id}`);
  };

  const handleView = (colaborador: IColaborador) => {
    navigate(`${ROUTES_PATH.NewColaborador}/view/${colaborador.id}`);
  };

  const handleExportPDF = () => {
    if (data.length > 0) {
      generateColaboradoresListPDF(data);
    }
  };

  const handleChangeTipo = (e: any) => {
      console.log("o tipo", e.target.value)
      setTipo(e.target.value)
  }

  const handleChangeCategoria = (e: any) => {
    console.log("o tipo", e.target.value)
    setCategoria(e.target.value)
  }

  const handleBuscar = async () => {
    const dataResponse = await ColaboradorService.getAll(tipo, categoria);
    setData(dataResponse);
  }

  return (
    <div>
      <BreadcrumbsNav
        items={[
          { label: "Início", path: "/" },
          { label: "Colaboradores", path: "/colaboradores" },
          { label: "Lista dos Colaboradores" } // último sem path
        ]}
      />
      <BoxTop
        title="Lista dos Colaboradores"
        actions={
          <>
            <PrimaryButton onClick={handleNovoColaborador}>Novo Colaborador</PrimaryButton>
            <PrimaryButton onClick={handleExportPDF}>Exportar PDF</PrimaryButton>
          </>
        }
      />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 2,
          p: 2,
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography>Tipo de Colaborador:</Typography>
          <Select
            size="small"
            value={tipo ?? ""}
            onChange={handleChangeTipo}
            sx={{ minWidth: 400 }}
          >
            <MenuItem value="">
              <em>Selecione um tipo</em>
            </MenuItem>
            {tipos.map((c: any) => (
              <MenuItem key={c.id} value={c.id}>
                {c.description}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography>Categoria de Colaborador:</Typography>
          <Select
            size="small"
            value={categoria ?? ""}
            onChange={handleChangeCategoria}
            sx={{ minWidth: 400 }}
          >
            <MenuItem value="">
              <em>Selecione uma categoria</em>
            </MenuItem>
            {categorias.map((c: any) => (
              <MenuItem key={c.id} value={c.id}>
                {c.descricao}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Buscar */}
        <Button onClick={handleBuscar} variant="contained" color="primary">
          Buscar
        </Button>
      </Box>



      <BoxCard>
        <StateHandler
          isLoading={isLoading}
          error={error}
          hasData={data.length > 0}
        />

        {!isLoading && !error && data.length > 0 && (
          <DataTable
            columns={columns}
            rows={transformDataColaborador(data, handleEdit, handleView)}
          />
        )}
      </BoxCard>
    </div>
  );
};

export default Colaborador;
