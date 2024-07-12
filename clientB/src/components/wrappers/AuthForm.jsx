import React from "react";
import CardWrapper from "./CardWrapper";
import { Button } from "../ui/button";
import { Form } from '../ui/form';

const AuthForm = ({ title, subtitle, submitBtnTxt, hook, children }) => {
    const { handleSubmit, form, isLoading, error } = hook();

    return (
        <div className="h-screen flex items-center justify-center gap-4">
            <CardWrapper
                title={title}
                subtitle={subtitle}
            >
                <Form {...form}>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {React.Children.map(children, child => (
                            React.cloneElement(child, { form })
                        ))}
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading ? (submitBtnTxt === "Login" ? 'Logging in...' : 'Registering...') : submitBtnTxt}
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    );
};

export default AuthForm;
