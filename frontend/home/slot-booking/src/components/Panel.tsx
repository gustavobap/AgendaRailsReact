import { isEmpty } from 'lodash';
import React from 'react';


export interface PanelProps extends React.ComponentPropsWithoutRef<"div"> {
  flavor: 'neutral' | 'light' | 'dark' | 'main'
}

class Panel extends React.Component<PanelProps> {

  static defaultProps = {
    flavor: 'neutral',
  };

  render() {
    const { className, ...props } = this.props;
    
    const classes = ['panel']
    !isEmpty(className) && classes.push(className!);
    classes.push(this.props.flavor);

    return (
      <div className={classes.join(' ')} {...props}>{this.props.children}</div>
    );
  }
}

export default Panel;