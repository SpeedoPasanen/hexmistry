import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TileComponent } from './tile/tile.component';
import { TilesComponent } from './tiles/tiles.component';

@NgModule({
  declarations: [
    AppComponent,
    TileComponent,
    TilesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

