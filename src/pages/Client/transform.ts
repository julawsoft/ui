import type { IClient } from "../../schema/InterfaceClient";

export const columns = [
    { id: 'id', label: '#' },
    { id: 'client', label: 'Denominação' },
    { id: 'nif', label: 'NIF' },
    { id: 'e_mail', label: 'E-mail' },
    { id: 'tipo', label: 'Tipo de Cliente' },
    { id: 'pessoa_contacto', label: 'Pessao de Contacto' },
    { id: 'contacto_cobranca', label: 'Contacto' },
  ];

export const transforDataClient = (data: IClient[]) => {
  return data.map((client) => ({
    id: client.id,
    client: client.denominacao,
    nif: client.nif,
    e_mail: client.e_mail,
    tipo: client.tipo.description,
    pessoa_contacto: client.pessoa_contacto,
    contacto_cobranca: client.contacto_cobranca
  }));

}