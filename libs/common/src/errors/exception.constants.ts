// profile_updated;
import dayjs from 'dayjs';

export const ErrorConstants = {
  InvalidEmailCode: {
    type: 'backend_invalid_email_verification',
    message: 'Invalid email verification code',
  },

  UserDuplicated: {
    type: 'backend_user_already_exists',
    message: 'Such user is already exists',
  },

  InvalidPassword: {
    type: 'backend_invalid_password',
    message: 'Invalid Password',
  },

  TimeNotExceedForEnergyLimit: {
    type: 'backend_time_not_exceed_for_energy_limit',
    message: 'Timeout for energy limit use, 1 hour',
  },

  NotEnoughLevel: {
    type: 'backend_not_enough_level',
    message: 'Not enough level',
  },

  NotEnoughBalance: {
    type: 'backend_not_enough_balance',
    message: 'Not enough balance',
  },

  InvalidLogin: {
    type: 'backend_invalid_login',
    message: 'Invalid Email or Username',
  },

  InvalidToken: {
    type: 'backend_invalid_token',
    message: 'Invalid Access or Refresh Token',
  },

  NotFoundSession: {
    type: 'backend_not_found_session',
    message: 'User session expired or does not exist',
  },

  ErrorSendingEmail: {
    type: 'backend_error_while_sending_email',
    message: 'We can not send email now, try later',
  },

  ErrorFetchingProfile: {
    type: 'backend_error_while_fetch_profile',
    message: 'Error while fetching profile, try later',
  },

  ErrorUpdateProfile: {
    type: 'backend_error_while_update_profile',
    message: 'Error while updating profile, try later',
  },

  NoAuthorizationHeaders: {
    type: 'backend_no_authorization_headers',
    message: 'No authorization headers provided',
  },

  NoSuchCharacter: {
    type: 'backend_no_such_character',
    message: 'We can not find such character, try later',
  },

  CharacterAlreadySelected: {
    type: 'backend_character_already_selected',
    message: 'You have already selected character',
  },

  UserNotFound: {
    type: 'backend_user_not_found',
    message: 'User was not found, try later',
  },

  TrustWalletAlreadySetup: {
    type: 'backend_trust_wallet_is_already_set_up',
    message: 'Trust wallet is already set up',
  },

  CardNotFound: {
    type: 'backend_card_not_found',
    message: 'Card was not found, try later',
  },

  CardExpired: {
    type: 'backend_card_expired',
    message: 'Card has been expired',
  },

  CardNotFinishedTasks: {
    type: 'backend_task_left',
    message: 'There is some task left for this card',
  },

  NoBalance: {
    type: 'backend_no_balance',
    message: `Balance not exists`,
  },

  LinkedCardLevelIsNotEnough: {
    type: 'backend_linked_card_level_is_not_enough',
    message: 'Linked card level is lower, that is required',
  },

  UserLevelIsNotEnough: {
    type: 'backend_user_level_is_not_enough',
    message: 'User level is lower, that is required',
  },

  NotEnoughReferrals: {
    type: 'backend_not_enough_referrals',
    message: 'User referrals count is not enough',
  },

  NotEnoughNewReferrals: {
    type: 'backend_not_enough_new_referrals',
    message: 'User new referrals count is not enough',
  },

  CardNextLevelNotFound: {
    type: 'backend_card_nex_level_not_found',
    message: 'There is no next level for this card, try later',
  },

  BoostSettingsNotProvided: {
    type: 'backend_no_boost_setting_provided',
    message:
      'Sorry, but we can not init your profile, as boost experience not provided yet',
  },

  BoostLimit: {
    type: 'backend_boost_limit',
    message: 'Sorry, but you have already reach boost limit',
  },

  NoCardLevel: {
    type: 'backend_no_card_level',
    message: 'There is no next level for this card',
  },

  ExpiredTask: {
    type: 'backend_task_expired',
    message: 'Task has been expired',
  },

  NotAChatMember: {
    type: 'backend_not_a_chat_member',
    message: 'You are not chat member',
  },

  TaskIsAlreadyClaimed: {
    type: 'backend_task_is_already_claimed',
    message: 'Task is already claimed',
  },

  TaskIsNotCompleted: {
    type: 'backend_task_in_not_completed',
    message: 'Task is not completed',
  },

  UserDisabled: {
    type: 'user_disabled',
    message: 'Current user is disabled',
  },

  InternalServerError: {
    type: 'server_error',
    message: 'Internal server error. Try again later',
  },

  TransactionIsAlreadyPending: {
    type: 'transaction_is_already_pending',
    message: 'Try again in 5 mins',
  },

  NotFoundLevelOptions: {
    type: 'server_error',
    message: 'Not found level option. Try again later',
  },

  InvalidCredentials: {
    type: 'invalid_credentials',
    message: 'Invalid Credentials',
  },

  UpgradeBoostError: {
    type: 'upgrade_boost_error',
    message: 'Upgrade Boost Error',
  },

  UseBoostError: {
    type: 'use_boost_error',
    message: 'Use Boost Error',
  },

  PayloadNotValid: {
    type: 'payload_not_valid',
    message: 'Payload Not Found or Invalid',
  },

  MismatchedPayloads: {
    type: 'mismatch_payload',
    message: 'Mismatched payloads',
  },

  ErrorValidation: {
    type: 'error_validation',
    message: 'Validation failed',
  },

  ErrorDisabled: {
    type: 'disabled',
    message: 'Disabled',
  },

  BonusAlreadyClimbed: {
    type: 'bonus_already_climbed',
    message: 'Bonus already claimed',
  },

  MissingDailyReward: {
    type: 'missing_daily_reward',
    message: 'Missing daily reward',
  },

  InvalidBoostType: {
    type: 'invalid_boost_type',
    message: 'Invalid Boost Type',
  },

  BackendCardTimeoutNotExists: (nextTimeToUp: dayjs.Dayjs) => ({
    type: 'backend_card_timeout_not_exists',
    message: `Wait until ${nextTimeToUp}`,
  }),

  BackendCardTimeout: (nextTimeToUp: dayjs.Dayjs) => ({
    type: 'backend_card_timeout',
    message: `Wait until ${nextTimeToUp}`,
  }),

  RequirementsValidationError: (message: string) => ({
    type: 'requirements_validation_error',
    message,
  }),

  BadRequest: (message: string) => ({
    type: 'bad_request',
    message,
  }),

  ChestIsAlreadyClaimed: {
    type: 'backend_chest_already_claimed',
    message: 'Chest is already claimed',
  },

  TooMuchTaps: {
    type: 'too_much_taps',
    message: 'Too much taps',
  },

  MaxLevelReached: {
    type: 'max_level_reached',
    message: 'Max level reached',
  },

  /* Clans */
  ClanNotFound: {
    type: 'clan_not_found',
    message: 'Clan Not Found',
  },

  NotAClanOwner: {
    type: 'not_a_clan_owner',
    message: 'You are not clan owner',
  },

  NotAClanMember: {
    type: 'not_a_clan_member',
    message: 'You are not clan member',
  },

  AlreadyClanMember: {
    type: 'already_a_clan_member',
    message: 'You are already a member of the clan',
  },

  AlreadyClanOwner: {
    type: 'already_a_clan_owner',
    message: 'You are already an owner of the clan',
  },

  ClanNameUsed: {
    type: 'clan_name_used',
    message: 'This clan name already used another clan',
  },

  /* SUBSCRIPTION */
  SubscriptionInvalidSettings: {
    type: 'subscription_invalid_settings',
    message: 'We can not provide payment process',
  },

  /* SUBSCRIPTION */
  SubscriptionIsNotActive: {
    type: 'subscription_is_not_active',
    message: 'Your subscription is not active',
  },

  InvoiceGenerationFailed: {
    type: 'subscription_invoice_failed',
    message: 'Telegram invoice generation is failed!',
  },

  /* Skins */

  NotFoundSkin: {
    type: 'character_skin_not_found',
    message: 'We can not find such skin, try again',
  },
};
