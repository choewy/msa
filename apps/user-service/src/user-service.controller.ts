import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserServiceController {
  @MessagePattern('get-users')
  getUsers() {
    return [
      {
        id: '1',
        name: 'Alice',
      },
      {
        id: '2',
        name: 'Bob',
      },
    ];
  }
}
