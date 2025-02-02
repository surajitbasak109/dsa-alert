import clsx from 'clsx';
import { ChangeEvent } from 'react';

type CheckBoxProp = {
  onChange?: (checked: boolean, element: HTMLElement | null) => void;
  id?: string;
  name?: string;
  checked?: boolean;
};

const CheckBox: React.FC<CheckBoxProp> = ({
  onChange = () => {},
  name = undefined,
  checked = false,
  ...rest
}) => {
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked, e.target);
  };

  return (
    <label className="box-border absolute top-0 flex items-center justify-center w-full h-full pr-1 border-r border-transparent cursor-pointer start-0">
      <span className="relative size-4">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 16 16"
          aria-hidden="true"
          focusable="false">
          <rect
            className={clsx(
              `dsa-alert-styled-box`,
              checked && 'dsa-alert-styled-box-checked'
            )}
            x="1"
            y="1"
            rx="2"
            ry="2"
            width="14"
            height="14"></rect>
          {checked && (
            <polyline
              className="dsa-alert-styled-line"
              points="3.5,8 7,11 12,4"></polyline>
          )}
        </svg>
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={checked}
          name={name}
          {...rest}
        />
      </span>
    </label>
  );
};

export default CheckBox;
