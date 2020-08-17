import { ListItemConfiguration } from './ListItemConfiguration';

export interface ISerializableListPluginConfiguration {
  useResponseInterceptor: boolean;
  useRequestInterceptor: boolean;
  listConfiguration: ListItemConfiguration[];
}
