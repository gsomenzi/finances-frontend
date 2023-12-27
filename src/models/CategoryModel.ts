import { Category } from '@/types/Category';
import _ApiModel from './_ApiModel';

export default class CategoryModel extends _ApiModel<Category> {
    protected url = '/categories';
}
