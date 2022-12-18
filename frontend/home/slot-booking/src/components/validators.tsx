import { toNumber, toString } from "lodash"
import { formatDateInput, parseDate } from "./helper"

export interface Validator<T> {
    validate: (value: string) => {
        valid: boolean
        value: string
        parsed: T
    }

    toString: (parsed: T) => string
}

export const numberValidator: Validator<number> = {
    validate: (value: string) => {
        const parsed = toNumber(value);
        return {
            valid: !isNaN(parsed) && parsed > 0&& parsed < 10079,
            parsed: parsed,
            value
        }
    },

    toString: (parsed: number) => toString(parsed)
}

export const dateValidator: Validator<Date> = {
    validate: (value: string) => {
        const parsed = parseDate(value)
        return {
            valid: parsed.isValid(),
            parsed: parsed.toDate(),
            value
        }
    },
    toString: (parsed: Date) => formatDateInput(parsed as Date)
}

export const defaultValidator: Validator<string> = {
    validate: (value: string) => {
        return {
            valid: true,
            parsed: value,
            value
        }
    },
    toString: (parsed: string) => {  
        return toString(parsed);
    }                    
}