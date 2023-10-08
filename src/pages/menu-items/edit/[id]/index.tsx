import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getMenuItemById, updateMenuItemById } from 'apiSdk/menu-items';
import { menuItemValidationSchema } from 'validationSchema/menu-items';
import { MenuItemInterface } from 'interfaces/menu-item';

function MenuItemEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<MenuItemInterface>(
    () => (id ? `/menu-items/${id}` : null),
    () => getMenuItemById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: MenuItemInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateMenuItemById(id, values);
      mutate(updated);
      resetForm();
      router.push('/menu-items');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<MenuItemInterface>({
    initialValues: data,
    validationSchema: menuItemValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Menu Items',
              link: '/menu-items',
            },
            {
              label: 'Update Menu Item',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Menu Item
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl
            id="availability_status"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.availability_status}
          >
            <FormLabel htmlFor="switch-availability_status">Availability Status</FormLabel>
            <Switch
              id="switch-availability_status"
              name="availability_status"
              onChange={formik.handleChange}
              value={formik.values?.availability_status ? 1 : 0}
            />
            {formik.errors?.availability_status && (
              <FormErrorMessage>{formik.errors?.availability_status}</FormErrorMessage>
            )}
          </FormControl>

          <TextInput
            error={formik.errors.dish_description}
            label={'Dish Description'}
            props={{
              name: 'dish_description',
              placeholder: 'Dish Description',
              value: formik.values?.dish_description,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.dish_image_url}
            label={'Dish Image Url'}
            props={{
              name: 'dish_image_url',
              placeholder: 'Dish Image Url',
              value: formik.values?.dish_image_url,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Dish Price"
            formControlProps={{
              id: 'dish_price',
              isInvalid: !!formik.errors?.dish_price,
            }}
            name="dish_price"
            error={formik.errors?.dish_price}
            value={formik.values?.dish_price}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('dish_price', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Dish Calories"
            formControlProps={{
              id: 'dish_calories',
              isInvalid: !!formik.errors?.dish_calories,
            }}
            name="dish_calories"
            error={formik.errors?.dish_calories}
            value={formik.values?.dish_calories}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('dish_calories', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.dish_ingredients}
            label={'Dish Ingredients'}
            props={{
              name: 'dish_ingredients',
              placeholder: 'Dish Ingredients',
              value: formik.values?.dish_ingredients,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Dish Preparation Time"
            formControlProps={{
              id: 'dish_preparation_time',
              isInvalid: !!formik.errors?.dish_preparation_time,
            }}
            name="dish_preparation_time"
            error={formik.errors?.dish_preparation_time}
            value={formik.values?.dish_preparation_time}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('dish_preparation_time', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.dish_name}
            label={'Dish Name'}
            props={{
              name: 'dish_name',
              placeholder: 'Dish Name',
              value: formik.values?.dish_name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.dish_allergens}
            label={'Dish Allergens'}
            props={{
              name: 'dish_allergens',
              placeholder: 'Dish Allergens',
              value: formik.values?.dish_allergens,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Dish Spiciness Level"
            formControlProps={{
              id: 'dish_spiciness_level',
              isInvalid: !!formik.errors?.dish_spiciness_level,
            }}
            name="dish_spiciness_level"
            error={formik.errors?.dish_spiciness_level}
            value={formik.values?.dish_spiciness_level}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('dish_spiciness_level', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl
            id="dish_vegan"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.dish_vegan}
          >
            <FormLabel htmlFor="switch-dish_vegan">Dish Vegan</FormLabel>
            <Switch
              id="switch-dish_vegan"
              name="dish_vegan"
              onChange={formik.handleChange}
              value={formik.values?.dish_vegan ? 1 : 0}
            />
            {formik.errors?.dish_vegan && <FormErrorMessage>{formik.errors?.dish_vegan}</FormErrorMessage>}
          </FormControl>

          <FormControl
            id="dish_gluten_free"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.dish_gluten_free}
          >
            <FormLabel htmlFor="switch-dish_gluten_free">Dish Gluten Free</FormLabel>
            <Switch
              id="switch-dish_gluten_free"
              name="dish_gluten_free"
              onChange={formik.handleChange}
              value={formik.values?.dish_gluten_free ? 1 : 0}
            />
            {formik.errors?.dish_gluten_free && <FormErrorMessage>{formik.errors?.dish_gluten_free}</FormErrorMessage>}
          </FormControl>

          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/menu-items')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'menu_item',
    operation: AccessOperationEnum.UPDATE,
  }),
)(MenuItemEditPage);
