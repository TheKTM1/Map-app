import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('find-route')
  async findRoute(
    @Body('location') location: string,
  ){
    const responseString = 'https://router.project-osrm.org/route/v1/driving/' + location + '?steps=true&annotations=true&geometries=geojson&overview=full';

    const response = await fetch(responseString, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    });

    return response.json();
  }
}
