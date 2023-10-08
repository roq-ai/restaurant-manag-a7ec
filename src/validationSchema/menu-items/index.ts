import * as yup from 'yup';

export const menuItemValidationSchema = yup.object().shape({
  availability_status: yup.boolean().required(),
  dish_description: yup.string().nullable(),
  dish_image_url: yup.string().nullable(),
  dish_price: yup.number().required(),
  dish_calories: yup.number().integer().nullable(),
  dish_ingredients: yup.string().nullable(),
  dish_preparation_time: yup.number().integer().nullable(),
  dish_name: yup.string().nullable(),
  dish_allergens: yup.string().nullable(),
  dish_spiciness_level: yup.number().integer().nullable(),
  dish_vegan: yup.boolean().nullable(),
  dish_gluten_free: yup.boolean().nullable(),
});
