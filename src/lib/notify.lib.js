import { Color } from '../const/common.const';

/** default messages */
const messages = {
  Default: 'default message.',
  Success: 'Is success!',
  Warning: 'Warning! Something isn\'t right',
  Info: 'Write some information in config.message.',
  Error: 'Error! Something is Error'
};

export default {
  config(config, defaultConfig = { message: messages.Default }) {
    return typeof config === 'string'
      ? {
        ...defaultConfig,
        message: config
      }
      : {
        ...defaultConfig,
        ...config
      };
  },

  Success(config = { message: messages.Success }) {
    return this.config(config, {
      color: Color.Success,
      icon: 'check_circle'
    });
  },

  Warning(config = { message: messages.Warning }) {
    return this.config(config, {
      color: Color.NotifyWarning,
      icon: 'warning'
    });
  },

  Info(config = { message: messages.Info }) {
    return this.config(config, {
      color: Color.Info,
      icon: 'mdi-information'
    });
  },

  Error(config = { message: messages.Error }) {
    return this.config(config, {
      color: Color.Danger,
      icon: 'report_problem'
    });
  }
};
