import styles from './UsersList.module.scss';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {useNavigate} from 'react-router-dom';
import {fetchUsers} from '../../store/usersSlice.actions';

export const UsersList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.users.users);
  const status = useAppSelector((state) => state.users.status);
  const error = useAppSelector((state) => state.users.error);
  const sort = useAppSelector((state) => state.users.sort);

  const sortedUsers = [...users].sort((a, b) => {
    if (sort === 'city') {
      return a.address.city.localeCompare(b.address.city);
    } else if (sort === 'company') {
      return a.company.name.localeCompare(b.company.name);
    }
    return 0;
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const handleMoreInfoClick = (userId: number) => {
    navigate(`/profile/${userId}`);
  };

  let content;

  if (status === 'loading') {
    content = <h1>Загрузка...</h1>;
  } else if (status === 'succeeded') {
    const displayUsers = sortedUsers.length > 0 ? sortedUsers : users;
    content = (
      <>
        {displayUsers.map((user) => (
          <div key={user.id} className={styles.user}>
            <div className={styles.info}>
              <span>
                ФИО: <span className={styles.text}>{user.name}</span>
              </span>
              <span>
                Город: <span className={styles.text}>{user.address.city}</span>
              </span>
            </div>
            <div className={styles.companyAndButton}>
              <span>
                Компания:{' '}
                <span className={styles.text}>{user.company.name}</span>
              </span>
              <button
                className={styles.button}
                onClick={() => handleMoreInfoClick(user.id)}
              >
                Подробнее
              </button>
            </div>
          </div>
        ))}
      </>
    );
  } else if (status === 'failed') {
    content = <div>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.header}>Список пользователей</span>
      {content}
      <span className={styles.footer}>
        Найдено {users.length} пользователей
      </span>
    </div>
  );
};
