import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-spin-loader',
  templateUrl: './spin-loader.component.html',
  styleUrls: ['./spin-loader.component.css']
})
export class SpinLoaderComponent implements OnInit {
  
  color: ThemePalette = 'accent';
  
  constructor() { }

  ngOnInit() {
  }

}
