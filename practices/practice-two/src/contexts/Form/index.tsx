import { ReactNode, Suspense, lazy, useCallback, useState } from 'react';

// Components
const Form = lazy(() => import('components/Form'));

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

      <Suspense>
        {form && (
          <Form
            value={form.formData}
            title={form.title}
            type={form.type}
            onClose={closeForm}
          />
        )}
      </Suspense>
    </FormContext.Provider>
  );
};

export default FormProvider;
