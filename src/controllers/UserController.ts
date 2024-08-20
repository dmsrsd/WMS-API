//import prisma client
import prisma from '../../prisma/client'
// import { createHash } from 'crypto'
import crypto from 'crypto';

/**
 * Getting all Users
 */
export async function getAllDataUsers () {
  try {
    //get all posts
    const users = await prisma.user.findMany({ orderBy: { id: 'desc' } })

    //return response json
    return {
      success: true,
      message: 'List Data Users!',
      data: users
    }
  } catch (e: unknown) {
    return {
      success: false,
      message: 'Failed to get List Data Users!',
      error: `${e}`
    }
  }
}

/**
 * Getting Users By Id
 */
export async function getDataUserById (id: string) {
  try {
    // Konversi tipe id menjadi number
    const userId = parseInt(id)

    //get post by id
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    //if post not found
    if (!user) {
      return {
        sucess: true,
        message: 'Detail Data User Not Found!',
        data: null
      }
    }

    //return response json
    return {
      success: true,
      message: `Detail Data Post By ID : ${id}`,
      data: user
    }
  } catch (e: unknown) {
    console.error(`Error finding post: ${e}`)
  }
}

/**
 * Creating a New User
 */
export async function createUser (options: {
  name: string
  email: string
  password: string
  role: string
  master_data_submenu_id: string
  scm_planner_submenu_id: string
  wms_principle_submenu_id: string
  tms_planner_submenu_id: string
  dc_wms_submenu_id: string
}) {
  try {
    // Destructure name, email, and password from options
    const {
      name,
      email,
      password,
      role,
      master_data_submenu_id,
      scm_planner_submenu_id,
      wms_principle_submenu_id,
      tms_planner_submenu_id,
      dc_wms_submenu_id
    } = options

    // Check if user with this email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (existingUser) {
      return {
        success: false,
        message: 'Email already exists. Please use a different email.'
      }
    }

    // Enkripsi password menggunakan SHA-1
    const sha1 = crypto.createHash('sha1')
    sha1.update(password)
    const encryptedPassword = sha1.digest('hex')

    // Create user using Prisma client
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: encryptedPassword,
        role: role,
        master_data_submenu_id: master_data_submenu_id,
        scm_planner_submenu_id: scm_planner_submenu_id,
        wms_principle_submenu_id: wms_principle_submenu_id,
        tms_planner_submenu_id: tms_planner_submenu_id,
        dc_wms_submenu_id: dc_wms_submenu_id
      }
    })

    // Return success response
    return {
      success: true,
      message: 'User Created Successfully!',
      data: user
    }
  } catch (e: unknown) {
    // Handle error
    return {
      success: false,
      message: 'Failed to create user!',
      error: `${e}`
    }
  }
}

/**
 * Check User
 */
// Fungsi untuk memeriksa email dan password
export async function checkUser (options: { email: string; password: string }) {
  try {
    // Destructure name, email, and password from options
    const { email, password } = options

    // Enkripsi password menggunakan SHA-1
    const sha1 = crypto.createHash('sha1')
    sha1.update(password)
    const encryptedPassword = sha1.digest('hex')

    // Cari pengguna berdasarkan email
    const user = await prisma.user.findUnique({ where: { email } })

    // Jika pengguna ditemukan, bandingkan password
    if (user && user.password === encryptedPassword) {
      return {
        name: user.name,
        email: user.email,
        role: user.role,
        master_data_submenu_id : user.master_data_submenu_id,
        scm_planner_submenu_id : user.scm_planner_submenu_id,
        wms_principle_submenu_id : user.wms_principle_submenu_id,
        tms_planner_submenu_id : user.tms_planner_submenu_id,
        dc_wms_submenu_id : user.dc_wms_submenu_id
      }
    }

    return null // Jika pengguna tidak ditemukan atau password tidak cocok
  } catch (error) {
    console.error('Error checking user:', error)
    throw error
  }
}

/**
 * Updating a data
 */
export async function updateData (
  id: string,
  options: { name?: string; email?: string; password: string }
) {
  try {
    // Konversi tipe id menjadi number
    const userId = parseInt(id)

    //get title and content
    const { name, email, password } = options

    // Enkripsi password menggunakan SHA-1
    const sha1 = crypto.createHash('sha1')
    sha1.update(password)
    const encryptedPassword = sha1.digest('hex')

    //update post with prisma
    const post = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name ? { name } : {}),
        ...(email ? { email } : {}),
        password: encryptedPassword
      }
    })

    //return response json
    return {
      success: true,
      message: 'Updated Successfully!',
      data: post
    }
  } catch (e: unknown) {
    return {
      success: false,
      message: 'Updated Error!',
      error: `${e}`
    }
  }
}

/**
 * Deleting a data
 */
export async function deletePost (id: string) {
  try {
    // Konversi tipe id menjadi number
    const userId = parseInt(id)

    //delete data with prisma
    await prisma.user.delete({
      where: { id: userId }
    })

    //return response json
    return {
      success: true,
      message: 'Deleted Successfully!'
    }
  } catch (e: unknown) {
    return {
      success: false,
      message: 'Deleting Error!',
      error: `${e}`
    }
  }
}


export async function getUserAndMenusByEmail(email: string) {
  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // If user not found
    if (!user) {
      return {
        success: false,
        message: 'User not found!',
        data: null
      };
    }

    // Get related menus based on submenu IDs
    const submenuIds = [
      ...user.master_data_submenu_id.split(',').map(Number),
      ...user.scm_planner_submenu_id.split(',').map(Number),
      ...user.wms_principle_submenu_id.split(',').map(Number),
      ...user.tms_planner_submenu_id.split(',').map(Number),
      ...user.dc_wms_submenu_id.split(',').map(Number)
    ];

    const menus = await prisma.menu.findMany({
      where: {
        submenu_id: {
          in: submenuIds
        }
      }
    });

    // Return the user and associated menu data
    return {
      success: true,
      message: `User and Menu details for email: ${email}`,
      data: {
        user,
        menus
      }
    };
  } catch (e) {
    console.error(`Error fetching user and menus: ${e}`);
    return {
      success: false,
      message: 'An error occurred while fetching data.',
      data: null
    };
  }
}
