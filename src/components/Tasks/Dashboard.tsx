import React, { useMemo } from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import Chart from "react-apexcharts";
import type { ITasks } from "../../schema/InterfaceTarefa";


interface TaskStats {
  notStarted: number;
  inProgress: number;
  delayed: number;
  completed: number;
}

interface DashboardTasksProps {
  tasks: ITasks[];
}

const DashboardTasks: React.FC<DashboardTasksProps> = ({ tasks }) => {
  const colors = {
    notStarted: "#9e9e9e",
    inProgress: "#2196f3",
    delayed: "#f44336",
    completed: "#4caf50",
  };

  // ✅ Estatísticas por estado
  const taskStats: TaskStats = useMemo(() => {
    const stats = { notStarted: 0, inProgress: 0, delayed: 0, completed: 0 };

    tasks.forEach((t) => {
      const estado = t.estado?.toLowerCase() || "";

      if (estado.includes("criada") || estado.includes("não iniciada")) stats.notStarted++;
      else if (estado.includes("em curso")) stats.inProgress++;
      else if (estado.includes("atrasada")) stats.delayed++;
      else if (estado.includes("concluída") || estado.includes("fechada")) stats.completed++;
    });

    return stats;
  }, [tasks]);

  const totalTasks = Object.values(taskStats).reduce((a, b) => a + b, 0);

  // 🍩 Gráfico de pizza — estado geral
  const donutOptions = {
    labels: ["Não Iniciada", "Em Curso", "Atrasadas", "Concluídas"],
    colors: Object.values(colors),
    legend: { position: "bottom" as const },
    dataLabels: { enabled: true, formatter: (val: number) => `${val.toFixed(1)}%` },
  };

  const donutSeries = [
    taskStats.notStarted,
    taskStats.inProgress,
    taskStats.delayed,
    taskStats.completed,
  ];

  // 🔢 Função auxiliar para agrupar
  const groupBy = (key: keyof Task) =>
    [...new Set(tasks.map((t) => t[key]))].map((k) => ({
      key: k as string,
      notStarted: tasks.filter((t) => t[key] === k && t.estado === "Criada").length,
      completed: tasks.filter((t) => t[key] === k && t.estado === "Concluída").length,
    }));

  const colaboradores = groupBy("colaborador");
  const clientes = groupBy("cliente");

  // 📊 Configurações de gráficos de barras
  const barOptions = (categories: string[]) => ({
    chart: { id: "bar-chart", stacked: true },
    xaxis: { categories },
    legend: { position: "bottom" as const },
    plotOptions: { bar: { borderRadius: 6, horizontal: false } },
    dataLabels: { enabled: false },
    grid: { borderColor: "#eee" },
  });

  return (
    <Box sx={{ p: 3, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h5" mb={3} color="#333" fontWeight="bold">
        Painel de Tarefas
      </Typography>

      {/* Cards de resumo */}
      <Grid container spacing={2} mb={3}>
        {[
          { label: "Não Iniciadas", value: taskStats.notStarted, color: colors.notStarted },
          { label: "Em Curso", value: taskStats.inProgress, color: colors.inProgress },
          { label: "Atrasadas", value: taskStats.delayed, color: colors.delayed },
          { label: "Concluídas", value: taskStats.completed, color: colors.completed },
        ].map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.label}>
            <Card
              sx={{
                bgcolor: "#fff",
                borderLeft: `6px solid ${card.color}`,
                borderRadius: 2,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardContent>
                <Typography variant="subtitle2" color="#777">
                  {card.label}
                </Typography>
                <Typography variant="h4" fontWeight={700} color={card.color}>
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Gráficos */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#fff", boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" mb={2} color="#333" fontWeight="600">
                Estado Geral
              </Typography>
              <Chart options={donutOptions} series={donutSeries} type="donut" />
              <Typography variant="body2" align="center" mt={2} color="#555">
                Total: {totalTasks} tarefas
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ bgcolor: "#fff", boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" mb={2} color="#333" fontWeight="600">
                Tarefas por Cliente
              </Typography>
              <Chart
                options={barOptions(clientes.map((c) => c.key))}
                series={[
                  { name: "Não Iniciada", data: clientes.map((c) => c.notStarted), color: colors.notStarted },
                  { name: "Concluída", data: clientes.map((c) => c.completed), color: colors.completed },
                ]}
                type="bar"
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ bgcolor: "#fff", boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" mb={2} color="#333" fontWeight="600">
                Tarefas por Colaborador
              </Typography>
              <Chart
                options={barOptions(colaboradores.map((c) => c.key))}
                series={[
                  { name: "Não Iniciada", data: colaboradores.map((c) => c.notStarted), color: colors.notStarted },
                  { name: "Concluída", data: colaboradores.map((c) => c.completed), color: colors.completed },
                ]}
                type="bar"
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardTasks;
