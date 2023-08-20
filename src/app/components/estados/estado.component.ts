import { Component, OnInit } from '@angular/core';
import { Estado } from 'src/app/models/estado.model';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-estados',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadosComponent implements OnInit {

  estados: Estado[] = [];

  constructor(private estadoService: EstadoService) {}

  ngOnInit(): void {
    this.estadoService.getEstados().subscribe(data => {
      this.estados = data;
    });
  }

}