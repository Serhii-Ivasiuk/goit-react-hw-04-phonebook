// Libs
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// React components
// Styled components

const initialValues = { name: '', number: '' };

const createValidationSchema = () => {
  const nameRegExp =
    /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
  const numberRegExp =
    /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

  return Yup.object().shape({
    name: Yup.string()
      .matches(nameRegExp, 'Invalid name.')
      .required('Name is required'),

    number: Yup.string()
      .matches(numberRegExp, 'Invalid phone.')
      .required('Number is required'),
  });
};

export const ContactForm = ({ onAddContact }) => {
  console.log(onAddContact);

  const handleSubmit = (values, actions) => {
    const { resetForm } = actions;

    onAddContact(values);
    resetForm();
  };

  const validationSchema = createValidationSchema();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form autoComplete="off">
        <label>
          Name
          <Field
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <ErrorMessage name="name" />
        </label>
        <br />
        <label>
          Number
          <Field
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <ErrorMessage name="number" />
        </label>
        <br />
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};
