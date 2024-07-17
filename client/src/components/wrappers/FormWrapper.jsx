import React from "react";
import CardWrapper from "./CardWrapper";
import { Button } from "../ui/button";
import { Form } from '../ui/form';

const FormWrapper = ({ title, subtitle, submitBtnTxt, hook, children }) => {
    const { handleSubmit, form, isLoading, error } = hook();

    const getButtonText = () => {
        if (isLoading) {
          if (submitBtnTxt === "Login") {
            return "Logging in...";
          } else if (submitBtnTxt === "Register") {
            return "Registering...";
          } else if (submitBtnTxt === "Update") {
            return "Saving...";
          }
        }
        return submitBtnTxt;
      };

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
                            {getButtonText()}
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    );
};

export default FormWrapper;
