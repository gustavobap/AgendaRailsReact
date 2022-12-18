import { isEmpty } from 'lodash';
import React from 'react';
import { FieldDetail, Label } from './Typograhpy';
import { dateValidator, defaultValidator, numberValidator, Validator } from './validators';


type DataType = string | number | Date

interface Props<T extends DataType> extends Omit<React.ComponentPropsWithoutRef<"div">, 'onChange'> {
    label?: string
    value: T
    disabled: boolean
    onChange?: (value: T) => void
}

interface State {
    valid: boolean,
    value: string,
    validator: Validator<DataType>
}

class TextInput<T extends DataType> extends React.Component<Props<T>, State> {

    static defaultProps = {
        disabled: false
    }

    constructor(props: Props<T>) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        let validator: Validator<T>;

        if(typeof props.value === "number"){
            validator = numberValidator as unknown as Validator<T>;
        }else if(props.value instanceof Date){
            validator = dateValidator as unknown as Validator<T>;
        }else {
            validator = defaultValidator as unknown as Validator<T>;;
        }

        this.state = {
            valid: true,
            value: validator.toString(this.props.value),
            validator: validator as unknown as Validator<DataType>
        }
    }

    handleChange(event: any) {
        const { valid, value, parsed } = this.state.validator.validate(event.target.value)
        this.setState({valid, value})
        this.props.onChange && valid && this.props.onChange(parsed as T)
    }

    render() {
        const {label, value, disabled, className, onChange, ...props} = this.props;
        
        const classes = ['field-container']
        !isEmpty(className) && classes.push(className!);
        disabled && classes.push('disabled');
        !this.state.valid && classes.push('invalid')

        const inputProps = {
            className: 'field-input',
            value: this.state.value,
            onChange: this.handleChange
        }
        disabled && Object.assign(inputProps, {disabled})
        
        return (
            <div {...props} className={classes.join(' ')}>
                {label && <Label>{label}</Label>}
                <input {...inputProps} />
                {!this.state.valid && <FieldDetail>Invalid input</FieldDetail>}
            </div>
        );
    }
}

export default TextInput;