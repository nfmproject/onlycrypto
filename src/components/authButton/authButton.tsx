import CeramicAuth from '../../ceramic';
import { Button } from '@mui/material';

function AuthButton({ ...props }: any) {
  const ceramic = CeramicAuth();
  return <Button onClick={ceramic.authenticate}>{ceramic.authState}</Button>;
}


export default AuthButton;
