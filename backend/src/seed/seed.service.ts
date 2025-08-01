import { Injectable, Logger } from '@nestjs/common';

import { UsersService } from '../users/users.service';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly userService: UsersService) {}

  async seed() {
    this.logger.debug('-------- Starting seeding --------');
    await this.seedUser();
    this.logger.log('Finish seeding');
  }

  async seedUser() {
    this.logger.log('- Seeding user');
    try {
      await this.userService.findBy({ email: 'admin@admin.com' });
      this.logger.log('admin user already exist. Skipping seeding');
    } catch {
      try {
        await this.userService.create({
          name: 'Admin',
          email: 'admin@admin.com',
          password: '123',
        });
        this.logger.log('seeding user completed');
      } catch (error) {
        this.logger.error('error seeding user ' + error);
      }
    }
  }
}
