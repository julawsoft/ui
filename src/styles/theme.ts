import { extendTheme, Theme } from '@chakra-ui/react'

const theme = {
  styles: {
    global: {
      body: {
        background: 'gray.50',
        color: 'gray.900',
        minH: '100vh',
        margin: 0,
        padding: 0,
      },

      '::-webkit-scrollbar': {
        background: 'gray.50',
        borderRadius: '12px',
        width: '5px',
        height: '100%',
      },

      '::-webkit-scrollbar-thumb': {
        borderRadius: '12px',
        background: '#C2912E',
      },
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  },
  colors: {
    colab: {
      primary: '#C2912E',
      secondary: '#FFEFCF',
      sidebar: '#26282a',
      background: '#4D4B4B',
      color: '#5A5A66',
      border: '#CCCCCC',
    },
    gray: {
      '900': '#25282A',
      '800': '#323232',
      '700': '#353646',
      '600': '#4B4D63',
      '500': '#616480',
      '400': '#797D9A',
      '300': '#9699B0',
      '200': '#B3B5C6',
      '100': '#D1D2DC',
      '50': '#F2F2F2',
    },
    yellow: {
      '300': '#F2C112',
      '400': '#C2912E',
    },
  },
} as Theme | {}

export const defaultTheme = extendTheme(theme)
