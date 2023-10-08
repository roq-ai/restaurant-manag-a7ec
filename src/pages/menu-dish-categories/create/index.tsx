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

import { createMenuDishCategory } from 'apiSdk/menu-dish-categories';
import { menuDishCategoryValidationSchema } from 'validationSchema/menu-dish-categories';
import { MenuInterface } from 'interfaces/menu';
import { DishCategoryInterface } from 'interfaces/dish-category';
import { getMenus } from 'apiSdk/menus';
import { getDishCategories } from 'apiSdk/dish-categories';
import { MenuDishCategoryInterface } from 'interfaces/menu-dish-category';

function MenuDishCategoryCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: MenuDishCategoryInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createMenuDishCategory(values);
      resetForm();
      router.push('/menu-dish-categories');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<MenuDishCategoryInterface>({
    initialValues: {
      description: '',
      availability_status: false,
      menu_id: (router.query.menu_id as string) ?? null,
      dish_category_id: (router.query.dish_category_id as string) ?? null,
    },
    validationSchema: menuDishCategoryValidationSchema,
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
              label: 'Menu Dish Categories',
              link: '/menu-dish-categories',
            },
            {
              label: 'Create Menu Dish Category',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Menu Dish Category
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.description}
            label={'Description'}
            props={{
              name: 'description',
              placeholder: 'Description',
              value: formik.values?.description,
              onChange: formik.handleChange,
            }}
          />

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
          <AsyncSelect<MenuInterface>
            formik={formik}
            name={'menu_id'}
            label={'Select Menu'}
            placeholder={'Select Menu'}
            fetcher={getMenus}
            labelField={'name'}
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
              onClick={() => router.push('/menu-dish-categories')}
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
    entity: 'menu_dish_category',
    operation: AccessOperationEnum.CREATE,
  }),
)(MenuDishCategoryCreatePage);
