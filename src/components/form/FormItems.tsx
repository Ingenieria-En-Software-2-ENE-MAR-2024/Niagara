import { useId } from 'react'
import {
  TextField as ShortTextComponent,
  SelectField as SingleChoiceComponent,
  TextArea as LongTextComponent,
} from '../Fields'

export const components: any = {
  'short-text': ShortTextComponent,
  'long-text': LongTextComponent,
  'single-choice': SingleChoiceComponent,
  // 'multiple-choice': MultipleChoiceComponent,
  // 'file-upload': FileUploadComponent,
}
