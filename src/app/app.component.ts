import { Component, OnInit } from '@angular/core';
import { BackEndService } from '../app/service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor( beservice: BackEndService) {
    }

    ngOnInit() {
    }
}
