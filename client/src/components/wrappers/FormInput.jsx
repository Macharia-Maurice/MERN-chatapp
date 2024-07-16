// FormInput.js
import {
    FormItem,
    FormLabel,
    FormMessage,
    FormField,
    FormControl
  } from '../ui/form';
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
              {type === "file" ? (
                <input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              ) : (
                <Input {...field} type={type} />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };
  
  export default FormInput;
  