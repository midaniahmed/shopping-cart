import { Button as AntButton } from 'antd';
import { ButtonColorType, ButtonShape, ButtonType, ButtonVariantType } from 'antd/es/button';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { CSSProperties } from 'react';

interface ButtonProps {
  label?: string;
  type?: ButtonType;
  color?: ButtonColorType;
  variant?: ButtonVariantType;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  shape?: ButtonShape;
  size?: SizeType;
  disabled?: boolean;
  danger?: boolean;
  block?: boolean;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

export const Button: React.FC<ButtonProps> = ({ onClick, danger, size, style, label, block, disabled, shape, type, icon }) => {
  return (
    <AntButton style={style} icon={icon} size={size} onClick={onClick} danger={danger} block={block} shape={shape} type={type} disabled={disabled}>
      {label}
    </AntButton>
  );
};
