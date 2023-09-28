import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Md5 } from 'ts-md5';
import cssModule from './index.module.scss';
import { triggerLoginAction } from '@/redux/actions/user';

type ILoginFormValue = {
  username: string;
  password: string;
};

const MESSAGE = defineMessages({
  login: {
    id: 'Login_index_402d19e5',
    defaultMessage: '登录',
  },
  password_placeholder: {
    id: 'Login_index_e39ffe99',
    defaultMessage: '请输入密码',
  },
  username_placeholder: {
    id: 'Login_index_08b1fa13',
    defaultMessage: '请输入用户名',
  },
  password_rule: {
    id: 'Login_index_7c8294b3',
    defaultMessage: '请输入8~30位的数字或字母',
  },
  username_label: {
    id: 'Login_index_819767ad',
    defaultMessage: '用户名',
  },
  password_label: {
    id: 'Login_index_a8105204',
    defaultMessage: '密码',
  },
});

const Login: React.FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const intl = useIntl();

  // 提交
  const onFinish = (values: ILoginFormValue) => {
    if (values) {
      dispatch(
        triggerLoginAction.request({
          navigate,
          name: values.username,
          password: Md5.hashStr(values.password),
        })
      );
    }
  };

  // 校验密码
  const validatePassword = (_: any, value: string) => {
    const reg = /(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}/;
    if (!value?.length) {
      return Promise.reject(
        new Error(intl.formatMessage(MESSAGE.password_placeholder))
      );
    } else if (!reg.test(value)) {
      return Promise.reject(
        new Error(intl.formatMessage(MESSAGE.password_rule))
      );
    }
    return Promise.resolve();
  };

  return (
    <div className={classNames(cssModule.container)}>
      <div className={classNames(cssModule.mainWrap)}>
        <div className={classNames(cssModule.mainHeader)}>
          <svg className="icon" aria-hidden="true" width={64} height={64}>
            <use xlinkHref="#icon_Logo" />
          </svg>
          <h2 className={classNames(cssModule.mainTitle)}>
            {intl.formatMessage(MESSAGE.login)}
          </h2>
        </div>
        <Form
          className={classNames(cssModule.mainForm)}
          labelCol={{ span: 4 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: intl.formatMessage(MESSAGE.username_placeholder),
              },
            ]}
          >
            <Input
              className={`${classNames(cssModule.formInput)}`}
              type="text"
              placeholder={intl.formatMessage(MESSAGE.username_label)}
              autoComplete="on"
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, validator: validatePassword }]}
          >
            <Input
              className={`${classNames(cssModule.formInput)}`}
              type="password"
              placeholder={intl.formatMessage(MESSAGE.password_label)}
              autoComplete="on"
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Button
              className={classNames(cssModule.formSubmit)}
              type="primary"
              htmlType="submit"
            >
              {intl.formatMessage(MESSAGE.login)}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
