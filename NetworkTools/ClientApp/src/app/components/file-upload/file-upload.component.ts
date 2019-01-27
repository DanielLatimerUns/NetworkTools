import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent {


  public torrentFormFile: any;


  form: FormGroup;
  ui: UiConfig = {
    fileSelectionInputText:  'Select File',
    loading: false
  };

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      torrent: null
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('torrent').setValue(file);

    const torrentFile = this.prepareSave();
    this.torrentFormFile = torrentFile;
    }
  }

  private prepareSave(): any {
    const input = new FormData();
    input.append('torrent', this.form.get('torrent').value);
    return input;
  }
}

interface UiConfig {

  fileSelectionInputText: string;
  loading: boolean;
}
