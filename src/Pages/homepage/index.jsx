import React from 'react';
import S from './homepage.module.scss';
import { motion } from 'framer-motion';
import { useGetPostsQuery } from '../../Redux/api';
import { Link, useNavigate } from 'react-router-dom';
import Comments from '../../Components/comments';
import Pagination from '../../Components/pagination';

const Home = () => {
  const navigate = useNavigate();
  const [showComments, setShowComments] = React.useState(false);
  const [loading, setLoading] = React.useState(false); //для задержки лоадера
  const dataLimit = 9;
  const [page, setPage] = React.useState(1);
  const [idPost, setIdPost] = React.useState(null);

  const { data = [], isLoading, isError } = useGetPostsQuery({ page, dataLimit });

  setTimeout(() => {
    setLoading(true);
  }, 1500);

  const showCommentsBlock = (id) => {
    setIdPost(id);
    setShowComments(!showComments);
  };

  if (isError) {
    navigate('*');
  }

  return (
    <div className={S.root_content}>
      {!loading ? (
        <>
          {Array(9)
            .fill()
            .map((_, index) => (
              <div key={index} className={S.postCardLoader}>
                <div className={S.loader}></div>
              </div>
            ))}
        </>
      ) : (
        data.map((post) => (
          <motion.div
            whileHover={{ y: -3 }}
            initial={{ opacity: 0, y: -50 }}
            exit={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            key={post.id}
            className={S.postCard}>
            <Link to="user">
              <img
                onClick={() => sessionStorage.setItem('userId', post.userId)}
                src="img/face.jpg"
                alt="Фото"
              />
            </Link>
            <button onClick={() => showCommentsBlock(post.id)}>
              Посмотреть <br /> комментарии
            </button>
            <div className={S.contentBox}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          </motion.div>
        ))
      )}
      <Comments showComments={showComments} setShowComments={setShowComments} idPost={idPost} />

      {!isLoading && <Pagination page={page} setPage={setPage} />}
    </div>
  );
};

export default Home;
