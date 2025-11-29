import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

export default function FiltroMyTask({
  clientes = [],
  processos = [],
  estados = [],
  cliente,
  tipoTarefas = [],
  tipoTarefa,
  processo,
  estado,
  dataInicio,
  dataFim,
  handleChangeCliente,
  handleChangeTipoTarefas,
  handleChangeProcesso,
  handleChangeEstado,
  handleChangeDataInicio,
  handleChangeDataFim,
  handleBuscar,
}: any) {
  return (
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
      {/* Cliente */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography>Cliente:</Typography>
        <Select
          size="small"
          value={cliente ?? ""}
          onChange={handleChangeCliente}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">
            <em>Selecione o cliente</em>
          </MenuItem>
          {clientes.map((c: any) => (
            <MenuItem key={c.id} value={c.id}>
              {c.denominacao}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Processos */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography>Processo:</Typography>
        <Select
          size="small"
          value={processo ?? ""}
          onChange={handleChangeProcesso}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">
            <em>Selecione um processo</em>
          </MenuItem>
          {processos.map((c: any) => (
            <MenuItem key={c.id} value={c.id}>
              {c.ref}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* tipoTarefa */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography>Tipo tarefa:</Typography>
        <Select
          size="small"
          value={tipoTarefa ?? ""}
          onChange={handleChangeProcesso}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">
            <em>Selecione uma opção</em>
          </MenuItem>
          {tipoTarefas.map((p: any) => (
            <MenuItem key={p.id} value={p.id}>
              {p.descricao}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Estado */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography>Estado:</Typography>
        <Select
          size="small"
          value={estado ?? ""}
          onChange={handleChangeEstado}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="">
            <em>Selecione o estado</em>
          </MenuItem>
          {estados.map((e: any) => (
            <MenuItem key={e.value} value={e.value}>
              {e.label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Intervalo de datas */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography>Data Realização:</Typography>
        <TextField
          size="small"
          type="date"
          value={dataInicio}
          onChange={handleChangeDataInicio}
        />
        <Typography>até</Typography>
        <TextField
          size="small"
          type="date"
          value={dataFim}
          onChange={handleChangeDataFim}
        />
      </Box>

      {/* Buscar */}
      <Button onClick={handleBuscar} variant="contained" color="primary">
        Buscar
      </Button>
    </Box>
  );
}
