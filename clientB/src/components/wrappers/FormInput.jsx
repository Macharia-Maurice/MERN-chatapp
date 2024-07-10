import {
    FormItem,
    FormLabel,
    FormMessage,
    FormField,
    FormControl
} from '../ui/form'
import { Input } from "../ui/input";

const FormInput = ({ name, label, type, form }) => {
    return (
        <FormField

            control={form.control}
            name={name}

            render={({ field }) => (

                <FormItem>
                    <FormLabel>{label}</FormLabel>

                    <FormControl>
                        <Input {...field} type={type} />
                    </FormControl>

                    <FormMessage />

                </FormItem>
            )}
        />
    )
}

export default FormInput