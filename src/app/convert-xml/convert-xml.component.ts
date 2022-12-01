import { Component,OnChanges } from '@angular/core';

@Component({
  selector: 'app-convert-xml',
  templateUrl: './convert-xml.component.html',
  styleUrls: ['./convert-xml.component.css']
})
export class ConvertXMLComponent {
  ngOnChanges($event : any): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any) : void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();

    myReader.onloadend = function(e){
      //for (let i = 0; i< myReader.result.toString().length ; i++){
        
    //  }
      console.log(myReader.result);
    }

    myReader.readAsText(file);
  }

}
