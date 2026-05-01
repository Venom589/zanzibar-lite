import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){}
// export class AuthGuard implements CanActivate {

//   constructor(
//     private readonly jwtService: JwtService
//   ){}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const token = request.headers['authorization']?.split(' ')[1];
//     if(!token){
//       throw new UnauthorizedException("No token provided");
//     }
//     try {
//       const payload = this.jwtService.verifyAsync(token);
//       request.user = payload;
//     } catch (error) {
//       throw new UnauthorizedException("Invalid token");
//     }
//     return true;
//   }
// }
