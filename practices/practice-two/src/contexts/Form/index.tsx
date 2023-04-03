import { ReactNode, useState } from 'react';

// Components
import { Form } from 'components';

//Context
import { FormContext, StateType } from 'contexts/Form/context';

const FormProvider = ({ children }: { children: ReactNode }) => {
  const [form, setForm] = useState<StateType>(undefined);

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
          onClose={() => setForm(undefined)}
        />
      )}
    </FormContext.Provider>
  );
};

export default FormProvider;
