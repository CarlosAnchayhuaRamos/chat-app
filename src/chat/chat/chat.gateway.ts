import { User } from './../../users/entities/user.entity';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { MessageService } from '../../message/message.service';

@WebSocketGateway()
export class ChatGateway {

  @WebSocketServer()
  server: Server;

  constructor(
    private jwtService: JwtService,
    private messageService: MessageService, // Inyecta el servicio de mensajes
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token; // Obtener el token JWT del handshake
      
      const payload = this.jwtService.verify(token); // Verificar el token JWT

      // Guardar la información del usuario en el socket
      client.data.user = payload;
      console.log('Usuario autenticado:', payload);
    } catch (err) {
      console.error('Autenticación fallida', err);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket): Promise<void> {
    const { user } = data;
    const { message } = data;
    const sender = client.data.user.username;

    try {
      await this.messageService.saveMessage(user, sender, message);
      console.log('Mensaje guardado en la base de datos');
    } catch (error) {
      console.error('Error al guardar el mensaje en la base de datos:', error);
    }

    // Emitir el mensaje a todos los clientes conectados
    this.server.emit('message', { user: user, message: "Hola!! Gracias por escribir" });
  }
}
