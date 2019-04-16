import { baseUrl } from '../../util/config';

export default {
  text: 'Trangboddhet',
  value: 'trangboddhet',
  show: null,
  cards: [
    {
      size: 'large',
      heading: 'Trangbodde husstander',
      tabs: [
        {
          active: false,
          label: 'Status',
          id: 'trangboddhet_alle_status',
          template: 'j',
          url: `${baseUrl}/mockDataJ.json`,
          method: 'ratio',
        },
        {
          active: false,
          label: 'Status0',
          id: 'trangboddhet_alle_status',
          template: 'j',
          url: `${baseUrl}/mockDataJ.json`,
          method: 'value',
        },
        {
          active: false,
          label: 'Status2',
          id: 'trangboddhet_alle_status',
          template: 'a',
          url: `${baseUrl}/mockDataJ.json`,
          method: 'ratio',
        },
        {
          active: false,
          label: 'Status3',
          id: 'trangboddhet_alle_status',
          template: 'a',
          url: `${baseUrl}/mockDataJ.json`,
          method: 'value',
        },
        {
          active: false,
          label: 'Historisk',
          id: 'trangboddhet_alle_historisk',
          template: 'c',
          method: 'ratio',
          url: `${baseUrl}/trangboddhet_historisk.json`,
        },
        {
          active: false,
          label: 'Historisk2',
          id: 'trangboddhet_alle_historisk',
          template: 'c',
          method: 'value',
          url: `${baseUrl}/trangboddhet_historisk.json`,
        },
      ],
    },
    {
      size: 'small',
      heading: 'Under 0.5 rom per person',
      map: {
        labels: ['Færre', 'Flere'],
        method: 'ratio',
        reverse: true,
        scale: [0.01, 0.06],
        url: `${baseUrl}/trangboddhet_05.json`,
      },
      tabs: [
        {
          active: false,
          label: 'Status',
          id: 'trangboddhet_alle_status',
          template: 'a',
          url: `${baseUrl}/trangboddhet_05.json`,
          method: 'ratio',
        },
      ],
    },
    // {
    //   name: 'spesifikk',
    //   title: 'Mellomtittel test',
    //   graphs: [
    //     {
    //       size: 'small',
    //       tabs: [
    //         {
    //           active: false,
    //           label: 'Status',
    //           id: 'trangboddhet_under0.5_status',
    //           method: 'ratio',
    //           template: 'a',
    //           url: `${baseUrl}/mockDataAinnvandrer3.json`,
    //         },
    //         {
    //           active: false,
    //           label: 'Historisk',
    //           id: 'trangboddhet_under0.5_historisk',
    //           template: 'b',
    //           url: `${baseUrl}/mockDataB.json`,
    //         },
    //       ],
    //     },
    //     {
    //       size: 'small',
    //       tabs: [
    //         {
    //           active: false,
    //           label: 'Status',
    //           id: 'trangboddhet_0.5-0.9_status',
    //           template: 'a',
    //           method: 'ratio',
    //           url: `${baseUrl}/mockDataAinnvandrer3.json`,
    //         },
    //         {
    //           active: false,
    //           label: 'Historisk',
    //           id: 'trangboddhet_0.5-0.9_historisk',
    //           template: 'b',
    //           url: `${baseUrl}/mockDataB.json`,
    //         },
    //       ],
    //     },
    //     {
    //       size: 'small',
    //       tabs: [
    //         {
    //           active: false,
    //           label: 'Status',
    //           id: 'trangboddhet_1.0-1.9_status',
    //           template: 'a',
    //           method: 'ratio',
    //           url: `${baseUrl}/mockDataAinnvandrer3.json`,
    //         },
    //         {
    //           active: false,
    //           label: 'Historisk',
    //           id: 'trangboddhet_1.0-1.9_historisk',
    //           template: 'b',
    //           url: `${baseUrl}/mockDataB.json`,
    //         },
    //       ],
    //     },
    //     {
    //       size: 'small',
    //       tabs: [
    //         {
    //           active: false,
    //           label: 'Status',
    //           id: 'trangboddhet_over2_status',
    //           template: 'a',
    //           method: 'ratio',
    //           url: `${baseUrl}/mockDataAinnvandrer3.json`,
    //         },
    //         {
    //           active: false,
    //           label: 'Historisk',
    //           id: 'trangboddhet_over2_historisk',
    //           template: 'b',
    //           url: `${baseUrl}/mockDataB.json`,
    //         },
    //       ],
    //     },
    //   ],
    // },
  ],
  options: {
    kategori: 'Bomiljø',
    tema: 'Trangboddhet',
    bgImage: `${baseUrl}/img/trangboddhet`,
    txtColor: 'rgb(199, 247, 201)',
  },
  related: ['boligpriser', 'levekaar', 'eierform'],
};
