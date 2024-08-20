/*
  Warnings:

  - You are about to drop the column `menus` on the `users` table. All the data in the column will be lost.
  - Added the required column `dc_wms_submenu_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `master_data_submenu_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scm_planner_submenu_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tms_planner_submenu_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wms_principle_submenu_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `menus`,
    ADD COLUMN `dc_wms_submenu_id` VARCHAR(255) NOT NULL,
    ADD COLUMN `master_data_submenu_id` VARCHAR(255) NOT NULL,
    ADD COLUMN `scm_planner_submenu_id` VARCHAR(255) NOT NULL,
    ADD COLUMN `tms_planner_submenu_id` VARCHAR(255) NOT NULL,
    ADD COLUMN `wms_principle_submenu_id` VARCHAR(255) NOT NULL;
