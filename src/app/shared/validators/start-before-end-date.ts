import { AbstractControl, ValidatorFn } from '@angular/forms';

export const startBeforeEndDate = (): ValidatorFn => {
  return (control: AbstractControl) => {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    if (!startDate || !endDate) {
      return null; 
    }

    if (startDate >= endDate) {
      return { startBeforeEndDate: true }; // Error if startDate is not before endDate
    }

    return null; 
  };
};
