// src/utils/generateClientPDF.ts
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { IClient } from '../../schema/InterfaceClient';

export const generateClientPDF = (client: IClient) => {
  const doc = new jsPDF() as any;
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('FICHA DO CLIENTE', pageWidth / 2, 15, { align: 'center' });

  doc.setLineWidth(0.3);
  doc.line(14, 20, pageWidth - 14, 20);
  const formatValue = (val: any) => (val !== null && val !== undefined && val !== '' ? String(val) : '-');

  const rows = [
    ['ID', formatValue(client.id)],
    ['Denominação', formatValue(client.denominacao)],
    ['Tipo', formatValue(client.tipo?.description)],
    ['NIF', formatValue(client.nif)],
    ['Endereço', formatValue(client.endereco)],
    ['Pessoa de Contato', formatValue(client.pessoa_contacto)],
    ['Contacto Cobrança', formatValue(client.contacto_cobranca)],
    ['E-mail', formatValue(client.e_mail)],
    ['Status', formatValue(client.status)],
    ['Nota', formatValue(client.nota)],
    ['Criado em', new Date(client.created_at).toLocaleDateString()],
    ['Atualizado em', new Date(client.updated_at).toLocaleDateString()],
  ];

  autoTable(doc, {
    startY: 28,
    head: [['Campo', 'Valor']],
    body: rows,
    theme: 'striped',
    styles: { fontSize: 11, cellPadding: 3 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255, halign: 'center' },
    columnStyles: {
      0: { cellWidth: 60, fontStyle: 'bold' }, // Coluna Campo
      1: { cellWidth: 'auto' }, // Coluna Valor ajusta
    },
  });

  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(100);
    const footerText = `Julaw Soft, gerado em: ${new Date().toLocaleString()} | Página ${i} de ${pageCount}`;
    doc.text(footerText, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, {
      align: 'center',
    });
  }

  const fileName = `Ficha_Cliente_${client.denominacao.replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);
};
