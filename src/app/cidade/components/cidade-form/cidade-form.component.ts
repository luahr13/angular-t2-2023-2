import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cidade } from 'src/app/models/cidade.model';
import { Estado } from 'src/app/models/estado.model';
import { EstadoService } from 'src/app/services/estado.service';
import { CidadeService } from 'src/app/services/cidade.service';

@Component({
  selector: 'app-cidade-form',
  templateUrl: './cidade-form.component.html',
  styleUrls: ['./cidade-form.component.css']
})
export class CidadeFormComponent {
  formGroup: FormGroup;
  estados: Estado[] = [];

  constructor(private estadoService: EstadoService,
              private cidadeService: CidadeService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
                const estado: Estado = this.activatedRoute.snapshot.data['estado'];
                const cidade: Cidade = this.activatedRoute.snapshot.data['cidade']

    this.formGroup = formBuilder.group({
      id:[(cidade && cidade.id) ? cidade.id : null],
      nome:[(cidade && cidade.nome) ? cidade.nome : '', Validators.required],
      estado:[(estado && estado.id) ? estado.id : '', Validators.required]
      
    })
              }

  ngOnInit(): void {
    this.estadoService.findAll().subscribe(data => {
      this.estados = data;
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const cidade = this.formGroup.value;
      if (cidade.id == null) {
        this.cidadeService.save(cidade).subscribe({
          next: (cidadeCadastrado) => {
            this.router.navigateByUrl('/estados/list');
          },
          error: (err) => {
            console.log('Erro ao incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.cidadeService.update(cidade).subscribe({
          next: (cidadeCadastrado) => {
            this.router.navigateByUrl('/estados/list');
          },
          error: (err) => {
            console.log('Erro ao alterar' + JSON.stringify(err));
          }
        });        
      }
    }
  }

  excluir() {
    const cidade = this.formGroup.value;
    if (cidade.id != null) {
      this.cidadeService.delete(cidade).subscribe({
        next: (e) => {
          this.router.navigateByUrl('/estados/list');
        },
        error: (err) => {
          console.log('Erro ao excluir' + JSON.stringify(err));
        }
      });
    }      
  }
}
