import { toast } from '@zerodevx/svelte-toast';

export const successToast = (message: string) =>
  toast.push(message, {
    theme: {
      '--toastBackground': 'green',
      '--toastColor': 'white',
      '--toastBarBackground': 'olive'
    }
  });

export const errorToast = (message: string) =>
  toast.push(message, {
    theme: {
      '--toastBackground': 'red',
      '--toastColor': 'white',
      '--toastBarBackground': 'olive'
    }
  });
