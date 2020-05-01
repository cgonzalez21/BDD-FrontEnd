import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject, throwError, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";


@Injectable({ providedIn: "root" })
export class BackEndService {

    private authStatusListener = new Subject<boolean>();
    private isAuthenticated = false;
    private sucursal_id: string;
    private token: string;
    private tokenTimer: any;
    private userId: string;
    public userName: string;
    private dir: string;

    constructor(private http: HttpClient, private router: Router) {
        this.dir = '';
    }

    getEmpresa() {
        return this.http.get(this.dir + "api/getEmpresa")
            .
            pipe(
                map((data: any) => {
                    if (data.code != 500) {
                        return data;
                    }
                    else {
                        this.onDbError();
                    }
                }), catchError(error => {
                    this.onDbError();
                    return throwError('Something went wrong!');
                })
            )
    }

    createClient(form: any) {
        const cliente = form;
        return this.http.post(this.dir + "api/saveClient", cliente).
            pipe(
                map((data: any) => {
                    if(data.code != 500){
                        return data;
                    }else {
                        this.onDbError();
                    }
                }), catchError(error => {
                    this.onDbError();
                    return throwError('Something went wrong!');
                })
            );
    }

    getClient(form: any) {
        const cedula = form.cedula;
        return this.http.get(this.dir + "api/getClient/" + cedula).
            pipe(
                map((data: any) => {
                    if(data.code != 500){
                        return data;
                    }else {
                        this.onDbError();
                    }
                    
                }), catchError(error => {
                    this.onDbError();
                    return throwError('Something went wrong!');
                })
            );
    }

    getSucursal() {
        return this.sucursal_id;
    }

    login() {
        return this.http.get(this.dir + "api/getSucursal").
            pipe(
                map((data: any) => {
                        return data;
                }), catchError(error => {
                    this.onDbError();
                    return throwError('Something went wrong!');
                })
            );
    }


    getInventario(form: string) {
        const sucID = form;
        return this.http.get(this.dir + "api/getInventario/" + sucID).
            pipe(
                map((data: any) => {
                    if (data.code != 500) {
                        return data;
                    }
                    else {
                        this.onDbError();
                    }
                }), catchError(error => {
                    this.onDbError();
                    return throwError('Something went wrong!');
                })
            );
    }

    savePurchase(purchase: any) {
        return this.http.post(this.dir + "api/savePurchase", purchase)
            .pipe(
                map((data: any) => {
                    if(data.code != 500){
                        return data;
                    }else {
                        this.onDbError();
                    }
                }), catchError(error => {
                    this.onDbError();
                    return throwError('Something went wrong!');
                })
            );
    }

    onDbError() {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('sucID');
        localStorage.removeItem('sucName');
        this.router.navigate(['/login']);
    }

    getClientPurchase(body: any) {
        return this.http.get(this.dir + "api/getClientPurchase", body)
            .pipe(
                map((data: any) => {
                    if(data.code != 500){
                        return data;
                    }else {
                        this.onDbError();
                    }
                }), catchError(error => {
                    this.onDbError();
                    return throwError('Something went wrong!');
                })
            );
    }

    getPurchases(sucID: string) {
        return this.http.get(this.dir + "api/getAllPurchases/" + sucID)
            .
            pipe(
                map((data: any) => {
                    if(data.code != 500){
                        return data;
                    }else {
                        this.onDbError();
                    }
                }), catchError(error => {
                    this.onDbError();
                    return throwError('Something went wrong!');
                })
            );
    }
}
