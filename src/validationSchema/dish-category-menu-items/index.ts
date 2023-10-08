import * as yup from 'yup';

export const dishCategoryMenuItemValidationSchema = yup.object().shape({
  availability_status: yup.string().required(),
  menu_item_id: yup.string().nullable(),
  dish_category_id: yup.string().nullable(),
});
