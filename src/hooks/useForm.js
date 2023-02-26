import { useFormik } from "formik";
import { emailPasswordSchema } from "~/lib/utils/schema";

export const useForm = () => {
  const { handleChange, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: emailPasswordSchema,
    onSubmit: () => {},
  });

  return { handleChange, values, errors };
};
