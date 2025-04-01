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
    if (!email) {
      throw new Error('Email is required');
    }
    
    // Check if the user already exists in the database
    let user = await this.userService.findOneByEmail(email);
    
    if (!user) {
      if (!role) {
        role = await this.determineUserRole(email);
        if (!role) {
          throw new Error('Failed to determine or create user role');
        }
      }
      // First login - create user
      user = await this.userService.createUser({ 
        email, 
        firstName, 
        lastName, 
        profile_picture: picture,
        role
      });
    } 
    else if (!user.role) {
      const role = await this.determineUserRole(email);
      user = await this.userService.updateUser(user.id, { role });
    }

    if (!user.role) {
      throw new Error('User role could not be determined');
    }
  
    return user;
  }

  private async determineUserRole(email: string): Promise<Role> {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`Determining role for email: ${email}`);

    const studentDomain = this.configService.get<string>('STUDENT_EMAIL_DOMAIN', '@student.laverdad.edu.ph');
    console.log(`Student domain: ${studentDomain}`);
    
    const isStudent = email.toLowerCase().endsWith(studentDomain.toLowerCase());
    console.log(`Is student: ${isStudent}`);

    const roleName = isStudent ? 'Student' : 'Staff';
    console.log(`Role name: ${roleName}`);

    try {
      const role = await this.roleService.findRoleByName(roleName);
      console.log(`Found existing role:`, role);
      return role;
    } catch (error) {
      console.log(`Role not found, creating new role: ${roleName}`);
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