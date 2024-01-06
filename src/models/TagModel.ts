import _ApiModel from './_ApiModel';
import { Tag } from '@/types/Tag';

export default class TagModel extends _ApiModel<Tag, Partial<Tag>> {
    protected url = '/tags';
}
