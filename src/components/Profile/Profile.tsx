import {useEffect, useState} from 'react';
import styles from './Profile.module.scss';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {RootState} from '../../store/store';
import {useParams} from 'react-router-dom';
import {updateUser} from '../../store/usersSlice.reducers';

export const Profile = () => {
  const dispatch = useAppDispatch();
  const [isEditable, setIsEditable] = useState(false);
  const {userId} = useParams<{userId: string}>();
  const [errors, setErrors] = useState<{[key: string]: boolean}>({});

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    street: '',
    city: '',
    zipcode: '',
    phone: '',
    website: '',
    comment: '',
  });

  const user = useAppSelector((state: RootState) =>
    state.users.users.find((user) => user.id === Number(userId)),
  );

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        username: user.username,
        email: user.email,
        street: user.address.street,
        city: user.address.city,
        zipcode: user.address.zipcode,
        phone: user.phone,
        website: user.website,
        comment: user.comment || '',
      });
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const handleEditClick = () => {
    if (isEditable) {
      if (user) {
        setFormData({
          name: user.name,
          username: user.username,
          email: user.email,
          street: user.address.street,
          city: user.address.city,
          zipcode: user.address.zipcode,
          phone: user.phone,
          website: user.website,
          comment: user.comment || '',
        });
      }
      setErrors({});
    }
    setIsEditable(!isEditable);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: !formData.name,
      username: !formData.username,
      email: !formData.email,
      street: !formData.street,
      city: !formData.city,
      zipcode: !formData.zipcode,
      phone: !formData.phone,
      website: !formData.website,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      if (user) {
        console.log('Submitted data:', formData);
        dispatch(updateUser({...user, ...formData, comment: formData.comment}));
        setIsEditable(false);
        setErrors({});
      } else {
        console.error('Пользователь не найден');
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span>Профиль пользователя</span>
        <button className={styles.editBtn} onClick={handleEditClick}>
          {isEditable ? 'Отмена' : 'Редактировать'}
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.info}>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              type='text'
              disabled={!isEditable}
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? styles.error : ''}
            />
          </div>
          <div className={styles.formGroup}>
            <label>User name</label>
            <input
              type='text'
              disabled={!isEditable}
              name='username'
              value={formData.username}
              onChange={handleInputChange}
              className={errors.username ? styles.error : ''}
            />
          </div>
          <div className={styles.formGroup}>
            <label>E-mail</label>
            <input
              type='email'
              disabled={!isEditable}
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? styles.error : ''}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Street</label>
            <input
              type='text'
              disabled={!isEditable}
              name='street'
              value={formData.street}
              onChange={handleInputChange}
              className={errors.street ? styles.error : ''}
            />
          </div>
          <div className={styles.formGroup}>
            <label>City</label>
            <input
              type='text'
              disabled={!isEditable}
              name='city'
              value={formData.city}
              onChange={handleInputChange}
              className={errors.city ? styles.error : ''}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Zip code</label>
            <input
              type='text'
              disabled={!isEditable}
              name='zipcode'
              value={formData.zipcode}
              onChange={handleInputChange}
              className={errors.zipcode ? styles.error : ''}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Phone</label>
            <input
              type='text'
              disabled={!isEditable}
              name='phone'
              value={formData.phone}
              onChange={handleInputChange}
              className={errors.phone ? styles.error : ''}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Website</label>
            <input
              type='text'
              disabled={!isEditable}
              name='website'
              value={formData.website}
              onChange={handleInputChange}
              className={errors.website ? styles.error : ''}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Comment</label>
            <textarea
              disabled={!isEditable}
              name='comment'
              value={formData.comment}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button
          className={styles.submitBtn}
          type='submit'
          disabled={!isEditable}
        >
          Отправить
        </button>
      </form>
    </div>
  );
};
