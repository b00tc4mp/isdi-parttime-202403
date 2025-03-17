import { useCallback } from 'react';
import { create } from 'zustand';

export const useControllerStore = create(set => ({
   abortController: null,

   // Sets a new abort controller
   setAbortController: controller => set({ abortController: controller })
}));

export const useAbortController = () => {
   const abortController = useControllerStore(state => state.abortController);
   const setAbortController = useControllerStore(state => state.setAbortController);

   const abortCurrentAbortController = useCallback(() => {
      if (abortController) abortController.abort();
   }, [abortController]);

   const createNewAbortController = useCallback(() => {
      const controller = new AbortController();
      setAbortController(controller);

      return controller; // Return the new controller for immediate use
   }, [setAbortController]);

   return { abortCurrentAbortController, createNewAbortController };
};
