import { ClientSession, Connection } from 'mongoose';

export const transaction = async <T>(
  connection: Connection,
  cb: (session: ClientSession) => Promise<T>,
): Promise<T> => {
  const session = await connection.startSession({
    defaultTransactionOptions: {
      retryWrites: true,
    },
  });

  return session
    .withTransaction(() => cb(session))
    .then(async (d) => {
      await session.commitTransaction();

      return d;
    })
    .catch(async (err) => {
      await session
        .abortTransaction()
        .catch(() => console.log('abort transaction twice'));

      await session.endSession();

      throw err;
    })
    .finally(() => session.endSession());
};
