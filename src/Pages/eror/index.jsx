import { useNavigate } from 'react-router-dom';
import S from './eror.module.scss';

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className={S.root_content}>
      <div className={S.root_content_Box}>
        <h3>Такой страницы не существует</h3>
        <button onClick={() => navigate('/')}>Вернуться</button>
      </div>
    </div>
  );
};

export default Error;
