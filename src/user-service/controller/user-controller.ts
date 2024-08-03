import { Request, Response } from 'express';
import User from '../dto/user';
import UserService from '../service/user-service';

export default class UserController {

  private readonly userService: UserService;

  private readonly headers: Record<string, string>;

  constructor(userService: UserService) {
    this.userService = userService;

    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  public async index(request: Request, response: Response) {
    console.log('[UserController#index]');

    const body = await this.userService.findAll();

    response.status(200);
    response.set(this.headers);
    response.json(body);
  }

  public async create(request: Request, response: Response) {
    console.log('[UserController#create]');

    const requestBody: User = request.body;

    console.log(`[UserController#create] body: ${requestBody}`);

    const body = await this.userService.create(requestBody);

    response.status(201);
    response.set(this.headers);
    response.json(body);
  }

  public async show(request: Request, response: Response) {
    console.log('[UserController#show]');

    const id = request.params.id;

    console.log(`[UserController#show] ${id}`);

    const body = await this.userService.findById(Number.parseInt(id));

    response.status(200);
    response.set(this.headers);
    response.json(body);
  }

  public async update(request: Request, response: Response) {
    console.log('[UserController#update]');

    const id = request.params.id;
    const requestBody: User = request.body;

    console.log(`[UserController#update] id:${id}`);
    console.log(`[UserController#update] body:${requestBody}`);

    requestBody.id = Number.parseInt(id);

    const body = await this.userService.update(requestBody);

    response.status(200);
    response.set(this.headers);
    response.json(body);
  }

  public async destroy(request: Request, response: Response) {
    console.log('[UserController#destroy]');

    const id = request.params.id;

    console.log(`[UserController#destroy] ${id}`);

    await this.userService.destroy(Number.parseInt(id));

    const body = {
      message: `ID: ${id} deleted successfully`
    };

    response.status(200);
    response.set(this.headers);
    response.json(body);
  }
}
