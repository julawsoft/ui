import React from 'react';
import { Box, Button } from '@mui/material';
import SimpleAccordion from '../../../components/common/SimpleAccordion';
import { IProcesso } from '../../../schema/InterfaceProcess';

interface Props {
  data: IProcesso;
}

const TabMetodologias: React.FC<Props> = ({ data }) => {
  const sections = [
    { title: 'Metodologias', content: data.metodologia },
    { title: 'Estratégia', content: data.estrategia },
    { title: 'Factos', content: data.factos },
    { title: 'Objectivos', content: data.objectivos },
    { title: 'Dados Importantes', content: data.dados_importantes },
  ];

  return (
    <>
      {sections.map((section, i) => (
        <SimpleAccordion key={i} title={section.title}>
          <Box
            sx={{ p: 1, color: 'text.primary', fontSize: '1rem', lineHeight: 1.6 }}
            dangerouslySetInnerHTML={{ __html: section.content || '' }}
          />
          <Button size="small" variant="contained" sx={{ mt: 2 }}>
            Editar
          </Button>
        </SimpleAccordion>
      ))}
    </>
  );
};

export default TabMetodologias;
