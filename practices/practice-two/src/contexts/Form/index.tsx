import { ReactNode, useCallback, useState } from 'react';

// Components
import { Form } from 'components';

//Context
import { FormContext, StateType } from 'contexts/Form/context';

const FormProvider = ({ children }: { children: ReactNode }) => {
  const [form, setForm] = useState<StateType>(undefined);

  const closeForm = useCallback(() => setForm(undefined), []);

  return (
    <FormContext.Provider
      value={{
        dispatch: setForm,
      }}
    >
      {children}

      {form && (
        <Form
          value={form.formData}
          title={form.title}
          type={form.type}
          onClose={closeForm}
        />
      )}
    </FormContext.Provider>
  );
};

export default FormProvider;
