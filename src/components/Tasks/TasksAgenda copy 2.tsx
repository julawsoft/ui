// TasksAgenda.tsx
import React, { useRef, useEffect, useMemo, useState } from 'react';
import Calendar from '@toast-ui/react-calendar';
import type { Calendar as CalendarInstance, ScheduleData } from '@toast-ui/calendar';
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
import type { ITasks } from '../../schema/InterfaceTarefa';

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
  if (dateStr.includes('T')) return dateStr;
  const [datePart, timePart] = dateStr.split(' ');
  const [dd, mm, yyyy] = datePart.split('/');
  if (!dd || !mm || !yyyy) return null;
  const time = timePart ?? '00:00:00';
  return dayjs(`${yyyy}-${mm}-${dd}T${time}`).toISOString();
};

const TasksAgenda: React.FC<TasksAgendaProps> = ({ tasks = [], onTasksChange }) => {
  const calendarRef = useRef<CalendarInstance | null>(null);

  const [viewMode, setViewMode] = useState<'week' | 'month'>('month');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<ITasks | null>(null);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [form, setForm] = useState<Partial<ITasks>>({});

  const schedules: ScheduleData[] = useMemo(() => {
    return tasks.map((t) => {
      const startISO = parseApiDateToISO(t.data_para_realizacao) ?? new Date().toISOString();
      const endISO = dayjs(startISO).add(1, 'hour').toISOString();

      return {
        id: String(t.id),
        calendarId: '1',
        title: t.descricao || 'Sem título',
        category: 'time',
        start: startISO,
        end: endISO,
        bgColor: estadoColors[t.estado ?? 'Criada'] || '#1976d2',
        borderColor: '#115293',
        isReadOnly: false,
        raw: t,
      } as ScheduleData;
    });
  }, [tasks]);

  // Cria schedules dinamicamente
  useEffect(() => {
    const cal = calendarRef.current?.getInstance();
    if (!cal) return;
    cal.clear(); // limpa schedules antigos
    schedules.forEach((s) => cal.createSchedules([s]));
  }, [schedules]);

  const updateCurrentDateFromInstance = () => {
    const cal = calendarRef.current?.getInstance?.();
    if (!cal) return;
    const date = cal.getDate?.();
    if (date) setCurrentDate(dayjs(date));
  };

  const handlePrev = () => {
    const cal = calendarRef.current?.getInstance?.();
    if (!cal) return;
    cal.prev();
    updateCurrentDateFromInstance();
  };

  const handleNext = () => {
    const cal = calendarRef.current?.getInstance?.();
    if (!cal) return;
    cal.next();
    updateCurrentDateFromInstance();
  };

  const handleToday = () => {
    const cal = calendarRef.current?.getInstance?.();
    if (!cal) return;
    cal.today();
    updateCurrentDateFromInstance();
  };

  const handleViewChange = (mode: 'week' | 'month') => {
    setViewMode(mode);
    const cal = calendarRef.current?.getInstance?.();
    cal?.changeView?.(mode);
    updateCurrentDateFromInstance();
  };

  const handleClickDay = (event: any) => {
    const clickedDate = dayjs(event.date);
    setForm({
      descricao: '',
      tipoTarefa: '',
      colaborador: '',
      gestor: '',
      data_criada: clickedDate.format('DD/MM/YYYY HH:mm:ss'),
      data_para_realizacao: clickedDate.add(1, 'hour').format('DD/MM/YYYY HH:mm:ss'),
      estado: 'Criada',
    });
    setEditingTask(null);
    setOpenDialog(true);
  };

  const handleClickSchedule = (event: any) => {
    const raw = event?.schedule?.raw;
    if (!raw) return;
    setEditingTask(raw);
    setForm(raw);
    setOpenDialog(true);
  };

  const handleSaveTask = () => {
    // Persistência local de exemplo
    /*
    let updated: ITasks[];
    if (editingTask) {
      updated = tasks.map((t) => (t.id === editingTask.id ? { ...t, ...form } : t));
    } else {
      const newTask: ITasks = { ...form, id: Math.random().toString() } as ITasks;
      updated = [...tasks, newTask];
    }
    onTasksChange?.(updated);
    setOpenDialog(false);
    */
  };

  useEffect(() => {
    const cal = calendarRef.current?.getInstance();
    if (cal) cal.setDate(dayjs().toDate());
    updateCurrentDateFromInstance();
  }, [viewMode]);

  return (
    <Box sx={{ height: '85vh', display: 'flex', flexDirection: 'column' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={handlePrev}><ChevronLeft /></IconButton>
          <IconButton title="Hoje" onClick={handleToday}><Today /></IconButton>
          <IconButton onClick={handleNext}><ChevronRight /></IconButton>
        </Stack>

        <Typography variant="h6" sx={{ textAlign: 'center', flexGrow: 1, textTransform: 'capitalize' }}>
          {viewMode === 'month'
            ? currentDate.format('MMMM YYYY')
            : `Semana de ${currentDate.startOf('week').format('DD/MM')} - ${currentDate.endOf('week').format('DD/MM/YYYY')}`}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button variant={viewMode === 'week' ? 'contained' : 'outlined'} onClick={() => handleViewChange('week')}>
            Semana
          </Button>
          <Button variant={viewMode === 'month' ? 'contained' : 'outlined'} onClick={() => handleViewChange('month')}>
            Mês
          </Button>
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
            Nova
          </Button>
        </Stack>
      </Stack>

      <Box sx={{ flexGrow: 1 }}>
        <Calendar
          ref={calendarRef}
          height="100%"
          view={viewMode}
          useDetailPopup={true}
          calendars={[{ id: '1', name: 'Tarefas', bgColor: '#2196f3', borderColor: '#115293' }]}
          onClickDay={handleClickDay as any}
          onClickSchedule={handleClickSchedule as any}
        />
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Descrição"
            value={form.descricao ?? ''}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="estado-label">Estado</InputLabel>
            <Select
              labelId="estado-label"
              value={form.estado ?? 'Criada'}
              label="Estado"
              onChange={(e: SelectChangeEvent<string>) => setForm({ ...form, estado: e.target.value })}
            >
              <MenuItem value="Criada">Criada</MenuItem>
              <MenuItem value="Em Progresso">Em Progresso</MenuItem>
              <MenuItem value="Concluída">Concluída</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSaveTask}>
            {editingTask ? 'Atualizar' : 'Salvar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TasksAgenda;
