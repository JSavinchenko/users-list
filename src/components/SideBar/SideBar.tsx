import styles from './SideBar.module.scss';
import {useAppDispatch} from '../../store/hooks';
import {setSort} from '../../store/usersSlice.reducers';

export const SideBar = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.wrapper}>
      <span>Сортировка</span>
      <button className={styles.btn} onClick={() => dispatch(setSort('city'))}>
        по городу
      </button>
      <button
        className={styles.btn}
        onClick={() => dispatch(setSort('company'))}
      >
        по компании
      </button>
    </div>
  );
};
