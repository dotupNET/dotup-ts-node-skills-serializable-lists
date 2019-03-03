// tslint:disable: interface-name
// tslint:disable: no-submodule-imports
import { IRequestAttributes } from 'dotup-ts-node-skills/dist/Attributes/IRequestAttributes';
import { NodeSkill } from 'dotup-ts-node-skills/dist/NodeSkill';
import { ListManager } from './ListManager';
import { SkillNamedList } from './SkillNamedList';

declare module 'dotup-ts-node-skills/dist/Attributes/IRequestAttributes' {
  export interface IRequestAttributes {
    listManager: ListManager;
    getSessionList<T>(listName: string): SkillNamedList<T>;
  }
}

declare module 'dotup-ts-node-skills/dist/NodeSkill' {
  export interface NodeSkill {
    addListManager(listManager: ListManager): void;
  }
}
