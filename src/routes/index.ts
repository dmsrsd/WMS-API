// Import elysia
import { Elysia, t } from 'elysia'
import { cors } from '@elysiajs/cors'
import { jwt } from '@elysiajs/jwt'

// Import Posting controller
import {
  getPosts,
  createPost,
  getPostById
} from '../controllers/PostController'

// Import User controller
import {
  getAllDataUsers,
  getDataUserById,
  createUser,
  checkUser,
  updateData,
  deletePost,
  getUserAndMenusByEmail
} from '../controllers/UserController'

import { getMenu, insertMenu } from '../controllers/MenuController'

const app = new Elysia().use(cors()).use(
  jwt({
    // Register JWT plugin
    name: 'jwt',
    secret: Bun.env.JWT_SECRET!
  })
)

/**POSTINGAN CONTRLLERS */

// Route untuk mendapatkan semua posts
app.get('/posts', () => getPosts())

// Get Postingan By Id
app.get('/posts/:id', ({ params: { id } }) => getPostById(id))

// Route untuk membuat post baru
app.post(
  '/posts',
  ({ body }) => createPost(body as { title: string; content: string }),
  {
    body: t.Object({
      title: t.String({
        minLength: 3,
        maxLength: 100
      }),
      content: t.String({
        minLength: 3,
        maxLength: 1000
      })
    })
  }
)

/**USER CONTRLLERS */

// Route untuk mendapatkan semua posts
app.get('/get-users', () => getAllDataUsers())

// Get Users By Id
app.get('/get-users/:id', ({ params: { id } }) => getDataUserById(id))

// Route untuk membuat user baru atau register
app.post(
  '/users',
  ({ body }) => {
    // const menusString = body.menus.join(',')
    const masterMenuStr = body.master_data_submenu_id.join(',')
    const scmMenuStr = body.scm_planner_submenu_id.join(',')
    const wmsMenuStr = body.wms_principle_submenu_id.join(',')
    const tmsterMenuStr = body.tms_planner_submenu_id.join(',')
    const dcwmsMenuStr = body.dc_wms_submenu_id.join(',')

    return createUser({
      ...body,
      master_data_submenu_id: masterMenuStr,
      scm_planner_submenu_id: scmMenuStr,
      wms_principle_submenu_id: wmsMenuStr,
      tms_planner_submenu_id: tmsterMenuStr,
      dc_wms_submenu_id: dcwmsMenuStr
    })
  },
  {
    body: t.Object({
      name: t.String({
        minLength: 3,
        maxLength: 100
      }),
      email: t.String({
        minLength: 3,
        maxLength: 1000
      }),
      password: t.String({
        minLength: 5,
        maxLength: 1000
      }),
      role: t.String({
        minLength: 3,
        maxLength: 15
      }),
      // menus: t.Array(t.String())
      master_data_submenu_id: t.Array(t.String()),
      scm_planner_submenu_id: t.Array(t.String()),
      wms_principle_submenu_id: t.Array(t.String()),
      tms_planner_submenu_id: t.Array(t.String()),
      dc_wms_submenu_id: t.Array(t.String())
    })
  }
)

// Route untuk Login
app.post(
  '/users/login',
  async ({ body, jwt, cookie: { auth }, params }) => {
    const user = await checkUser(body as { email: string; password: string })

    if (user) {
      auth.set({
        value: await jwt.sign(user),
        httpOnly: true,
        maxAge: 7 * 86400
      })

      return {
        status: true,
        token: `${auth.value}`,
        message: 'Authentication success',
        role: user.role,
        master_data_submenu_id: user.master_data_submenu_id,
        scm_planner_submenu_id: user.scm_planner_submenu_id,
        wms_principle_submenu_id: user.wms_principle_submenu_id,
        tms_planner_submenu_id: user.tms_planner_submenu_id,
        dc_wms_submenu_id: user.dc_wms_submenu_id
      }
    } else {
      return {
        status: false,
        token: false,
        message: 'Authentication failed'
      }
    }
  },
  {
    body: t.Object({
      email: t.String({
        minLength: 3,
        maxLength: 1000
      }),
      password: t.String({
        minLength: 3,
        maxLength: 1000
      })
    })
  }
)

//route Update Data
app.patch(
  '/users/:id',
  ({ params: { id }, body }) =>
    updateData(id, body as { name?: string; email?: string; password: string }),
  {
    body: t.Object({
      name: t.String({
        minLength: 3,
        maxLength: 100
      }),
      email: t.String({
        minLength: 3,
        maxLength: 1000
      }),
      password: t.String({
        minLength: 5,
        maxLength: 1000
      })
    })
  }
)

//route delete post
app.delete('/users/:id', ({ params: { id } }) => deletePost(id))

app.post(
  '/users/get-menu-details',
  async ({ body }) => {
    const { email } = body

    if (!email) {
      return {
        status: false,
        message: 'Email is required'
      }
    }

    const result = await getUserAndMenusByEmail(email)

    if (result.success) {
      return {
        status: true,
        message: result.message,
        data: result.data
      }
    } else {
      return {
        status: false,
        message: result.message,
        data: null
      }
    }
  },
  {
    body: t.Object({
      email: t.String({
        minLength: 3,
        maxLength: 1000
      })
    })
  }
)

/**MENU CONTRLLERS */

// Route untuk mendapatkan semua menu
app.get('/menus', () => getMenu())

// Route untuk membuat menu baru
app.post(
  '/menus',
  ({ body }) =>
    insertMenu(
      body as {
        category_id: string
        category_name: string
        category_icon: string
        submenu_id: string
        submenu_path: string
        submenu_name: string
        submenu_component: string
        layout: string
      }
    ),
  {
    body: t.Object({
      category_id: t.String(),
      category_name: t.String({
        minLength: 3,
        maxLength: 50
      }),
      category_icon: t.String({
        minLength: 3,
        maxLength: 50
      }),
      submenu_id: t.String(),
      submenu_path: t.String({
        minLength: 3,
        maxLength: 100
      }),
      submenu_name: t.String({
        minLength: 3,
        maxLength: 50
      }),
      submenu_component: t.String({
        minLength: 3,
        maxLength: 50
      }),
      layout: t.String({
        minLength: 3,
        maxLength: 50
      })
    })
  }
)

export default app
