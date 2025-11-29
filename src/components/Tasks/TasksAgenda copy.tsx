  // TasksAgenda.tsx
  import React, { useRef, useEffect, useMemo, useState } from 'react';
  import Calendar from '@toast-ui/react-calendar';
  import dayjs from 'dayjs';
  import 'dayjs/locale/pt';
  import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Select,
    SelectChangeEvent,
    InputLabel,
    FormControl,
    Stack,
    Typography,
    IconButton,
  } from '@mui/material';
  import { ChevronLeft, ChevronRight, Today, Add } from '@mui/icons-material';
  import type { ITasks, ITasksInput } from '../../schema/InterfaceTarefa';

  dayjs.locale('pt');

  interface TasksAgendaProps {
    tasks: ITasks[];
    onTasksChange?: (tasks: ITasks[]) => void;
  }

  const estadoColors: Record<string, string> = {
    Criada: '#2196f3',
    'Em Progresso': '#ff9800',
    Concluída: '#4caf50',
  };

  const parseApiDateToISO = (dateStr?: string | null): string | null => {
    if (!dateStr) return null;
    // se já for ISO
    if (dateStr.includes('T')) return dateStr;
    // espera formato "DD/MM/YYYY HH:mm:ss" ou "DD/MM/YYYY"
    const [datePart, timePart] = dateStr.split(' ');
    const [dd, mm, yyyy] = datePart.split('/');
    if (!dd || !mm || !yyyy) return null;
    const time = timePart ?? '00:00:00';
    return dayjs(`${yyyy}-${mm}-${dd}T${time}`).toISOString();
  };

  const TasksAgenda: React.FC<TasksAgendaProps> = ({ tasks = [], onTasksChange }) => {
    const calendarRef = useRef<any>(null);
    const [viewMode, setViewMode] = useState<'week' | 'month'>('month');
    const [openDialog, setOpenDialog] = useState(false);
    const [editingTask, setEditingTask] = useState<ITasks | null>(null);
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [form, setForm] = useState<Partial<ITasks>>({});

    // Converte tasks -> schedules (passar como prop em vez de manipular a instância)
    const schedules = useMemo(() => {
      return tasks.map((t) => {
        // Converte as datas da API para ISO válido
        const startISO = parseApiDateToISO(t.data_para_realizacao) ?? new Date().toISOString();
        // Se existir data_para_realizacao, usa; senão, adiciona 1 hora
        const endISO =
          parseApiDateToISO(t.data_para_realizacao) ??
          dayjs(startISO).add(1, 'hour').toISOString();

        // Evita eventos com início e fim idênticos
        const adjustedEnd = startISO === endISO
          ? dayjs(endISO).add(1, 'minute').toISOString()
          : endISO;

        // Logs para debug
        console.log("A data start:", startISO);
        console.log("A data end:", adjustedEnd);

        return {
          id: t.id,                       // string obrigatória e única
          calendarId: '1',               // ID do calendário
          title: t.descricao,  // título do evento
          category: 'time',              // pode ser 'time', 'allday' ou 'milestone'
          start: startISO,  // início em formato ISO local (sem Z)
          end: endISO,    // fim também em ISO local
          bgColor: '#1976d2',            // cor de fundo
          borderColor: '#115293',        // cor da borda
          isReadOnly: false,             // opcional
          // opcional — dados extras que queiras passar
        }
      });
    }, [tasks]);


    // Atualiza currentDate lendo da instância (quando existir)
    const updateCurrentDateFromInstance = () => {
      try {
        const cal = calendarRef.current?.getInstance?.();
        if (!cal) return;

        const viewDate = cal.getDate?.();
        if (viewDate) {
          setCurrentDate(dayjs(viewDate));
        }
      } catch (err) {
        console.error('Erro ao atualizar data atual', err);
      }
    };

    const handlePrev = () => {
      const cal = calendarRef.current?.getInstance?.();
      if (!cal) return;
      cal.prev();
      const newDate = dayjs(cal.getDate()?.toDate?.() ?? cal.getDate());
      setCurrentDate(newDate);
    };

    const handleNext = () => {
      const cal = calendarRef.current?.getInstance?.();
      if (!cal) return;
      cal.next();
      const newDate = dayjs(cal.getDate()?.toDate?.() ?? cal.getDate());
      setCurrentDate(newDate);
    };

    const handleToday = () => {
      const cal = calendarRef.current?.getInstance?.();
      if (!cal) return;
      cal.today();
      const newDate = dayjs(cal.getDate()?.toDate?.() ?? cal.getDate());
      setCurrentDate(newDate);
    };


    // Navegação compatível (chama apenas se existir)

    const handleViewChange = (mode: 'week' | 'month') => {
      setViewMode(mode);
      const cal = calendarRef.current?.getInstance?.() ?? calendarRef.current?.getInstance;
      cal?.changeView?.(mode);
      updateCurrentDateFromInstance();
    };

    // Clique em dia vazio -> abre modal pré-preenchido
    const handleClickDay = (event: any) => {
      // event.date pode ser Date object ou moment-like
      const clicked = event?.date;
      const clickedDate = clicked?.toDate ? clicked.toDate() : clicked;
      const startISO = dayjs(clickedDate).toISOString();
      setForm({
        descricao: '',
        tipoTarefa: '',
        colaborador: '',
        gestor: '',
        data_criada: dayjs(clickedDate).format('DD/MM/YYYY HH:mm:ss'),
        data_para_realizacao: dayjs(clickedDate).add(1, 'hour').format('DD/MM/YYYY HH:mm:ss'),
        estado: 'Criada',
      });
      setEditingTask(null);
      setOpenDialog(true);
    };

    // Clique em schedule = editar
    const handleClickSchedule = (event: any) => {
      // o raw que passámos está em event.schedule.raw (ou schedule.raw)
      const raw = event?.schedule?.raw ?? event?.schedule;
      if (!raw) return;
      // raw pode ser o objeto ITasks (conforme map)
      const task: ITasks = raw as ITasks;
      setEditingTask(task);
      setForm(task);
      setOpenDialog(true);
    };

    // Salvar (apenas atualiza local state aqui; tu podes chamar API)

    const handleSaveTask = () => {
      /*
      const payload: ITasksInput = {
        descricao: (form.descricao as string) ?? editingTask?.descricao ?? 'Nova tarefa',
        processoId: editingTask?.processo_id ?? 0,
        gestorId: editingTask?.gestor_id ?? editingTask?.gestor_id ?? 0,
        colaboradorId: editingTask?.colaborador,
        estado: (form.estado as string) ?? editingTask?.estado ?? 'Criada',
        gestor: form.gestor ?? editingTask?.gestor ?? null,
        clienteId: (form.cliente as number) ?? editingTask?.cliente ?? '',
        tipoTarefa: (form.tipoTarefa as string) ?? editingTask?.tipoTarefa ?? null,
        data_criada: (form.data_criada as string) ?? editingTask?.data_criada ?? dayjs().format('DD/MM/YYYY HH:mm:ss'),
        data_para_realizacao: (form.data_para_realizacao as string) ?? editingTask?.data_para_realizacao ?? dayjs().add(1,'hour').format('DD/MM/YYYY HH:mm:ss')
      };

      let updated: ITasks[];
      const exists = localStorage; // apenas para supor atualização: usa onTasksChange / API
      if (editingTask) {
        updated = tasks.map(t => (t.id === payload.id ? payload : t));
      } else {
        updated = [...tasks, payload];
      }

      // se quiseres atualizar o parent:
      onTasksChange?.(updated);

      // fecha modal
      setOpenDialog(false);
      setEditingTask(null);
      setForm({});
      */
    };


    useEffect(() => {
      const cal = calendarRef.current?.getInstance?.();
      if (cal) {
        cal.setDate(dayjs().toDate());
      }
      const timer = setTimeout(() => updateCurrentDateFromInstance(), 200);
      return () => clearTimeout(timer);
    }, [viewMode]);

    console.log(schedules)

    return (
      <Box sx={{ height: '85vh', display: 'flex', flexDirection: 'column' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Stack direction="row" spacing={1}>
            <IconButton  onClick={handlePrev}><ChevronLeft /></IconButton>
            <IconButton title='Hoje' onClick={handleToday}>{<Today />}</IconButton>
            <IconButton  onClick={handleNext}><ChevronRight /></IconButton>
          </Stack>

          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', textTransform: 'capitalize' }}>
            {viewMode === 'month'
              ? currentDate.format('MMMM YYYY')
              : `Semana de ${currentDate.startOf('week').format('DD/MM')} - ${currentDate.endOf('week').format('DD/MM/YYYY')}`}
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button variant={viewMode === 'week' ? 'contained' : 'outlined'} onClick={() => handleViewChange('week')}>Semana</Button>
            <Button variant={viewMode === 'month' ? 'contained' : 'outlined'} onClick={() => handleViewChange('month')}>Mês</Button>
            <Button variant="contained" startIcon={<Add />} onClick={() => { setForm({}); setEditingTask(null); setOpenDialog(true); }}>Nova</Button>
          </Stack>
        </Stack>

        <Box sx={{ flexGrow: 1 }}>
          <Calendar
            ref={calendarRef}
            height="100%"
            view={viewMode}
            useDetailPopup={true}
            month={{
              startDayOfWeek: 1,        // 👈 começa na segunda-feira
            }}
            week={{
              startDayOfWeek: 1, // idem para vista semanal
            }}
            timezone={{
              zones: [
                {
                  timezoneName: 'Africa/Luanda',
                  displayLabel: 'GMT+1',
                },
              ],
            }}
            calendars={[
              { id: "1", name: "Tarefas", bgColor: "#2196f3" },
              /* { id: "2", name: "Reuniões", bgColor: "#4caf50" },
              { id: "3", name: "Férias", bgColor: "#ff9800" },
                */
            ]}
            schedules={schedules}
            onClickDay={handleClickDay}
            onClickSchedule={handleClickSchedule}
          />
        </Box>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
          <DialogTitle>{editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField label="Descrição" value={form.descricao ?? ''} onChange={e => setForm({ ...form, descricao: e.target.value })} fullWidth />
            <TextField label="Cliente" value={form.cliente ?? ''} onChange={e => setForm({ ...form, cliente: e.target.value })} fullWidth />
            <TextField label="Colaborador" value={form.colaborador ?? ''} onChange={e => setForm({ ...form, colaborador: e.target.value })} fullWidth />
            <FormControl fullWidth>
              <InputLabel id="estado-label">Estado</InputLabel>
              <Select labelId="estado-label" value={form.estado ?? 'Criada'} label="Estado" onChange={(e: SelectChangeEvent<string>) => setForm({ ...form, estado: e.target.value })}>
                <MenuItem value="Criada">Criada</MenuItem>
                <MenuItem value="Em Progresso">Em Progresso</MenuItem>
                <MenuItem value="Concluída">Concluída</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button variant="contained" onClick={handleSaveTask}>{editingTask ? 'Atualizar' : 'Salvar'}</Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };

  export default TasksAgenda;
