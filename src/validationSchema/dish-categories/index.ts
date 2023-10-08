import * as yup from 'yup';

export const dishCategoryValidationSchema = yup.object().shape({
  description: yup.string().nullable(),
  name: yup.string().nullable(),
  tags: yup.string().nullable(),
  dish_category_image: yup.string().nullable(),
  dish_category_status: yup.boolean().required(),
  dish_category_color: yup.string().nullable(),
  menu_id: yup.string().nullable(),
});
