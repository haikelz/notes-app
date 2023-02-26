import { useFormik } from "formik";
import { signInWithPasswordSchema } from "~/lib/utils/schema";
import supabase from "~/lib/utils/supabase";

const ResetPassword = () => {
  const { values, errors, handleChange } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: signInWithPasswordSchema,
    onSubmit: () => {},
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error } = await supabase.auth.updateUser({
      email: values.email,
      password: values.password,
    });
    if (error) throw error;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="rounded-sm border-2 border-blue-500"
          type="email"
          name="email"
          onChange={handleChange}
          value={values.email}
        />
        <span>{errors.email}</span>
        <input
          className="rounded-sm border-2 border-blue-500"
          type="password"
          name="password"
          onChange={handleChange}
          value={values.password}
        />
        <span>{errors.password}</span>
        <button type="submit" aria-label="submit data">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
