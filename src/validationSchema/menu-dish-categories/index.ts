import * as yup from 'yup';

export const menuDishCategoryValidationSchema = yup.object().shape({
  description: yup.string().nullable(),
  availability_status: yup.boolean().nullable(),
  menu_id: yup.string().nullable(),
  dish_category_id: yup.string().nullable(),
});
