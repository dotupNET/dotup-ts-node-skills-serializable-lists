// tslint:disable:no-any

import { HandlerInput, RequestInterceptor } from 'ask-sdk-core';
import { JsonManager } from 'dotup-ts-json-serializer';
import { ListItemConfiguration } from './ListItemConfiguration';
import { ListManager } from './ListManager';
import { RequestReader, IRequestAttributes } from 'dotup-ts-node-skills';
import { LoggerFactory } from 'dotup-ts-logger';

export class ListAttributesRequestInterceptor implements RequestInterceptor {
  private readonly logger = LoggerFactory.createLogger('ListAttributesRequestInterceptor');
  private listConfiguration: ListItemConfiguration[];

  constructor(listConfiguration: ListItemConfiguration[]) {
    this.logger.Info('ListAttributesRequestInterceptor activated', 'ctor');
    this.listConfiguration = listConfiguration;
  }

  process(handlerInput: HandlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    let lm: ListManager;
    if (sessionAttributes.ListManager) {
      const jm = new JsonManager();
      lm = jm.Deserialize<ListManager>(sessionAttributes.ListManager);
    } else {
      lm = new ListManager();
      lm.Initialize(this.listConfiguration);
    }

    const requestAttributes = <IRequestAttributes>handlerInput.attributesManager.getRequestAttributes();
    requestAttributes.listManager = lm;
    requestAttributes.getSessionList = lm.GetSessionList;
  }

}
