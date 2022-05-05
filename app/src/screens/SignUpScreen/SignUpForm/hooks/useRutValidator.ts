/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { FormikContextType } from 'formik';
import useRut from 'use-rut';
import { useMessages } from '../SignUpFormMessages';
import { SignUpData } from 'providers/Auth/models/SignUpData';

export const useRutValidator = (formik: FormikContextType<SignUpData>) => {
  const messages = useMessages();

  const [rut, valid, setRut] = useRut() as [
    string,
    boolean,
    (rut: string) => void,
  ];

  useEffect(() => {
    formik.setFieldValue('rut', rut, false);
    formik.setFieldError('rut', !valid ? messages.rutError : undefined);
  }, [rut, valid]);

  useEffect(() => {
    rut !== formik.values.rut && setRut(formik.values.rut);
  }, [formik.values.rut]);
};
