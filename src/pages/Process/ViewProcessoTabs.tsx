import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Grid,
  Alert,
  Tabs,
  Tab,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import BoxCard from "../../components/common/BoxCard";
import SimpleModal from "../../components/common/SimpleModal";
import BoxTop from "../../components/common/BoxTop";
import Loader from "../../components/common/Loader";
import DataTable from "../../components/common/DataTable";
import SimpleAccordion from "../../components/common/SimpleAccordion";
import BreadcrumbsNav from "../../components/common/BreadcrumbsNav";
import PrimaryButton from "../../components/common/PrimaryButton";
import EstadoChip from "../../components/common/EstadoChip";
import RichTextEditor from "../../components/editor/RichTextEditor";

import TabEquipas from "./tabs/TabEquipas";
import TabAssociados from "./tabs/TabAssociados";
import TabAnexos from "./tabs/TabAnexos";

import { ROUTES_PATH } from "../../routes/routePaths";
import { ProcessoService } from "../../services/ProcessoService";
import { HonorariosService } from "../../services/HonorariosService";
import { useUserLogged } from "../../hooks/useUserLogged";

import {
  IProcesso,
  IProcessoAnexos,
  IProcessoPrecedentes,
  ITarefa,
  type IAnexo,
  type IEquipa,
} from "../../schema/InterfaceProcess";
import type { IHonorarios } from "../../schema/InterfaceHonorarios";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import TabTarefas from "./tabs/TabTarefas";

// ===== Componente auxiliar de abas =====
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  if (value !== index) return null;
  return <Box sx={{ pt: 2 }}>{children}</Box>;
};

