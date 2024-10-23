import {
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CurrentUser } from '@common/decorators';
import { UserDocument } from '@apps/user/src/user-app/schemas/user.schema';
import { Client, ClientProxy } from '@nestjs/microservices';
import { userClientOptions } from '@common/clients/user-client.options';
import { TMAInitDataGuard } from '@common/tma/guards/tma-init-data';
import { ExceptionsFilter } from '@common/filters/ExceptionFilter';

@UseGuards(TMAInitDataGuard)
@UseFilters(new ExceptionsFilter())
@Controller('user')
export class UserController {
  @Client(userClientOptions)
  client: ClientProxy;

  @Client(userClientOptions)
  operationsClient: ClientProxy;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get('wallet')
  getWallet(@CurrentUser() user: UserDocument) {
    return this.client.send('wallet', {
      user,
    });
  }

  @Get('get-currencies')
  getCurrencies() {
    return this.operationsClient.send('get-currencies', {});
  }

  @Post('verify-wallet-ton')
  async verifyTonWallet(
    @CurrentUser() user: UserDocument,
    // @Body(new SchemaValidationPipe(VerifyWalletWithTxIdDto))
    // payload: VerifyWalletWithTxIdDto,
  ) {
    return this.client.send('verify-wallet-ton', {
      user,
      // ...payload,
    });
  }

  @Delete('delete-wallet')
  async deleteWallet(@CurrentUser() user: UserDocument) {
    return this.client.send('delete-wallet', {
      user,
    });
  }

  // @Get('referrals')
  // async getReferrals(
  //   @CurrentUser() user: UserDocument,
  //   @TMAUser('id') telegramId: number,
  //   @Query(new SchemaValidationPipe(TPaginationOptionDto, ['sort']))
  //   query: TPaginationOption,
  // ) {
  //   const key = `referrals-${String(telegramId)}${String(query.page)}${String(query.pageSize)}`;

  //   const val = await this.cacheManager.get(key);

  //   if (val) {
  //     return val;
  //   }

  //   if (!val) {
  //     const response = await lastValueFrom(
  //       this.client.send('referrals', {
  //         user,
  //         query,
  //       }),
  //     );

  //     await this.cacheManager.set(key, response);

  //     return response;
  //   }
  // }
}
