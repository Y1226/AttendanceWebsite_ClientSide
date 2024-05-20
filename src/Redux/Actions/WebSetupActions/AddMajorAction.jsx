export const FillSelectedMajorsData = (value) => {
    return {type: 'Fill-Selected-Majors-Data', payload: value}
}

export const FillCurrentComponent = (value) => {
    return {type: 'Fill-Current-Component', payload: value}
}

export const FillMajorsWithoutDistinct = (value) => {
    return {type: 'Fill-Majors-Without-Distinct', payload: value}
}