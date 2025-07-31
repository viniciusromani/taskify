import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1753997619200 implements MigrationInterface {
  name = 'Migration1753997619200';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "description" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "description" SET NOT NULL`,
    );
  }
}
