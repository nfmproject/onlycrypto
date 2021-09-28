import * as React from 'react';
import { basicModalState } from '../state/modalStates';
import { useRecoilState } from 'recoil';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ModalWrapper = () => {
  // Get modal params from recoil store
  const [isVisible, setIsVisible] = useRecoilState(basicModalState);
  // const { handleOnClose } = useHideModal();
  if (!isVisible) {
    return null;
  }

  return (
    <div>
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </div>
  );
};
