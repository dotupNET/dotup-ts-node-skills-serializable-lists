import { PersistenceAdapter } from 'ask-sdk-core';
import { JsonIgnore, JsonSerializable } from 'dotup-ts-json-serializer';
import { ListMode } from './ListMode';

@JsonSerializable()
export class ListItemConfiguration {

  // tslint:disable-next-line:no-any
  UniqueField: any;

  Name: string;

  ListMode: ListMode = ListMode.Session;

  @JsonIgnore()
  PersistentAdapter?: PersistenceAdapter;

  // @JsonIgnore()
  // tslint:disable-next-line:no-any
  // Deserializer: Deserializer<any>;
}
