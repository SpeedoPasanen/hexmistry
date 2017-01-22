import { Component, ViewChild } from '@angular/core';
import { TilesComponent } from './tiles/tiles.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild(TilesComponent) tilesComponent: TilesComponent;
}
