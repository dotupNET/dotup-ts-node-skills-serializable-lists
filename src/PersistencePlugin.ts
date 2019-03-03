import { CustomSkillBuilder } from 'ask-sdk-core';
import { LoggerFactory } from 'dotup-ts-logger';
import { IPlugin } from 'dotup-ts-node-skills';
import { ISerializableListPluginConfiguration } from './ISerializableListPluginConfiguration';
import { ListAttributesRequestInterceptor } from './ListAttributesRequestInterceptor';
import { ListAttributesResponseInterceptor } from './ListAttributesResponseInterceptor';

export class SerializableListPlugin implements IPlugin {
  private readonly logger = LoggerFactory.createLogger('SerializableListPlugin');
  private readonly config: ISerializableListPluginConfiguration;

  constructor(config: ISerializableListPluginConfiguration) {
    this.logger.Info('SerializableListPlugin activated');
    this.config = config;
  }

  initialize(skillBuilder: CustomSkillBuilder): void {

    if (this.config.useRequestInterceptor) {
      this.logger.Info('ListAttributesRequestInterceptor activated');
      skillBuilder.addRequestInterceptors(new ListAttributesRequestInterceptor(this.config.listConfiguration));
    }
    if (this.config.useResponseInterceptor) {
      this.logger.Info('ListAttributesResponseInterceptor activated');
      skillBuilder.addResponseInterceptors(new ListAttributesResponseInterceptor());
    }
  }

}
