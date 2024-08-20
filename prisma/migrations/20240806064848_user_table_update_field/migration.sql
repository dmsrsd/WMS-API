/*
  Warnings:

  - You are about to drop the column `dc_wms_submenu_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `master_data_submenu_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `scm_planner_submenu_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `tms_planner_submenu_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `wms_principle_submenu_id` on the `users` table. All the data in the column will be lost.
  - Added the required column `menus` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `dc_wms_submenu_id`,
    DROP COLUMN `master_data_submenu_id`,
    DROP COLUMN `scm_planner_submenu_id`,
    DROP COLUMN `tms_planner_submenu_id`,
    DROP COLUMN `wms_principle_submenu_id`,
    ADD COLUMN `menus` VARCHAR(255) NOT NULL;
