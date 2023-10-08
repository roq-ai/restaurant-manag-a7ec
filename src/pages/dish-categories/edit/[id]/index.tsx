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
import { getDishCategoryById, updateDishCategoryById } from 'apiSdk/dish-categories';
import { dishCategoryValidationSchema } from 'validationSchema/dish-categories';
import { DishCategoryInterface } from 'interfaces/dish-category';
import { MenuInterface } from 'interfaces/menu';
import { getMenus } from 'apiSdk/menus';

function DishCategoryEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<DishCategoryInterface>(
    () => (id ? `/dish-categories/${id}` : null),
    () => getDishCategoryById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: DishCategoryInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateDishCategoryById(id, values);
      mutate(updated);
      resetForm();
      router.push('/dish-categories');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<DishCategoryInterface>({
    initialValues: data,
    validationSchema: dishCategoryValidationSchema,
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
              label: 'Dish Categories',
              link: '/dish-categories',
            },
            {
              label: 'Update Dish Category',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Dish Category
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
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

          <TextInput
            error={formik.errors.name}
            label={'Name'}
            props={{
              name: 'name',
              placeholder: 'Name',
              value: formik.values?.name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.tags}
            label={'Tags'}
            props={{
              name: 'tags',
              placeholder: 'Tags',
              value: formik.values?.tags,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.dish_category_image}
            label={'Dish Category Image'}
            props={{
              name: 'dish_category_image',
              placeholder: 'Dish Category Image',
              value: formik.values?.dish_category_image,
              onChange: formik.handleChange,
            }}
          />

          <FormControl
            id="dish_category_status"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.dish_category_status}
          >
            <FormLabel htmlFor="switch-dish_category_status">Dish Category Status</FormLabel>
            <Switch
              id="switch-dish_category_status"
              name="dish_category_status"
              onChange={formik.handleChange}
              value={formik.values?.dish_category_status ? 1 : 0}
            />
            {formik.errors?.dish_category_status && (
              <FormErrorMessage>{formik.errors?.dish_category_status}</FormErrorMessage>
            )}
          </FormControl>

          <TextInput
            error={formik.errors.dish_category_color}
            label={'Dish Category Color'}
            props={{
              name: 'dish_category_color',
              placeholder: 'Dish Category Color',
              value: formik.values?.dish_category_color,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<MenuInterface>
            formik={formik}
            name={'menu_id'}
            label={'Select Menu'}
            placeholder={'Select Menu'}
            fetcher={getMenus}
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
              onClick={() => router.push('/dish-categories')}
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
    entity: 'dish_category',
    operation: AccessOperationEnum.UPDATE,
  }),
)(DishCategoryEditPage);
