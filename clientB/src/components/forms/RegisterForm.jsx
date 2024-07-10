import useRegister from "@/hooks/RegisterHook";
import AuthForm from "../wrappers/AuthForm";
import FormInput from "../wrappers/FormInput";

const RegisterForm = () => {
  return (
    <AuthForm
      title={"Register"}
      subtitle={"Welcome to the Community!"}
      submitBtnTxt={"Register"}
      hook={useRegister}
    >

      <FormInput
        name={"first_name"}
        label={"First Name"}
        type={"text"}
      />

      <FormInput
        name={"last_name"}
        label={"Last Name"}
        type={"text"}
      />

      <FormInput
        name={"email"}
        label={"Email"}
        type={"email"}
      />

      <FormInput
        name={"password"}
        label={"Password"}
        type={"password"}
      />

      <FormInput
        name={"confirm_password"}
        label={"Confirm Password"}
        type={"password"}
      />

    </AuthForm>
  )
}

export default RegisterForm