import React from 'react';
import { IconName, Icons } from './icons';

interface ButtonProps extends React.ComponentPropsWithRef<"div"> {
  iconBefore?: IconName,
  iconAfter?: IconName,
  flavor: 'primary' | 'warning' | 'black' | 'night' | 'day' | 'gray' | 'link' | 'icon',
}

class Button extends React.Component<ButtonProps> {

  static defaultProps = {
    flavor: 'primary',
  };

  render() {
    const { className, iconBefore, iconAfter, flavor, ...props } = this.props;
    let classes = `btn ${className || ''} ${flavor} ${iconBefore ? 'icon-before' : ''} ${iconAfter ? 'icon-after' : ''}`
    return (
      <div className={classes} {...props}>
        {iconBefore && Icons[iconBefore]}
        {this.props.children}
        {iconAfter && Icons[iconAfter]}
      </div>
    );
  }
}

export default Button;