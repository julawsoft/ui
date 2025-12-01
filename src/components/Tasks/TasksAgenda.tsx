import React, { useState, useMemo } from 'react';

import {
  Calendar,
  dateFnsLocalizer,
  SlotInfo,
  Event as RBCEvent,
} from 'react-big-calendar';

import { format, parse, startOfWeek, getDay, addHours } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Box,
  Button,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';
import { ChevronLeft, ChevronRight, Today, Add } from '@mui/icons-material';
import type { ITasks } from '../../schema/InterfaceTarefa';

const locales = { 'pt-BR': ptBR };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface TasksAgendaProps {
  tasks: ITasks[];
  onTasksChange?: (tasks: ITasks[]) => void;
}

const estadoColors: Record<string, string> = {
  Criada: '#2196f3',
  'Em Progresso': '#ff9800',
  Concluída: '#4caf50',
};

const parseApiDateToJS = (dateStr?: string | null) => {
  if (!dateStr) return new Date();
  if (dateStr.includes('T')) return new Date(dateStr);
  const [datePart, timePart] = dateStr.split(' ');
  const [dd, mm, yyyy] = datePart.split('/');
  const time = timePart ?? '00:00:00';
  return new Date(`${yyyy}-${mm}-${dd}T${time}`);
};

const TasksAgenda: React.FC<TasksAgendaProps> = ({ tasks = [] }) => {
  const [view, setView] = useState<any>('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  const events: RBCEvent[] = useMemo(
    () =>
      tasks.map((t) => ({
        id: t.id,
        title: t.descricao || 'Sem título',
        start: parseApiDateToJS(t.data_para_realizacao),
        end: addHours(parseApiDateToJS(t.data_para_realizacao), 1),
        allDay: false,
        resource: t,
        bgColor: estadoColors[t.estado ?? 'Criada'] || '#1976d2',
      })),
    [tasks]
  );

  const handlePrev = () => {
    const unit =
      view === 'month' ? 'month' : view === 'day' ? 'day' : 'week';
    setCurrentDate(dayjs(currentDate).subtract(1, unit).toDate());
  };

  const handleNext = () => {
    const unit =
      view === 'month' ? 'month' : view === 'day' ? 'day' : 'week';
    setCurrentDate(dayjs(currentDate).add(1, unit).toDate());
  };

  const handleToday = () => setCurrentDate(new Date());
  const handleViewChange = (newView: string
  ) => setView(newView);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    console.log("teste ", slotInfo)
  };

  const eventStyleGetter = (event: any) => ({
    style: {
      backgroundColor: event.bgColor,
      borderRadius: '6px',
      color: 'white',
      border: '0px',
      display: 'block',
    },
  });

  const handleSelectEvent = (e:any) => console.log("handleSelectEvent ", e)

  return (

    <>

      {
        tasks.length ? (
          <>
            <Box sx={{ height: '85vh', display: 'flex', flexDirection: 'column' }}>

              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Stack direction="row" spacing={1}>
                  <IconButton onClick={handlePrev}><ChevronLeft /></IconButton>
                  <IconButton title="Hoje" onClick={handleToday}><Today /></IconButton>
                  <IconButton onClick={handleNext}><ChevronRight /></IconButton>
                </Stack>

                <Typography
                  variant="h6"
                  sx={{ textAlign: 'center', flexGrow: 1, textTransform: 'capitalize' }}
                >
                  {view === 'month'
                    ? dayjs(currentDate).locale('pt-br').format('MMMM YYYY')
                    : view === 'week'
                      ? `Semana de ${dayjs(currentDate).startOf('week').format('DD/MM')} - ${dayjs(currentDate).endOf('week').format('DD/MM/YYYY')}`
                      : dayjs(currentDate).format('DD/MM/YYYY')}
                </Typography>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant={view === 'day' ? 'contained' : 'outlined'}
                    onClick={() => handleViewChange('day')}
                  >
                    Dia
                  </Button>
                  <Button
                    variant={view === 'week' ? 'contained' : 'outlined'}
                    onClick={() => handleViewChange('week')}
                  >
                    Semana
                  </Button>
                  <Button
                    variant={view === 'month' ? 'contained' : 'outlined'}
                    onClick={() => handleViewChange('month')}
                  >
                    Mês
                  </Button>
                  <Button
                    variant={view === 'agenda' ? 'contained' : 'outlined'}
                    onClick={() => handleViewChange('agenda')}
                  >
                    Agenda
                  </Button>

                </Stack>
              </Stack>

              {/* Calendário */}
              <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: '100%' }}
                  selectable
                  view={view}
                  date={currentDate}
                  onNavigate={(date) => setCurrentDate(date)}
                  onView={(v) => setView(v)}
                  onSelectSlot={handleSelectSlot}
                  onSelectEvent={handleSelectEvent}
                  eventPropGetter={eventStyleGetter}
                  step={30}
                  timeslots={2}
                  min={new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0)}
                  max={new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59)}
                  components={{
                    toolbar: () => null,
                  }}
                />
              </Box>
            </Box>
          </>
        ) : (
          <Box textAlign="center" p={2}>
            <Typography>Nenhuma informação encontrada!</Typography>
          </Box>
        )
      }

    </>

  );
};

export default TasksAgenda;
