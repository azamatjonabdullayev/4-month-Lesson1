-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('superadmin', 'admin', 'user', 'teacher');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'user';
