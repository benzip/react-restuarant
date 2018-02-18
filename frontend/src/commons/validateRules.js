export const ruleRequired = value => (value ? undefined : `This field is required`);

export const ruleNumber = value => (value && isNaN(Number(value)) ? "Must be a number" : undefined);

export const ruleMoreThanZero = value => (value && value <= 0 ? "Should more than zero (0)" : undefined);
