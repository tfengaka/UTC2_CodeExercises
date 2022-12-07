import React from 'react';
import styles from './EditExercise.module.scss';
import Button from 'components/Button';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const metadataValidation = Yup.object({
  output: Yup.string().required(),
  time: Yup.string().required(),
  point: Yup.string().required(),
});

const TestCaseInput = ({ setIsAddTestCase, pushTestCase }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(metadataValidation),
    mode: 'onSubmit',
  });
  const submitTestCase = (value) => {
    pushTestCase((prev) => [...prev, value]);
    setIsAddTestCase(false);
  };
  return (
    <div className={styles.testcase}>
      <h3 className="course title">Test case mới</h3>
      <div className={styles.testcase_wrapper}>
        <form autoComplete="off" onSubmit={handleSubmit(submitTestCase)}>
          <div className={styles.testcase_item}>
            <span className="course title">Đầu vào:</span>
            <input type="text" className="input_control" placeholder="Dữ liệu vào..." {...register('input')} />
          </div>
          <div className={styles.testcase_item}>
            <span className="course title">Kết quả mong muốn:</span>
            <input
              type="text"
              className={`input_control ${errors?.output ? 'error' : ''}`}
              placeholder="Kết quả..."
              {...register('output')}
            />
          </div>
          <div className={styles.testcase_item_flex}>
            <div className={styles.testcase_item_wrapper}>
              <span className="course title">Thời gian chạy tối đa(ms):</span>
              <input
                type="text"
                className={`input_control ${errors?.time ? 'error' : ''}`}
                placeholder="Thời gian chạy..."
                {...register('time')}
              />
            </div>
            <div className={styles.testcase_item_wrapper}>
              <span className="course title">Điểm số:</span>
              <input
                type="text"
                className={`input_control ${errors?.point ? 'error' : ''}`}
                placeholder="Điểm số..."
                {...register('point')}
              />
            </div>
          </div>
          <Button type="submit" size="full" backgroundColor="green">
            Xác nhận
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TestCaseInput;
