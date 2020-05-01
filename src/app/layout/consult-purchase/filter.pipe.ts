import { Pipe, PipeTransform, Injectable } from '@angular/core';
@Pipe({
    name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchString: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchString) {
            return items;
        }
        return items.filter(it => {
            const Fecha_Registro = it.Fecha_Registro.toString().includes(searchString)
            const Nombre = it.Nombre.toLowerCase().includes(searchString.toLowerCase())
            const Apellido = it.Apellido.toLowerCase().includes(searchString.toLowerCase())
            const Cedula = it.Cedula.toLowerCase().includes(searchString.toLowerCase())
            return (Fecha_Registro + Nombre + Apellido + Cedula);
        })
    }
}
