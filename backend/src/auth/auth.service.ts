import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/entities/role.entity';
import { InvalidTokenException } from './exceptions/invalid-token.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private userService: UserService,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService,
  ) {}

  async validateUser(email: string, firstName: string, lastName: string, picture: string, role: Role): Promise<User> {
    if (!email) throw new Error('Email is required');
    
    try {
      let user = await this.userService.findOneByEmail(email);
      const roleToAssign = role || await this.determineUserRole(email);
    
      if (!roleToAssign) {
        throw new Error('Failed to determine user role');
        }
    
        if (!user) {
          // Create new user with determined role
          user = await this.userService.createUser({
            email,
            firstName,
            lastName,
            profile_picture: picture,
            role: roleToAssign
          });
        } else if (!user.role) {
          // Update existing user with role
          user = await this.userService.updateUser(user.id, { role: roleToAssign });
        }
    
        // Ensure user has role before returning
        if (!user.role) {
          throw new Error('User role assignment failed');
        }
    
        return user;
      } catch (error) {
        console.error('Error in validateUser:', error);
        throw new Error('User validation failed: ' + error.message);
      }
    }

  private async determineUserRole(email: string): Promise<Role> {
    const studentDomain = this.configService.get<string>('STUDENT_EMAIL_DOMAIN', '@student.laverdad.edu.ph');
    const isStudent = email.toLowerCase().endsWith(studentDomain.toLowerCase());
    const roleName = isStudent ? 'Student' : 'Staff';
  
    try {
      // Try to find existing role first
      return await this.roleService.findRoleByName(roleName);
    } catch {
      // If role doesn't exist, create it
      return await this.roleService.createRole(roleName);
    }
  }
  
  async login(user: User) {
    const payload = { 
      email: user.email, 
      sub: user.id,
      roles: user.role.name,
      name: `${user.firstName} ${user.lastName}`,
      picture: user.profile_picture
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: payload
    };
  }

  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new InvalidTokenException();
    }
  }
}