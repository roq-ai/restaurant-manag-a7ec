import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware, notificationHandlerMiddleware } from 'server/middlewares';
import { dishCategoryMenuItemValidationSchema } from 'validationSchema/dish-category-menu-items';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  const allowed = await prisma.dish_category_menu_item
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  if (!allowed) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  switch (req.method) {
    case 'GET':
      return getDishCategoryMenuItemById();
    case 'PUT':
      return updateDishCategoryMenuItemById();
    case 'DELETE':
      return deleteDishCategoryMenuItemById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDishCategoryMenuItemById() {
    const data = await prisma.dish_category_menu_item.findFirst(
      convertQueryToPrismaUtil(req.query, 'dish_category_menu_item'),
    );
    return res.status(200).json(data);
  }

  async function updateDishCategoryMenuItemById() {
    await dishCategoryMenuItemValidationSchema.validate(req.body);
    const data = await prisma.dish_category_menu_item.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
  async function deleteDishCategoryMenuItemById() {
    await notificationHandlerMiddleware(req, req.query.id as string);
    const data = await prisma.dish_category_menu_item.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
