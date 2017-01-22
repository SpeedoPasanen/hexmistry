import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Tile } from '../tile/tile';
import { Neighbourship } from '../tile/neighbourship';
import { Creature } from '../creature/creature';
import { Point } from '../global/point';
declare var $: any;
var vpTimeout = null;
var dragSpeed: number = 2;
@Component({
  selector: 'tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.css']
})
export class TilesComponent implements OnInit, OnDestroy {
  rowLength = 100;
  rowCount = 100;
  flatData: Array<Tile> = [];
  matrix = [];
  viewport = [];
  vpOffset: Point = new Point(0, 0);
  private tileSize: number = 70;
  vpSize: Point = new Point();
  dragStartPoint: Point = null;
  private initDone: Boolean = false;
  startDrag(e: MouseEvent) {
    if (!this.initDone) {
      return;
    }
    this.dragStartPoint = new Point(e.clientX, e.clientY);
  }
  @HostListener('mousemove', ['$event'])
  mousemove(e) {
    if (this.initDone && this.dragStartPoint) {
      this.updateViewport(this.dragStartPoint.deltaTo(new Point(e.clientX, e.clientY)));
      this.dragStartPoint = new Point(e.clientX, e.clientY);
    }
  }
  stopDrag(e) {
    if (!this.initDone) {
      return;
    }
    if (this.dragStartPoint) {
      this.updateViewport(this.dragStartPoint.deltaTo(new Point(e.clientX, e.clientY)));
      this.dragStartPoint = null;
    }
  }
  private init() {
    this.initDone = true;
    this.updateViewport();
    $(window).on('resize', () => this.updateViewport());
  }
  ngOnDestroy() {
    $(window).off('resize');
  }
  public updateViewport(dragDelta: Point = null) {
    if (!this.initDone) {
      return;
    }
    if (vpTimeout) {
      clearTimeout(vpTimeout);
    }
    ///vpTimeout = setTimeout(() => { this.drawViewport() }, 30);
    var parent = $('.tile-container').parent();
    $('.tile-container').width($(window).width() + 200);
    parent.height($(window).height() - parent.offset().top - 5);
    this.vpSize.set(
      Math.ceil($('.tile-container').parent().width() / this.tileSize),
      Math.ceil($('.tile-container').parent().height() / this.tileSize));
    if (dragDelta) {
      this.vpOffset.set(
        Math.max(0, Math.min(this.vpOffset.x + (dragSpeed * dragDelta.x / this.tileSize), this.rowLength - this.vpSize.x)),
        Math.max(0, Math.min(this.vpOffset.y + (dragSpeed * dragDelta.y / this.tileSize), this.rowCount - this.vpSize.y))
      );
      /*      
      var tilt = new Point(dragDelta.x % this.tileSize, dragDelta.y % this.tileSize);
       $('.tile-container').css({
         'margin-left': -Math.abs(dragDelta.x % this.tileSize) + 'px',
         'margin-top': -Math.abs(dragDelta.y % this.tileSize) + 'px',
       });*/
    }
    this.drawViewport();
  }
  private drawViewport() {
    this.viewport = [];
    for (var y = 0; y < this.vpSize.y; y++) {
      var trans: Point = new Point(0, Math.round(this.vpOffset.y) + y);
      if (trans.y === this.rowCount) {
        break;
      }
      this.viewport.push(new Array<Tile>());
      for (var x = 0; x < this.vpSize.x; x++) {
        trans.x = Math.round(this.vpOffset.x) + x;
        if (trans.x === this.rowLength) {
          break;
        }
        this.viewport[y].push(this.tileAt(trans.x, trans.y));
      }
    }
    // this.cdRef.detectChanges();
  }
  constructor(
  ) {
    for (var y = 0; y < this.rowCount; y++) {
      this.matrix.push(new Array<Tile>());
      for (var x = 0; x < this.rowLength; x++) {
        let tile: Tile = new Tile({
          x: x,
          y: y,
          l: x > 0 ? this.matrix[y][x - 1] : null,
          r: x === this.rowLength - 1 ? this.matrix[y][0] : null,
          t: y > 0 ? this.matrix[y - 1][x] : null,
          b: y === this.rowCount - 1 ? this.matrix[0][x] : null
        });
        this.matrix[y].push(tile);
        this.flatData.push(tile);
      }
      this.flatData.map(t => {
        if (t.r) {
          t.r.l = t;
        }
        if (t.l) {
          t.l.r = t;
        }
        if (t.b) {
          t.b.t = t;
        }
        if (t.t) {
          t.t.b = t;
        }
      });
    }
    this.flatData.map(tile => {
      var maxDist = 5;
      for (var y = -maxDist; y <= maxDist; y++) {
        for (var x = -maxDist; x <= maxDist; x++) {
          if (!(x === 0 && y === 0)) {
            var nx = (x + tile.x) % this.rowLength;
            var ny = (y + tile.y) % this.rowCount;
            if (nx < 0) {
              nx += this.rowLength;
            }
            if (ny < 0) {
              ny += this.rowCount;
            }
            var distance = Math.max(Math.abs(x), Math.abs(y));
            Neighbourship.create(tile, this.tileAt(nx, ny), distance);
          }
        }
      }
    });
  }
  tileAt(x: number, y: number): Tile {
    return this.matrix[y][x];
  }

  ngOnInit() {
    setTimeout(() => { this.init(); }, 500);
  }

}
