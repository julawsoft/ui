import React, { useEffect, useState } from 'react';
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
  Grid2,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import BoxCard from '../../components/common/BoxCard';
import SimpleModal from '../../components/common/SimpleModal';
import BoxTop from '../../components/common/BoxTop';
import Loader from '../../components/common/Loader';
import DataTable from '../../components/common/DataTable';
import SimpleAccordion from '../../components/common/SimpleAccordion';
import StateHandler from '../../components/common/StateHandler';
import BreadcrumbsNav from '../../components/common/BreadcrumbsNav';
import { toast } from 'react-toastify';
import PrimaryButton from '../../components/common/PrimaryButton';
import { ROUTES_PATH } from '../../routes/routePaths';
import EstadoChip from '../../components/common/EstadoChip';
import { ProcessoService } from '../../services/ProcessoService';
import { IProcesso, type IProcessoAnexos, type IProcessoPrecedentes, type ITarefa } from '../../schema/InterfaceProcess';
import Textarea from '../../components/common/Textarea';
import FileUploader from '../../components/uploads/FileUploader';
import RichTextEditor from '../../components/editor/RichTextEditor';
import TabEquipas from './tabs/TabEquipas';
import TabAssociados from './tabs/TabAssociados';
import TabAnexos from './tabs/TabAnexos';
import { useUserLogged } from '../../hooks/useUserLogged';
import type { IHonorarios } from '../../schema/InterfaceHonorarios';
import { HonorariosService } from '../../services/HonorariosService';

// ===== Componente auxiliar para abas =====
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
  </div>
);


