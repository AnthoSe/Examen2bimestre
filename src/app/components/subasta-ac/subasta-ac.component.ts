import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-subasta-ac',
  templateUrl: './subasta-ac.component.html',
  styleUrl: './subasta-ac.component.css'
})
export class SubastaACComponent implements OnInit {
  subastaActualData: any[] = [];
  subastaAnteriorData: any[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get<any[]>('assets/JSON/subastaActual.json').subscribe(data => {
      this.subastaActualData = data;
    });

    this.http.get<any[]>('assets/JSON/subastaAnterior.json').subscribe(data => {
      this.subastaAnteriorData = data;
    });
  }

}
