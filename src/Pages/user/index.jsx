import React from 'react';
import S from './user.module.scss';
import { useGetDataUserQuery } from '../../Redux/api';
import Card from '../../Components/card';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Users = () => {
  const navigate = useNavigate();

  const userId = sessionStorage.getItem('userId');

  const [loader, setLoader] = React.useState(false);
  const [buttonShow, setButtonShow] = React.useState(false);

  setInterval(() => {
    setLoader(true);
  }, 1500);
  setInterval(() => {
    setButtonShow(true);
  }, 2500);

  const { data = [], isError } = useGetDataUserQuery(userId);

  if (isError) {
    navigate('*');
  }

  return (
    <div className={S.root_content}>
      <div key={data.id} className={S.infoBlock}>
        <div className={S.titleBlock}>
          <h2>{data.name}</h2>
          <p>{data.email}</p>
          <p>{data.phone}</p>
        </div>
      </div>
      {buttonShow && (
        <Link to="/">
          <motion.div
            className={S.buttonBack}
            initial={{ opacity: 0, x: 50 }}
            exit={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}>
            <button>Обратно</button>
          </motion.div>
        </Link>
      )}

      <div className={S.postsBlock}>
        <h2>Все посты:</h2>
        <div className={S.postsList}>
          {loader ? (
            <Card userId={userId} />
          ) : (
            Array(6)
              .fill()
              .map((_, index) => (
                <div key={index} className={S.CardLoader}>
                  <div className={S.loader}></div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
