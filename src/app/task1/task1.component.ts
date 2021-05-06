import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';

const data = [
  {
    id: 1,
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus ducimus labore omnis expedita quibusdam molestiae nisi enim similique eius necessitatibus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus ducimus labore omnis expedita quibusdam molestiae nisi enim similique eius necessitatibus?',
    extraContent:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit, nemo!',
    showExtraContent: true,
  },
  {
    id: 2,
    content:
      'Lorem ipsum . Ut consectetur qui ad nesciunt accusamus ipsum fugit tenetur recusandae minima repellat.',
    extraContent:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, doloremque.',
    showExtraContent: true,
  }
];

@Component({
  selector: 'app-task1',
  templateUrl: './task1.component.html',
  styleUrls: ['./task1.component.scss'],
})
export class Task1Component implements AfterViewInit {
  paragraphData = data;
  paragraphs:ElementRef[] = [] ;

  @ViewChildren('extra') extra: QueryList<ElementRef> | undefined;

  // get extra paragraph Element Ref and add to paragraphs state
  ngAfterViewInit() {
    if (this.extra) {
      this.paragraphs = this.extra.map(child => child);
    }
  }

  // find how extra paragraph height should be and set it to new height.
   handleParagraphHeight(index: number) {
    const item = this.paragraphs[index];
    
    const paragraphHeight = item.nativeElement.offsetHeight;
    const paragraphScrollHeight = item.nativeElement.scrollHeight;

    const collapsed = !paragraphHeight;
    const noHeight = !item.nativeElement.style.height;

    if (collapsed || noHeight) {
      item.nativeElement.style.height = `${paragraphScrollHeight}px`;
    } else {
      item.nativeElement.style.height = '0px';
    }
    if (noHeight) this.handleParagraphHeight(index);
  }

   // toggle showExtraContent property in paragraphs array. change button text. 
  toogleParagraph(index: number) {
    this.paragraphData[index].showExtraContent = !this.paragraphData[index]
      .showExtraContent;
    this.handleParagraphHeight(index);
  }
}
