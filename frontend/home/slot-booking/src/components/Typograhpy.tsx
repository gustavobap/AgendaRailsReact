import React from 'react';
import colors, { ColorName } from './colors';


interface TypographyProps extends Omit<React.ComponentPropsWithRef<"span">, 'color'> {
  color?: ColorName
}

const renderTypography = (allProps: TypographyProps) => {
  const { color, ...props } = allProps;

  let colorProps = {}

  if (color) {
    colorProps = { style: { color: colors[color] } }
  }

  return (
    <span {...colorProps} {...props}>{allProps.children}</span>
  );
}

interface HeadProps extends TypographyProps {
  size: 'large' | 'medium' | 'small' | 'tiny'
}

export class Head extends React.Component<HeadProps> {

  static defaultProps = {
    size: 'small',
  };

  render() {
    const { className, size, ...props } = this.props;
    return renderTypography({
      className: `head ${size} ${className || ''}`,
      ...props
    })
  }
}

interface BodyProps extends TypographyProps {
  flavor?: 'spaced' | 'large';
}

export class Body extends React.Component<BodyProps> {

  static defaultProps = {
    flavor: '',
  };

  render() {
    const { className, flavor, ...props } = this.props;
    const classes = `text ${flavor} ${className || ''}`
    return renderTypography({
      className: classes,
      ...props
    })
  }
}

interface LabelProps extends React.ComponentPropsWithRef<"div">{

}

export class Label extends React.Component<LabelProps> {
  render() {
    const { children, ...props } = this.props;

    return (
      <div {...props}>
        {renderTypography({ className: 'label', children })}
      </div>
    )
  }
}

interface FieldDetailProps extends React.ComponentPropsWithRef<"div">{

}

export class FieldDetail extends React.Component<FieldDetailProps> {
  render() {
    const { children, ...props } = this.props;

    return (
      <div {...props}>
        {renderTypography({ className: 'field-detail', children })}
      </div>
    )
  }
}