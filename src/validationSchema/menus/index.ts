import * as yup from 'yup';

export const menuValidationSchema = yup.object().shape({
  availability_status: yup.boolean().required(),
  description: yup.string().nullable(),
  name: yup.string().nullable(),
  image: yup.string().nullable(),
  restaurant_id: yup.string().nullable(),
});
