import { apiUrl, baseUrl } from '../../util/config';

const API = `${apiUrl}/api/dataset`;

export default {
  text: 'Personer med innvandrerbakgrunn',
  value: 'innvandrerbefolkningen',
  production: true,

  cards: [
    {
      size: 'large',
      heading: 'Innvandrere',
      production: true,
      tabs: [
        {
          active: false,
          label: 'Andel',
          template: 'a',
          heading: 'Innvandrerbefolkningen etter kategori',
          method: 'ratio',
          url: `${API}/innvandring-befolking-status`,
          production: true,
        },
        {
          active: false,
          label: 'Antall',
          template: 'a',
          heading: 'Innvandrerbefolkningen etter kategori',
          method: 'value',
          url: `${API}/innvandring-befolking-status`,
          production: true,
        },

        {
          active: true,
          label: 'Historisk (andel)',
          template: 'c',
          heading: 'Innvandrerbefolkningen etter kategori',
          method: 'ratio',
          url: `${API}/innvandring-befolking-historisk`,
          production: true,
        },
        {
          active: false,
          label: 'Historisk (antall)',
          template: 'c',
          heading: 'Innvandrerbefolkningen etter kategori',
          method: 'value',
          url: `${API}/innvandring-befolking-historisk`,
          production: true,
        },
      ],
    },
    {
      size: 'large',
      heading: 'Landbakgrunn',
      production: true,
      tabs: [
        {
          active: false,
          label: 'Andel',
          noFilter: true,
          id: 'innvandring_landbakgrunn_status',
          template: 'a',
          method: 'ratio',
          url: `${API}/landbakgrunn-innvandringsgrupper-status`,
          production: true,
        },
        {
          active: false,
          label: 'Antall',
          noFilter: true,
          id: 'innvandring_landbakgrunn_status',
          template: 'a',
          method: 'value',
          url: `${API}/landbakgrunn-innvandringsgrupper-status`,
          production: true,
        },
        {
          active: false,
          label: 'Historisk (andel)',
          noFilter: true,
          id: 'innvandring_landbakgrunn_historisk',
          template: 'c',
          method: 'ratio',
          url: `${API}/landbakgrunn-innvandringsgrupper-historisk`,
          production: true,
        },

        {
          active: false,
          label: 'Historisk (antall)',
          noFilter: true,
          id: 'innvandring_landbakgrunn_historisk',
          template: 'c',
          method: 'value',
          url: `${API}/landbakgrunn-innvandringsgrupper-historisk`,
          production: true,
        },
      ],
    },
    {
      size: 'small',
      heading: 'Under 16 år',
      map: {
        labels: ['Færre innvandrere', 'Flere innvandrere'],
        url: `${API}/Andel-innvandrere-under-16-sta-imHqA`,
        scale: [0.03, 0.15],
        reverse: true,
        method: 'ratio',
      },
      production: true,
      tabs: [
        {
          active: false,
          label: 'Andel',
          id: 'innvandring_under16-totalt_status',
          template: 'a',
          method: 'ratio',
          url: `${API}/Andel-innvandrere-under-16-sta-imHqA`,
          production: true,
        },
        {
          active: false,
          label: 'Antall',
          id: 'innvandring_under16-totalt_status',
          template: 'a',
          method: 'value',
          url: `${API}/Andel-innvandrere-under-16-sta-imHqA`,
          production: true,
        },
        {
          active: false,
          label: 'Historisk (andel)',
          id: 'innvandring_under16-totalt_historisk',
          template: 'b',
          method: 'ratio',
          url: `${API}/Andel-innvandrere-under-16-his-5EUaC`,
          production: true,
        },
        {
          active: false,
          label: 'Historisk (antall)',
          id: 'innvandring_under16-totalt_historisk',
          template: 'b',
          method: 'value',
          url: `${API}/Andel-innvandrere-under-16-his-5EUaC`,
          production: true,
        },
      ],
    },
    {
      size: 'small',
      heading: 'Under 16 år med én innvandrerforelder',
      map: {
        labels: ['Færre innvandrere', 'Flere innvandrere'],
        url: `${API}/Andel-under-16-med-en-innvandr-rRuib`,
        scale: [0.15, 0.3],
        reverse: true,
        method: 'ratio',
      },
      production: true,
      tabs: [
        {
          active: false,
          label: 'Andel',
          id: 'innvandring_under16-en-innvandrerforelder_status',
          template: 'a',
          method: 'ratio',
          url: `${API}/Andel-under-16-med-en-innvandr-rRuib`,
          production: true,
        },
        {
          active: false,
          label: 'Antall',
          id: 'innvandring_under16-en-innvandrerforelder_status',
          template: 'a',
          method: 'value',
          url: `${API}/Andel-under-16-med-en-innvandr-rRuib`,
          production: true,
        },
        {
          active: false,
          label: 'Historisk (andel)',
          id: 'innvandring_under16-en-innvandrerforelder_historisk',
          template: 'b',
          method: 'ratio',
          url: `${API}/Andel-under-16-med-en-innvandr-JnGas`,
          production: true,
        },
        {
          active: false,
          label: 'Historisk (antall)',
          id: 'innvandring_under16-en-innvandrerforelder_historisk',
          template: 'b',
          method: 'value',
          url: `${API}/Andel-under-16-med-en-innvandr-JnGas`,
          production: true,
        },
      ],
    },
    {
      size: 'small',
      heading: 'Under 16 år med to innvandrerforeldre',
      map: {
        labels: ['Færre innvandrere', 'Flere innvandrere'],
        scale: [0.05, 0.75],
        reverse: true,
        method: 'ratio',
        url: `${API}/Andel-under-16-med-to-innvandr-jVhZm`,
      },
      production: true,
      tabs: [
        {
          active: false,
          label: 'Andel',
          id: 'innvandring_under16-to-innvandrerforeldre_status',
          template: 'a',
          method: 'ratio',
          url: `${API}/Andel-under-16-med-to-innvandr-jVhZm`,
          production: true,
        },
        {
          active: false,
          label: 'Antall',
          id: 'innvandring_under16-to-innvandrerforeldre_status',
          template: 'a',
          method: 'value',
          url: `${API}/Andel-under-16-med-to-innvandr-jVhZm`,
          production: true,
        },
        {
          active: false,
          label: 'Historisk (andel)',
          id: 'innvandring_under16-to-innvandrerforeldre_historisk',
          template: 'b',
          method: 'ratio',
          url: `${API}/Andel-under-16-med-to-innvandr-Zgj32`,
          production: true,
        },
        {
          active: false,
          label: 'Historisk (antall)',
          id: 'innvandring_under16-to-innvandrerforeldre_historisk',
          template: 'b',
          method: 'value',
          url: `${API}/Andel-under-16-med-to-innvandr-Zgj32`,
          production: true,
        },
      ],
    },
  ],
  options: {
    kategori: 'Befolkning',
    tema: 'Personer med innvandrer&shy;bakgrunn',
    bgImage: `${baseUrl}/img/innvandring`,
    txtColor: 'rgb(245, 173, 165)',
  },
  related: ['folkemengde', 'befolkningsendringer', 'boligpriser'],
};
