//import prisma client
import prisma from '../../prisma/client'

/**
 * Getting all menus
 */
export async function getMenu () {
  try {
    //get all menus
    const menus = await prisma.menu.findMany({ orderBy: { id: 'desc' } })

    //return response json
    return {
      success: true,
      message: 'List Data menus!',
      data: menus
    }
  } catch (e: unknown) {
    console.error(`Error getting menus: ${e}`)
  }
}

/**
 * Creating a menu
 */
export async function insertMenu(options: {
  category_id: string;
  category_name: string;
  category_icon: string;
  submenu_id: string;
  submenu_path: string;
  submenu_name: string;
  submenu_component: string;
  layout: string;
}) {
  try {
    // get menu data from options
    const { category_id, category_name, category_icon, submenu_id, submenu_path, submenu_name, submenu_component, layout } = options;

    const categoryId = +category_id;
    const subMenuId = +submenu_id;

    // create menu data
    const menu = await prisma.menu.create({
      data: {
        category_id: categoryId,
        category_name: category_name,
        category_icon: category_icon,
        submenu_id: subMenuId,
        submenu_path: submenu_path,
        submenu_name: submenu_name,
        submenu_component: submenu_component,
        layout: layout,
      },
    });

    // return response json
    return {
      success: true,
      message: 'Menu Created Successfully!',
      data: menu,
    };
  } catch (e: unknown) {
    console.error(`Error creating menu: ${e}`);
  }
}


