import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { readFileSync, writeFileSync } from 'fs';

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

  @Post('save-marker')
  async saveMarker(
    @Body('latlng') latlng: string,
    @Body('name') name: string,
    @Body('desc') desc: string,
  ){
    let markerFile = readFileSync('./src/markers.txt', 'utf8');

    const markersJson = markerFile === '' ? {} : JSON.parse(markerFile);

    markersJson[Object.keys(markersJson).length] = {
      "latlng": latlng,
      "name": name,
      "desc": desc,
    };

    const markersString = JSON.stringify(markersJson);

    writeFileSync('./src/markers.txt', markersString);

    return;
  }

  @Post('load-markers')
  async loadMarkers(

  ){

  }
}
