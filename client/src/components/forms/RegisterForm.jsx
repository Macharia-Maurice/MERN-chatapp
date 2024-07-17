import FormWrapper from "../wrappers/FormWrapper";
import FormInput from "../wrappers/FormInput";
import useRegister from "@/hooks/RegisterHook";

const RegisterForm = () => {
  return (
    <FormWrapper
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

    </FormWrapper>
  )
}

export default RegisterForm