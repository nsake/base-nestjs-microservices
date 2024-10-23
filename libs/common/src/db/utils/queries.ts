export const queriesLookups = {
  allTimeStatisticFunc: () => ({
    preserveNullAndEmptyArrays: true,
    from: 'every_user_all_time_statistic',
    localField: '_id',
    foreignField: 'user',
    as: 'allTimeStatistic',
    pipeline: [
      {
        $group: {
          _id: '$user',
          statistic: { $push: '$$ROOT' },
        },
      },
      {
        $project: {
          _id: 1,
          statistic: 1,
        },
      },
    ],
  }),

  category: {
    preserveNullAndEmptyArrays: true,
    from: 'categories',
    localField: 'category',
    foreignField: '_id',
    as: 'category',
    pipeline: [
      // {
      //   $where: {
      //     isRemoved: false,
      //   },
      // },
      {
        $project: {
          _id: 1,
          id: '$_id',
          name: 1,
          label: 1,
          icon: 1,
          type: 1,
        },
      },
    ],
  },
  balance: {
    from: 'balances',
    localField: '_id',
    foreignField: 'user',
    as: 'balance',
    preserveNullAndEmptyArrays: true,
    pipeline: [
      {
        $project: {
          id: '$_id',
          current: 1,
          total: 1,
        },
      },
    ],
  },
};
