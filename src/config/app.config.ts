interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Restaurant Manager'],
  customerRoles: ['Guest'],
  tenantRoles: ['Restaurant Owner', 'Restaurant Manager', 'Kitchen Staff', 'Customer'],
  tenantName: 'Restaurant',
  applicationName: 'Restaurant Management System',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: ['View menus', 'View restaurant information', 'View dish categories', 'View menu items'],
  ownerAbilities: ['Manage restaurant', 'Manage menus', 'Manage menu items', 'Manage dish categories'],
  getQuoteUrl: 'https://app.roq.ai/proposal/62300afc-ebf8-43b6-9b1b-411d73866e49',
};
