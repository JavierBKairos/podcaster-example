import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';

const Error = () => {
  const navigate = useNavigate();


  return (
    <>
      <Header navigate={navigate} />
     
      <p>No se pudieron cargar los datos del podcast.</p>
     
    </>
  );
};

export default Error;
