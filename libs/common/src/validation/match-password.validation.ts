import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'MatchPasswords', async: false })
export class MatchPasswordValidation implements ValidatorConstraintInterface {
  validate(repeatPassword: string, args: ValidationArguments) {
    const dto = args.object as any;
    return dto.password === repeatPassword;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Passwords must match';
  }
}
