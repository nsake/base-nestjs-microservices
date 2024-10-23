import { PaginationResponse } from '@common/responses';
import { PaginationDto } from '@common/dtos';

export type PaginateFunction = <T, K>(
  model: any,
  options: PaginationDto,
  args?: K,
) => Promise<PaginationResponse<T>>;

export const paginator = (): PaginateFunction => {
  return async (
    model,
    options: PaginationDto,
    args: any = { where: undefined },
  ) => {
    const { page, perPage } = options;

    const skip = page > 0 ? perPage * (page - 1) : 0;
    const [total, data] = await Promise.all([
      model.count({ where: args.where }),
      model.findMany({
        ...args,
        take: perPage,
        skip,
      }),
    ]);
    const lastPage = Math.ceil(total / perPage);

    return {
      data,
      meta: {
        total,
        lastPage,
        currentPage: page,
        perPage,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
      },
    };
  };
};
