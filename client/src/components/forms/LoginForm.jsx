import useLogin from "@/hooks/LoginHook";
import AuthForm from "../wrappers/AuthForm"
import FormInput from "../wrappers/FormInput"

const LoginForm = () => {
    return (
        <AuthForm
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

        </AuthForm>
    )
}

export default LoginForm
