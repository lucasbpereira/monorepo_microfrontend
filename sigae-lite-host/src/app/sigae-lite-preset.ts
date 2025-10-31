import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura'; 

const SigaeLitePreset = definePreset(Aura, {
  semantic: {
    primary: {
      500: '#3B82F6', 
      600: '#3074e0', 
      700: '#235cb8ff'
    }
  },
  components: {
    button: {
      root: {
        paddingY: '1.1875rem', 
        paddingX: '1rem'
      }
    },
    datatable: {
      header: {
        padding: '.8475rem 1rem',
        background: '#F9FAFB',
        borderWidth: '0 0 1px 0'
      },
      headerCell: {
        padding: '.8475rem 1rem',
        background: '#F9FAFB'
      },
      bodyCell: {
        padding: '.1275rem 1rem',
        borderColor: '#E5E7EB'
      },
      footer: {
        padding: '.8475rem 1rem',
        background: '#F9FAFB',
        borderWidth: '0 0 1px 0'
      },
      footerCell: {
        padding: '.8475rem 1rem',
        background: '#F9FAFB'
      }
    }
  }
});

export default SigaeLitePreset;

