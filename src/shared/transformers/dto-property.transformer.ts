import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectType } from 'typeorm';

@Injectable()
export class TrimBodyPipe implements PipeTransform {
  transform<T extends Record<string, any>>(
    requestParams: T,
    { type }: ArgumentMetadata,
  ): T {
    if (!type || type !== 'body') {
      return requestParams;
    }

    const trimValues = (acc: ObjectType<T>, [key, value]: [string, any]) => ({
      ...acc,
      [key]: typeof value === 'string' ? value.trim() : value,
    });

    return Object.entries(requestParams).reduce(
      trimValues,
      {} as { [key: string]: any },
    ) as T;
  }
}
