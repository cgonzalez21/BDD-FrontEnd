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
            const Nombre_cl = it.Nombre_cl.toLowerCase().includes(searchString.toLowerCase())
            const Apellido_cl = it.Apellido_cl.toLowerCase().includes(searchString.toLowerCase())
            const Cedula_cl = it.Cedula_cl.toLowerCase().includes(searchString.toLowerCase())
            return (Fecha_Registro + Nombre_cl + Apellido_cl + Cedula_cl);
        })
    }
}
