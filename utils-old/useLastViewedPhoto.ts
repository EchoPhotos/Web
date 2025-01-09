import { createGlobalState } from "react-hooks-global-state";

interface State {
  photoToScrollTo: string | null
}

const initialState: State = { photoToScrollTo: null };
const { useGlobalState } = createGlobalState(initialState);

export const useLastViewedPhoto = () => {
  return useGlobalState("photoToScrollTo");
};
