import { JwtService, JwtSignParams } from "../../domain/contracts/services/jwt_service";
import { JwtService as NestJwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtServiceImplementation implements JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
  ) {}

  public sign(payload: JwtSignParams): string {
    return this.jwtService.sign(payload);
  }
}