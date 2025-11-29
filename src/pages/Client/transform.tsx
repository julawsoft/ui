import { IconButton } from "@mui/material";
import type { IClient } from "../../schema/InterfaceClient";
import { Edit, Visibility } from "@mui/icons-material";

export const columnsDataTableClient = [
    { id: 'id', label: '#' },
    { id: 'client', label: 'Denominação' },
    { id: 'nif', label: 'NIF' },
    { id: 'e_mail', label: 'E-mail' },
    { id: 'tipo', label: 'Tipo de Cliente' },
    { id: 'pessoa_contacto', label: 'Pessao de Contacto' },
    { id: 'contacto_cobranca', label: 'Contacto' },
    { id: 'actions', label: 'acções' },
  ];

export const transforDataClient = (
  data: IClient[],
  onEdit: (client: IClient) => void,
  onView: (client: IClient) => void
) => {
  return data.map((client, index) => ({
    id: index + 1,
    client: client.denominacao,
    nif: client.nif,
    e_mail: client.e_mail,
    tipo: client.tipo.description,
    pessoa_contacto: client.pessoa_contacto,
    contacto_cobranca: client.contacto_cobranca,
    actions: (
      <>
        <IconButton color="primary" title="Ver detalhes" onClick={() => onView(client)}>
          <Visibility />
        </IconButton>
        <IconButton color="secondary" title="Editar" onClick={() => onEdit(client)}>
          <Edit />
        </IconButton>
      </>
    ),
  }));

}