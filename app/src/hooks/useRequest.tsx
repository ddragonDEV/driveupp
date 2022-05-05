import React from 'react';
import { defineMessages } from 'providers/Language';
import { FormattedMessages } from 'providers/Language/models/FormattedMessages';
import { useLoader } from 'providers/Loader';
import _ from 'lodash';
import { useModal } from 'providers/Modal';
import { InfoModal } from 'components/InfoModal';

const useDefaultMessages = defineMessages({
  404: {
    en: 'Resource not found',
    es: 'Recurso no encontrado',
  },
  409: {
    en: 'Duplicate record',
    es: 'El registro ya existe',
  },
  500: {
    en: 'An error has occured on the server',
    es: 'Ha ocurrido un problema en el servidor',
  },
  401: {
    en: 'Wrong credentials',
    es: 'Credenciales incorrectas',
  },
  400: {
    en: 'The sent data has errors',
    es: 'Los datos enviados contienen errores',
  },
  error: {
    en: 'An error has occured',
    es: 'Ha ocurrido un error',
  },
  accept: {
    en: 'Accept',
    es: 'Aceptar',
  },
});

export const useRequest = <T, U>(
  request: (props: T) => Promise<U>,
  config?: {
    customMessages?: FormattedMessages<string>;
    showLoader?: boolean;
    showErrorModal?: boolean;
  },
): ((props: T) => Promise<U | undefined>) => {
  const {
    customMessages = {},
    showLoader = true,
    showErrorModal = true,
  } = config || {};

  const loader = useLoader();
  const modal = useModal();
  const defaultMessages = useDefaultMessages();
  const messages = _.defaultsDeep(customMessages, defaultMessages);

  return async (props: T) => {
    showLoader && loader.handleShow();

    try {
      const response = await request(props);

      showLoader && loader.handleHide();

      return response;
    } catch (_code) {
      showLoader && loader.handleHide();

      const code = _code as number;

      showErrorModal &&
        modal.handleOpen({
          content: (
            <InfoModal
              title={messages[code in messages ? code : 'error']}
              buttonText={messages.accept}
            />
          ),
        });
      console.log('request error', JSON.stringify(_code, null, 3));
    }
  };
};
