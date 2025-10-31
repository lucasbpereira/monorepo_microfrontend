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
        background: '#F9FAFB'
      }
    }
  }
});

export default SigaeLitePreset;