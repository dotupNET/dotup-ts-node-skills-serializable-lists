// tslint:disable:no-any
import { JsonInclude, JsonSerializable, SerializationMode } from 'dotup-ts-json-serializer';
import { ListItemConfiguration } from './ListItemConfiguration';
import { SkillNamedList } from './SkillNamedList';

@JsonSerializable(SerializationMode.IngonreAll)
export class ListManager {

  @JsonInclude()
  private readonly lists: SkillNamedList<any>;

  @JsonInclude()
  private config: ListItemConfiguration[] = [];

  // private readonly listConfiguration: SkillNamedList<ListItemConfiguration>;
  @JsonInclude()
  SelectedListName: string;

  constructor() {
    this.lists = new SkillNamedList<any>('ListManager', 'Name');
    // this.listConfiguration = new SkillNamedList<ListItemConfiguration>('listConfigurations');
  }

  Initialize(listConfiguration: ListItemConfiguration | ListItemConfiguration[]): void {
    const configList = (listConfiguration instanceof Array) ? listConfiguration : [listConfiguration];
    this.config = configList;
    configList.forEach(item => {
      this.InitializeNewList(item);
    });
  }

  private InitializeNewList(listConfiguration: ListItemConfiguration): void {

    const result = this.lists.Items.find((item: SkillNamedList<any>, index: number) => {
      if (item.Name === listConfiguration.Name && item.ListMode === listConfiguration.ListMode) {
        return true;
      } else {
        return false;
      }
    });

    if (result) {
      throw new Error('List item already exists');
    }

    const newList = new SkillNamedList<any>(listConfiguration.Name, listConfiguration.UniqueField);
    this.lists.Add(newList);
  }

  GetSessionList<T>(listName: string): SkillNamedList<T> {
    return this.lists.Items.find((item: SkillNamedList<T>, index: number) => {
      if (item.Name === listName) {
        return true;
      } else {
        return false;
      }
    });
  }

}