// ===== Componente principal =====
const ViewProcessoTabs: React.FC = () => {

  const { id } = useParams<{ id: string }>();
const {user} = useUserLogged()
  const navigate = useNavigate();

  const [content, setContent] = useState<string>("");

  const [data, setData] = useState<IProcesso>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [tabIndex, setTabIndex] = useState(0);

  // Estados para cada aba
  const [tarefas, setTarefas] = useState<any[]>([]);
  const [equipas, setEquipas] = useState<ITarefa[]>([]);
  const [honorarios, setHonorarios] = useState<IHonorarios[]>([]);
  const [anexos, setAnexos] = useState<any[]>([]);
  const [associados, setAssociados] = useState<any[]>([]);

  // Modal states
  const [openModalEquipa, setOpenModalEquipa] = useState(false);
  const [openModalTarefa, setOpenModalTarefa] = useState(false);
  const [openModalAnexo, setOpenModalAnexo] = useState(false);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    const fetchProcesso = async () => {
      setLoading(true);
      try {
        if (!id) throw new Error('ID do processo não fornecido');
        const response: any = await ProcessoService.getById(Number(id));
        const processo = response[0];
        console.log("O data", processo)
        setData(processo);
        setTarefas(processo.tarefas || []);
        setEquipas(processo.equipas || []);
        setAnexos(processo.anexos || []);
        setAssociados(processo.precedentes || []);
        await getHonorariosByProcesso()
        // setHorarios(processo.precedentes || []);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar o processo');
        toast.error(err.message || 'Erro ao carregar o processo');
      } finally {
        setLoading(false);
      }
    };
    fetchProcesso();
  }, [id]);


  const getHonorariosByProcesso = async () => {
        setHonorarios(await HonorariosService.getByProcessoId(Number(id)))
  }


  const handleEditProcesso = () => {
    if (data?.id) navigate(`${ROUTES_PATH.NewProcesso}/${data.id}`);
  };

  // Ações genéricas
  const handleEdit = (item: any) => toast.info(`Editar ${item.descricao || item.colaborador}`);
  const handleDelete = (item: any) => toast.warn(`Remover ${item.descricao || item.colaborador}`);

  if (loading) return <Loader fullscreen />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!data) return <Alert severity="warning">Processo não encontrado</Alert>;

  const handleDeleteTarefas = (item: ITarefa) => {
        console.log("handleDeleteTarefas >>> ", item)
  }

  const handleDeleteAssociados = (item: IProcessoPrecedentes) => {
        console.log("handleDeleteAssociados >>> ", item)
  }
  const handleDeleteAnexos = (item: IProcessoAnexos) => {
        console.log("handleDeleteAssociados >>> ", item)
  }

    return (
      <>
        <BreadcrumbsNav
          items={[
            { label: 'Início', path: '/' },
            { label: 'Processos', path: '/processos' },
            { label: 'Detalhes do Processo' },
          ]}
        />
        <BoxTop
          title="Detalhes do Processo"
          actions={
            <>
              <PrimaryButton onClick={handleEditProcesso}>Editar</PrimaryButton>
            </>
          }
        />

        <Grid container spacing={2}>
          {/* Coluna Esquerda */}
          <Grid item xs={12} md={3}>
            <BoxCard>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6">Detalhes</Typography>
                <EstadoChip estado={data.estado} />
              </Box>

              <Typography variant="subtitle2" color="textSecondary">Referência</Typography>
              <Typography mb={1}>{data.ref || '-'}</Typography>

              <Typography variant="subtitle2" color="textSecondary">N.º Processo Judicial</Typography>
              <Typography mb={1}>{data.n_processo_judicial || '-'}</Typography>

              <Typography variant="subtitle2" color="textSecondary">Assunto</Typography>
              <Typography mb={1}>{data.assunto || '-'}</Typography>

              <Typography variant="subtitle2" color="textSecondary">Área</Typography>
              <Typography mb={1}>{data.area || '-'}</Typography>

              <Typography variant="subtitle2" color="textSecondary">Fase</Typography>
              <Typography mb={1}>{data.fase || '-'}</Typography>

              <Typography variant="subtitle2" color="textSecondary">Instituição</Typography>
              <Typography mb={1}>{data.instituicao || '-'}</Typography>

              <Typography variant="subtitle2" color="textSecondary">Modo Facturação</Typography>
              <Typography mb={1}>{data.modo_facturacao?.descricao || '-'}</Typography>

              <Typography variant="subtitle2" color="textSecondary">Gestor</Typography>
              <Typography mb={1}>{data.gestor || '-'}</Typography>

              <Typography variant="subtitle2" color="textSecondary">Cliente</Typography>
              <Typography mb={1}>{data.cliente || '-'}</Typography>

              <Typography variant="subtitle2" color="textSecondary">Valor Total</Typography>
              <Typography mb={1}>{data.valor_total || '-'}</Typography>

              <Typography variant="subtitle2" color="textSecondary">Horas/Mês</Typography>
              <Typography mb={1}>{data.horas_mes || '-'}</Typography>

              <Typography variant="subtitle2" color="textSecondary">Data registo</Typography>
              <Typography mb={1}>
                {data.data_registo ? new Date(data.data_registo).toLocaleDateString() : '-'}
              </Typography>
            </BoxCard>
          </Grid>

          {/* Coluna Direita */}
          <Grid item xs={12} md={9}>
            <BoxCard>
              <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
                <Tab label="Metodologias" />
                <Tab label="Equipas" />
                <Tab label="Tarefas" />
                <Tab label="Anexos" />
                <Tab label="Associados" />
              </Tabs>

              {/* =================== Metodologias =================== */}
              <TabPanel value={tabIndex} index={0}>
                <>
                  <SimpleAccordion title="Metodologias" subtitle="">
                    <Box
                      sx={{
                        p: 1,
                        color: 'text.primary',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                      }}
                      // permite HTML no conteúdo (negrito, itálico, etc)
                      dangerouslySetInnerHTML={{ __html: data.metodologia }}
                    />
                    <Button size="small" variant="contained" sx={{ mt: 2 }}>
                    <Edit /> Editar
                    </Button>
                  </SimpleAccordion>

                  <SimpleAccordion title="Estrategia" subtitle="">
                    <Box
                      sx={{
                        p: 1,
                        color: 'text.primary',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                      }}
                      // permite HTML no conteúdo (negrito, itálico, etc)
                      dangerouslySetInnerHTML={{ __html: data.estrategia }}
                    />
                    <Grid2 display={'flex-end'}>
                      
                    <Button  size="small" variant="contained" sx={{ mt: 2 }}>
                     <Edit /> Editar
                    </Button>
                    </Grid2>
                  </SimpleAccordion>

                  <SimpleAccordion title="Factos" subtitle="">
                    <Box
                      sx={{
                        p: 1,
                        color: 'text.primary',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                      }}
                      // permite HTML no conteúdo (negrito, itálico, etc)
                      dangerouslySetInnerHTML={{ __html: data.factos }}
                    />
                    <Button size="small" variant="contained" sx={{ mt: 2 }}>
                    <Edit /> Editar
                    </Button>
                  </SimpleAccordion>

                  <SimpleAccordion title="Objectivos" subtitle="">
                    <Box
                      sx={{
                        p: 1,
                        color: 'text.primary',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                      }}
                      // permite HTML no conteúdo (negrito, itálico, etc)
                      dangerouslySetInnerHTML={{ __html: data.objectivos }}
                    />
                    <Button size="small" variant="contained" sx={{ mt: 2 }}>
                      <Edit /> Editar
                    </Button>
                  </SimpleAccordion>

                  <SimpleAccordion title="Dados Importantes" subtitle="">
                    <Box
                      sx={{
                        p: 1,
                        color: 'text.primary',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                      }}
                      // permite HTML no conteúdo (negrito, itálico, etc)
                      dangerouslySetInnerHTML={{ __html: data.dados_importantes }}
                    />
                    <Button size="small" variant="contained" sx={{ mt: 2 }}>
                    <Edit />Editar
                    </Button>
                  </SimpleAccordion>
                </>
              </TabPanel>

              {/* =================== EQUIPAS =================== */}
              <TabPanel value={tabIndex} index={1}>
                    <TabEquipas idProcesso={Number(id)} equipas={equipas}  onDelete={handleDeleteTarefas} />
              </TabPanel>

              {/* =================== TAREFAS =================== */}
              <TabPanel value={tabIndex} index={2}>
                
                <Stack direction="row" justifyContent="flex-end" mb={2}>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setOpenModalTarefa(true)}
                  >
                    Nova Tarefa
                  </Button>
                </Stack>
                {tarefas.length > 0 ? (
                  <DataTable
                    columns={[
                      { id: 'descricao', label: 'Descrição' },
                      { id: 'estado', label: 'Estado' },
                      { id: 'nome_completo', label: 'Responsável' },
                      { id: 'data_para_realizacao', label: 'Prazo' },
                      {
                        id: 'actions',
                        label: 'Ações'
                      },
                    ]}
                    rows={tarefas}
                  />
                ) : (
                  <Alert severity="info">Nenhuma tarefa encontrada.</Alert>
                )}
              </TabPanel>

              {/* =================== ANEXOS =================== */}
              <TabPanel value={tabIndex} index={3}>
                <TabAnexos data={anexos}idColaborador={Number(user?.id)} idProcesso={Number(id)} onDelete={handleDeleteAnexos} />
              </TabPanel>

              {/* =================== Associados =================== */}
              <TabPanel value={tabIndex} index={4}>
                  <TabAssociados data={associados} idProcesso={Number(id)} onDelete={handleDeleteAssociados} />
              </TabPanel>

            </BoxCard>
          </Grid>
        </Grid>

        {/* ========== MODAIS ========== */}
        <SimpleModal open={openModalEquipa} onClose={() => setOpenModalEquipa(false)} title="Nova Equipa">
          <TextField label="Colaborador" fullWidth margin="dense" />
          <TextField label="Função" fullWidth margin="dense" />
        </SimpleModal>

        <SimpleModal open={openModalTarefa} onClose={() => setOpenModalTarefa(false)} title="Nova Tarefa">
          <TextField label="Descrição" fullWidth margin="dense" />
          <TextField label="Responsável" fullWidth margin="dense" />
        </SimpleModal>

      
      </>
    );
  };

  export default ViewProcessoTabs;
