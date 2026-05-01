import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NestJS CRUD API')
    .setDescription('Zanzibar style CRUD API built with NestJS')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();



// {
//   "message": "User created successfully",
//   "user": {
//     "name": "John Doe",
//     "email": "john.doe@example.com",
//     "password": "$2b$10$vQwMp6KurhT890G8rWknzenbFdWXFGyk2378X4t6zNm2LwAjvuyMi",
//     "_id": "69e4903d410ccf80abeaec11",
//     "__v": 0
//   }
// }

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWU0OTAzZDQxMGNjZjgwYWJlYWVjMTEiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzc2NTg2ODUxLCJleHAiOjE3NzY1OTA0NTF9.6CTn7p1i3_WffXFsrF8y6pJHeS0E9Q9OycEz_hp3pr4