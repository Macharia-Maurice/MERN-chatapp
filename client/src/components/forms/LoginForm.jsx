import FormWrapper from "../wrappers/FormWrapper";
import FormInput from "../wrappers/FormInput";
import useLogin from "@/hooks/LoginHook";

const LoginForm = () => {
    return (
        <FormWrapper
            title={"Login"}
            subtitle={"Please enter your credentials"}
            submitBtnTxt={"Login"}
            hook={useLogin}
        >

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

        </FormWrapper>
    )
}

export default LoginForm
