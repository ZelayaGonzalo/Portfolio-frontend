import { AfterViewInit, Directive, EventEmitter, Output, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[isInView]'
})
export class CurrentViewDirective {

  @Output() isInView = new EventEmitter<boolean>()

  constructor(private vcRef: ViewContainerRef, private tplRef: TemplateRef<any>) {
  }

  ngAfterViewInit() {
    const observedElement = this.vcRef.element.nativeElement.parentElement

    const observer = new IntersectionObserver(([entry]) => {
      console.log(entry.isIntersecting, 'Intersection')
      this.isInView.emit(entry.isIntersecting)
      this.renderContents(true)
    })
    observer.observe(observedElement)
  }

  renderContents(isIntersecting: boolean) {
    this.vcRef.clear()
    if (isIntersecting) {
      this.vcRef.createEmbeddedView(this.tplRef)
    }
  }
}
