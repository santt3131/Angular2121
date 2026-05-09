import { autoInjectable } from 'tsyringe';
import { User } from '../interfaces/user.interface';
import { sign } from 'jsonwebtoken';

@autoInjectable()
export class UserService {
  #users: User[] = [];

  login(user: User) {
    const userDB = this.#findUser(user);
    if (!userDB) {
      throw new Error('User not found');
    }

    if (userDB.password !== user.password) {
      throw new Error('Incorrect password');
    }

    return {
      msg: 'Login successful',
      token: sign({ user: user.username }, 'SECRET'),
    };
  }

  register(user: User) {
    const userDB = this.#findUser(user);
    if (userDB) {
      throw new Error('User already exists');
    }

    this.#users.push(user);
  }

  #findUser(user: User) {
    return this.#users.find(({ username: name }) => name === user.username);
  }
}
