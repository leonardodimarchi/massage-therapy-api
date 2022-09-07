import { JwtService } from "../../domain/contracts/services/jwt_service";
import { JwtService as NestJwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtServiceImplementation implements JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
  ) {}

  public sign(payload: string | object): string {
    return this.jwtService.sign(payload);
  }
}