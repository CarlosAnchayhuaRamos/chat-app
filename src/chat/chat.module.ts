import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    MessageModule
  ],
  providers: [ChatGateway]
})
export class ChatModule {}
