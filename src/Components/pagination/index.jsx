import React from 'react';
import S from './pagination.module.scss';

const Pagination = (params) => {
  const [active, setActive] = React.useState(1);
  const { setPage } = params;

  const onClickNumber = (e) => {
    setActive(e.target.value);
    setPage(e.target.value);
  };

  return (
    <div className={S.pagination}>
      <ul>
        {[...Array(10)].map((_, i) => (
          <li
            key={i}
            className={active === i + 1 ? S.active : ''}
            onClick={(e) => onClickNumber(e)}
            value={i + 1}>
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
