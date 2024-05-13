import { createGlobalState } from "react-hooks-global-state";


interface LastPhotoViewedState {
  photoToScrollTo?: string
}

const initialState: LastPhotoViewedState = { photoToScrollTo: undefined };
const { useGlobalState } = createGlobalState(initialState);

export const useLastViewedPhoto = () => {
  return useGlobalState("photoToScrollTo");
};
