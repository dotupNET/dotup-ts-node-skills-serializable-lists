import { HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { ResponseInterceptor } from 'ask-sdk-runtime';

export class ListAttributesResponseInterceptor implements ResponseInterceptor<HandlerInput, Response> {

  /**
   * Save list manager items in session
   */
  process(input: HandlerInput, response?: Response): void {
    const requestAttributes = input.attributesManager.getRequestAttributes();
    const sessionAttributes = input.attributesManager.getSessionAttributes();

    sessionAttributes.ListManager = requestAttributes.ListManager;
  }
}
