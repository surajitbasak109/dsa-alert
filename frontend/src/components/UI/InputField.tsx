type InputFieldProps = {
  label: string;
  name: string;
  id: string;
  type: 'text' | 'email' | 'number' | 'password' | 'tel' | 'url';
  placeholder: string;
  defaultValue?: string;
  required?: boolean;
  inputClassName?: string;
  wrapperClassName?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  id,
  type = 'text',
  placeholder,
  defaultValue = '',
  required = false,
  inputClassName = '',
  wrapperClassName = ''
}) => {
  inputClassName = `text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-50 border border-gray-30 ${inputClassName}`;
  wrapperClassName = `mb-5 ${wrapperClassName}`;
  return (
    <fieldset className={wrapperClassName}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-90">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={inputClassName}
        required={required}
      />
    </fieldset>
  );
};

export default InputField;
