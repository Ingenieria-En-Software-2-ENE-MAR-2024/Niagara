import { useId } from 'react'
import {
TextField as ShortTextComponent,
SelectField as SingleChoiceComponent,
TextArea as LongTextComponent,
} from '../Fields'


export interface IFormQuestion {
  id: string;
  type: string;
  label: string;
  options?: string[] | null;
}
  export type componentOption = {
    [key: string]: React.FC<{ field: IFormQuestion }>
  }
  

export const components: any = {
  'short-text': ShortTextComponent,
  'long-text': LongTextComponent,

}
