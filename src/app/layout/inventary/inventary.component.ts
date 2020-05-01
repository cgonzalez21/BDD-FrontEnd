import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { TranslateService } from '@ngx-translate/core';
import { BackEndService } from '../../service';
import { NgForm } from '@angular/forms';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';

@Component({
  selector: 'app-inventary',
  templateUrl: './inventary.component.html',
  styleUrls: ['./inventary.component.scss'],
  animations: [routerTransition()]
})

export class InventaryComponent implements OnInit {

  private formDirective: NgForm;
  data: string[];
  alert: {};
  alertSuccess: boolean = false;
  config: ExportAsConfig = {
    type: 'pdf',
    download: true,
    elementIdOrContent: 'mytable',
    options: {
      jsPDF: {
        orientation: 'landscape'
      },
      pdfCallbackFn: this.pdfCallbackFn,
    }
  };


  constructor(private translate: TranslateService, private beservice: BackEndService,
    private exportAsService: ExportAsService) {
  }

  ngOnInit() {
    const sucID = localStorage.getItem('sucID');
    this.beservice.getInventario(sucID).subscribe((res) => {
      if (res.code == 200) {
        this.data = res.data;
      }
      if (res.code == 401) {
        this.alert = {
          id: 1,
          type: 'danger',
          message: res.message,
        };
        this.alertSuccess = true;
      }
      this.data = res.data;
    });
  }

  close() {
    this.alertSuccess = false;
  }

  exportAs(type: SupportedExtensions, opt?: string) {
    this.config.type = type;
    if (opt) {
      this.config.options.jsPDF.orientation = opt;
    }
    console.log(this.config);
    this.exportAsService.save(this.config, 'inventario').subscribe((resp) => {
      console.log(resp);
      // save started
    });
  }


  pdfCallbackFn(pdf: any) {
    // example to add page number as footer to every page of pdf
    const sucName = localStorage.getItem('sucName');
    const noOfPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= noOfPages; i++) {
      pdf.setPage(i);
      pdf.text('Page ' + i + ' of ' + noOfPages, pdf.internal.pageSize.getWidth() - 50, pdf.internal.pageSize.getHeight() - 10);
    }
    pdf.text('PRO Retails S.A. - '+ sucName, pdf.internal.pageSize.getWidth() - 280, pdf.internal.pageSize.getHeight() - 10);
  }

}
