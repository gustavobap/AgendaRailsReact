import { isEmpty, isNull } from 'lodash';
import React from 'react';


export interface PanelProps extends React.ComponentPropsWithoutRef<"div"> {
  flavor: 'available' | 'booked'
}

class Tag extends React.Component<PanelProps> {

  render() {
    const { className, ...props } = this.props;
    
    const classes = ['tag']
    !isEmpty(className) && classes.push(className!);
    classes.push(this.props.flavor);

    return (
      <div className={classes.join(' ')} {...props}>{this.props.children}</div>
    );
  }
}

export default Tag;