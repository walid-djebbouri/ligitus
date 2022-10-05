/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import {NbAuthJWTToken, NbAuthOAuth2JWTToken, NbAuthSimpleToken, NbPasswordAuthStrategy} from '@nebular/auth';
import { environment } from '../../environments/environment';

export const socialLinks = [
  {
    url: '',
    target: '_blank',
    icon: 'github',
  },
  {
    url: '',
    target: '_blank',
    icon: 'facebook',
  },
  {
    url: '',
    target: '_blank',
    icon: 'twitter',
  },
];

export const authOptions = {
  strategies: [
    NbPasswordAuthStrategy.setup({
      name: 'email',
      baseEndpoint: environment.apiUrl,
      token: {
        class: NbAuthJWTToken,
        key: 'token',
      },
      login: {
        endpoint: 'login',
        method: 'post',
      },
      register: {
        endpoint: '/auth/sign-up',
        method: 'post',
      },
      logout: {
        endpoint: 'sign-out',
        method: 'post',
      },
      requestPass: {
        endpoint: '/auth/request-pass',
        method: 'post',
      },
      resetPass: {
        endpoint: '/auth/reset-pass',
        method: 'post',
      },
      refreshToken: {
        endpoint: '/auth/refresh-token',
        method: 'post',
      },
    }),
  ],
  forms: {
    login: {
      socialLinks: socialLinks,
    },
    register: {
      socialLinks: socialLinks,
    },
    validation: {
      fullName: {
        required: true,
        minLength: 2,
        maxLength: 20,
      },
    },
  },
};
