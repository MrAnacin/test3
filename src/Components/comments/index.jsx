import React from 'react';
import S from './comments.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetCommentsQuery } from '../../Redux/api';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const CommentsBox = (params) => {
  const navigate = useNavigate();
  const { showComments, idPost, setShowComments } = params;
  const [loader, setLoader] = React.useState(false);

  const { data = [], isError } = useGetCommentsQuery(idPost);

  if (isError) {
    navigate('*');
  }

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: 500 },
  };

  if (showComments) {
    setInterval(() => {
      setLoader(true);
    }, 1500);
  }

  return (
    <AnimatePresence initial={false}>
      <motion.div
        animate={showComments ? 'open' : 'closed'}
        variants={variants}
        className={S.commentBox}>
        <div className={loader ? `${S.comments}` : `${S.loaderActive}`}>
          {loader && (
            <AiOutlineCloseCircle
              onClick={() => setShowComments(false)}
              className={S.closeButton}
            />
          )}
          {!loader ? (
            <div className={S.loader}></div>
          ) : (
            data.map((comment) => (
              <div key={comment.id} className={S.comments_content}>
                <h3>{comment.email}</h3>
                <p>{comment.body}</p>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommentsBox;