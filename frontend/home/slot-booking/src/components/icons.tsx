import { ReactComponent as IconArrowLeft } from 'assets/icon-arrow-left.svg';
import { ReactComponent as IconArrowRight } from 'assets/icon-arrow-right.svg';
import { ReactComponent as IconPlus } from 'assets/icon-plus.svg';
import { ReactComponent as IconTrash } from 'assets/icon-delete.svg';

export type IconName = 'plus' | 'arrowLeft' | 'arrowRight' | 'trash'

export const Icons = {
    plus: <IconPlus/>,
    arrowLeft: <IconArrowLeft/>,
    arrowRight: <IconArrowRight/>,
    trash: <IconTrash/>
}