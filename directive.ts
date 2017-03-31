import { Directive, ElementRef, Input, HostListener,OnInit ,EventEmitter , Output } from '@angular/core';

@Directive({ selector: '[fileModel]' })
export class ngFile implements OnInit {

	@Input('fileModel') files : any;

  @Output() filesChange = new EventEmitter();


	protected element:ElementRef;

    constructor(ele: ElementRef) {
       	this.element = ele;
    }	

    ngOnInit() {
      console.log(this.files);
    }

    isMultiple () {
    	return this.element.nativeElement.attributes.multiple
    }

    @HostListener('change')
  	public onChange():any {
  		 this.files = this.isMultiple() ? this.element.nativeElement.files : this.element.nativeElement.files[0];
  	     this.filesChange.emit(this.files);
       // this.updated.emit(this.files);
    }
}