// ===== Componente principal =====
const ViewProcessoTabs: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUserLogged();

  // Estado principal
  const [data, setData] = useState<IProcesso>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Subdados
  const [tarefas, setTarefas] = useState<ITarefa[]>([]);
  const [equipas, setEquipas] = useState<IEquipa[]>([]);
  const [honorarios, setHonorarios] = useState<IHonorarios[]>([]);
  const [anexos, setAnexos] = useState<IProcessoAnexos[]>([]);
  const [associados, setAssociados] = useState<IProcessoPrecedentes[]>([]);
  const [openConfirm, setOpenConfirm] = useState(false);

  // UI states
  const [tabIndex, setTabIndex] = useState(0);
  const [openEditor, setOpenEditor] = useState(false);
  const [editorField, setEditorField] = useState("");
  const [editorTitle, setEditorTitle] = useState("");
  const [editorValue, setEditorValue] = useState("");

  const [openModalTarefa, setOpenModalTarefa] = useState(false);
  const [openModalEquipa, setOpenModalEquipa] = useState(false);
  const [reloadFetch, setReloadFetch] = useState(false);

  // ===== Buscar dados principais =====
  const fetchProcesso = useCallback(async () => {
    if (!id) return;
    setLoading(true);

    try {
      const response:any = await ProcessoService.getById(Number(id));
      const processo = response;
      if (!processo) throw new Error("Processo não encontrado");

      setData(processo);
      setTarefas(processo.tarefas || []);
      setEquipas(processo.equipas || []);
      setAnexos(processo.anexos || []);
      setAssociados(processo.precedentes || []);
      setHonorarios(await HonorariosService.getByProcessoId(Number(id)));
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Erro ao carregar o processo");
      setError(err.message || "Erro ao carregar o processo");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProcesso();
  }, [fetchProcesso, reloadFetch]);

  // ===== Navegar para editar =====
  const handleEditProcesso = () => {
    if (data?.id) navigate(`${ROUTES_PATH.NewProcesso}/${data.id}`);
  };

  // ===== Editor =====
  const handleOpenEditor = (field: string, title: string, value: string) => {
    setEditorField(field);
    setEditorTitle(title);
    setEditorValue(value || "");
    setOpenEditor(true);
  };

  const handleSaveEditor = async () => {
    if (!data || !editorField) return;

    try {
      const updated = { ...data, [editorField]: editorValue };
      setData(updated);

      await ProcessoService.updateMetodologias(
        String(updated.metodologia),
        String(updated.estrategia),
        String(updated.factos),
        String(updated.objectivos),
        String(updated.dados_importantes),
        Number(id)
      );

      toast.success(`${editorTitle} atualizado com sucesso!`);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao atualizar conteúdo.");
    } finally {
      setOpenEditor(false);
    }
  };

  // ===== Exclusões =====
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleDeleteEquipa = (item: IEquipa) => {
    setSelectedItem({type:'colaborador', id: item.id});
    setOpenConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (!selectedItem) return;
  
      const response:any = await ProcessoService.removerRecursosProcessos(
        selectedItem.type,
        selectedItem.id
      );
  
      if (response?.status === 200) {
        toast.success("Item eliminado com sucesso!");
        // 🔁 Recarrega os dados do processo
        await fetchProcesso();
      } else {
        toast.error(response?.message || "Erro ao eliminar o item.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao eliminar o item.");
    } finally {
      setOpenConfirm(false);
      setSelectedItem(null);
    }
  };
  
  /*
  const handleDeleteTarefa = (item: ITarefa) =>{
    setSelectedItem({type:'tarefa', id: item.id});
    setOpenConfirm(true);
  }
  */

  const handleDeleteAssociado = (item: IProcessoPrecedentes) => {
    setSelectedItem({type:'precedente', id: item.id});
    setOpenConfirm(true);
  }
  const handleDeleteAnexo = (item: IAnexo) => {
    setSelectedItem({type:'anexo', id: item.id});
    setOpenConfirm(true);
  }
  // ===== Layout =====
  if (loading) return <Loader fullscreen />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!data) return <Alert severity="warning">Processo não encontrado</Alert>;

  return (
    <>
      <BreadcrumbsNav
        items={[
          { label: "Início", path: "/" },
          { label: "Processos", path: "/processos" },
          { label: "Detalhes do Processo" },
        ]}
      />

      <BoxTop
        title="Detalhes do Processo"
        actions={ <PrimaryButton onClick={handleEditProcesso}><Edit />Editar</PrimaryButton>}
      />

      <Grid container spacing={2}>
        {/* ===== Coluna Esquerda ===== */}
        <Grid item xs={12} md={3}>
          <BoxCard>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6">Detalhes</Typography>
              <EstadoChip estado={data.estado} />
            </Box>

            {[
              ["Referência", data.ref],
              ["N.º Processo Judicial", data.n_processo_judicial],
              ["Assunto", data.assunto],
              ["Área", data.area],
              ["Fase", data.fase],
              ["Instituição", data.instituicao],
              ["Modo Faturação", data.modo_facturacao],
              ["Gestor", data.gestor],
              ["Cliente", data.cliente],
              ["Valor Total", data.valor_total],
              ["Horas/Mês", data.horas_mes],
              [
                "Data Registo",
                data.data_registo
                  ? new Date(data.data_registo).toLocaleDateString()
                  : "-",
              ],
            ].map(([label, value]) => (
              <Box key={label} mb={1}>
                <Typography variant="subtitle2" color="textSecondary">
                  {label}
                </Typography>
                <Typography>{value || "-"}</Typography>
              </Box>
            ))}
          </BoxCard>
        </Grid>

        {/* ===== Coluna Direita ===== */}
        <Grid item xs={12} md={9}>
          <BoxCard>
            <Tabs
              value={tabIndex}
              onChange={(_, newValue) => setTabIndex(newValue)}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Metodologias" />
              <Tab label="Equipas" />
              {/*<Tab label="Tarefas" />*/}
              <Tab label="Anexos" />
              <Tab label="Associados" />
            </Tabs>

            {/* ===== Aba Metodologias ===== */}
            <TabPanel value={tabIndex} index={0}>
              {[
                ["Metodologias", "metodologia", data.metodologia],
                ["Estratégia", "estrategia", data.estrategia],
                ["Factos", "factos", data.factos],
                ["Objectivos", "objectivos", data.objectivos],
                ["Dados Importantes", "dados_importantes", data.dados_importantes],
              ].map(([title, field, value]) => (
                <SimpleAccordion  key={field} title={String(title)}>
                  <Box mb={2} dangerouslySetInnerHTML={{ __html: String(value || "") }} />
                  <Button
                    startIcon={<Edit />}
                    sx={{ mt: 2 }}
                    variant="contained"
                    title="Editar"
                    onClick={() => handleOpenEditor(String(field), String(title), String(value || ""))}
                  >
                  </Button>
                </SimpleAccordion>
              ))}
            </TabPanel>

            {/* ===== Aba Equipas ===== */}
            <TabPanel value={tabIndex} index={1}>
              <TabEquipas
                idProcesso={Number(id)}
                equipas={equipas}
                onDelete={handleDeleteEquipa}
                setReloadFetch={setReloadFetch}
              />
            </TabPanel>

            {
            /* ===== Aba Tarefas ===== 
            <TabPanel value={tabIndex} index={2}>
              <TabTarefas tarefas={tarefas} onDelete={handleDeleteTarefa}  idProcesso={Number(id)}/>
            </TabPanel>
            */}

            {/* ===== Aba Anexos ===== */}
            <TabPanel value={tabIndex} index={2}>
              <TabAnexos
                data={anexos}
                idColaborador={Number(user?.id)}
                idProcesso={Number(id)}
                onDelete={handleDeleteAnexo}
                setReloadFetch={setReloadFetch}
              />
            </TabPanel>

            {/* ===== Aba Associados ===== */}
            <TabPanel value={tabIndex} index={3}>
              <TabAssociados
                data={associados}
                idProcesso={Number(id)}
                onDelete={handleDeleteAssociado}
                setReloadFetch={setReloadFetch}
              />
            </TabPanel>
          </BoxCard>
        </Grid>
      </Grid>

      {/* ===== Modal Editor ===== */}
      <Dialog
        open={openEditor}
        onClose={() => setOpenEditor(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Editar {editorTitle}</DialogTitle>
        <DialogContent>
          <RichTextEditor initialValue={editorValue} onChange={setEditorValue} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditor(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSaveEditor}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===== Modais auxiliares ===== */}
      <SimpleModal
        open={openModalEquipa}
        onClose={() => setOpenModalEquipa(false)}
        title="Nova Equipa"
      >
        <TextField label="Colaborador" fullWidth margin="dense" />
        <TextField label="Função" fullWidth margin="dense" />
      </SimpleModal>

      <SimpleModal
        open={openModalTarefa}
        onClose={() => setOpenModalTarefa(false)}
        title="Nova Tarefa"
      >
        <TextField label="Descrição" fullWidth margin="dense" />
        <TextField label="Responsável" fullWidth margin="dense" />
      </SimpleModal>

      <ConfirmDialog
        open={openConfirm}
        title="Confirmar eliminação"
        message="Tem certeza que deseja eliminar este registo?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setOpenConfirm(false)}
      />
    </>
  );
};

export default ViewProcessoTabs;
