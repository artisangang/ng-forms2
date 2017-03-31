import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ServiceProvider} from './service';
import { BaseRequestOptions, RequestOptions } from "@angular/http";

import { ngFile } from './directive';

class ngFormOptions extends BaseRequestOptions {
  body: any;
}


@NgModule({
  imports: [CommonModule],
  declarations: [
    ngFile
  ],
  exports: [
  ngFile
  ],
  providers:[{
        provide: RequestOptions,
        useClass: ngFormOptions,

    }]
})


export class ngForm {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ngForm,
      providers: [ServiceProvider],

    }
  }
}


