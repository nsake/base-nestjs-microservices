import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { isJSON, validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ErrorConstants } from '../errors/exception.constants';

@Injectable()
export class SchemaValidationPipe<T> implements PipeTransform<any> {
  constructor(
    private metatype: Type<any>,
    private propToTransform?: string[],
  ) {}

  async transform(value: T): Promise<T> {
    if (this.propToTransform) {
      this.propToTransform.map((propertyName: string) => {
        let newProperty = propertyName;
        let isOptional = false;

        if (newProperty && newProperty.includes('?')) {
          isOptional = true;

          newProperty = newProperty.replace('?', '');
        }

        const keyOfProperty = newProperty as keyof T;
        const entityToParse = value[keyOfProperty] as string;

        if (!entityToParse && !isOptional) {
          console.log(`Can not find ${propertyName} query parameter`);

          throw new BadRequestException(
            `Can not find ${propertyName} query parameter`,
          );
        }

        if (!entityToParse && isOptional) {
          return;
        }

        if (!isJSON(entityToParse)) {
          throw new BadRequestException(
            `${entityToParse} contains invalid JSON `,
          );
        }

        value[keyOfProperty] = JSON.parse(entityToParse);
      });
    }

    const object = plainToClass(this.metatype, value);

    Object.entries(object).forEach(([key, value]) => {
      if (value === 'true' || value === 'false') {
        object[key] = value === 'true' ? true : false;
      }
    });

    const errors = await validate(object, { whitelist: true });

    if (errors.length > 0) {
      throw new HttpException(
        ErrorConstants.ErrorValidation,
        HttpStatus.BAD_REQUEST,
      );
    }

    return object;
  }
}
