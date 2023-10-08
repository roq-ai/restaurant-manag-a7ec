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
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createDishCategoryMenuItem } from 'apiSdk/dish-category-menu-items';
import { dishCategoryMenuItemValidationSchema } from 'validationSchema/dish-category-menu-items';
import { MenuItemInterface } from 'interfaces/menu-item';
import { DishCategoryInterface } from 'interfaces/dish-category';
import { getMenuItems } from 'apiSdk/menu-items';
import { getDishCategories } from 'apiSdk/dish-categories';
import { DishCategoryMenuItemInterface } from 'interfaces/dish-category-menu-item';

function DishCategoryMenuItemCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: DishCategoryMenuItemInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createDishCategoryMenuItem(values);
      resetForm();
      router.push('/dish-category-menu-items');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<DishCategoryMenuItemInterface>({
    initialValues: {
      availability_status: '',
      menu_item_id: (router.query.menu_item_id as string) ?? null,
      dish_category_id: (router.query.dish_category_id as string) ?? null,
    },
    validationSchema: dishCategoryMenuItemValidationSchema,
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
              label: 'Dish Category Menu Items',
              link: '/dish-category-menu-items',
            },
            {
              label: 'Create Dish Category Menu Item',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Dish Category Menu Item
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.availability_status}
            label={'Availability Status'}
            props={{
              name: 'availability_status',
              placeholder: 'Availability Status',
              value: formik.values?.availability_status,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<MenuItemInterface>
            formik={formik}
            name={'menu_item_id'}
            label={'Select Menu Item'}
            placeholder={'Select Menu Item'}
            fetcher={getMenuItems}
            labelField={'dish_description'}
          />
          <AsyncSelect<DishCategoryInterface>
            formik={formik}
            name={'dish_category_id'}
            label={'Select Dish Category'}
            placeholder={'Select Dish Category'}
            fetcher={getDishCategories}
            labelField={'name'}
          />
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
              onClick={() => router.push('/dish-category-menu-items')}
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
    entity: 'dish_category_menu_item',
    operation: AccessOperationEnum.CREATE,
  }),
)(DishCategoryMenuItemCreatePage);
