import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-array-example2',
  templateUrl: './form-array-example2.component.html',
  styleUrls: ['./form-array-example2.component.scss']
})
export class FormArrayExample2Component {
  demoForm!: FormGroup;

  constructor(private fb: FormBuilder){
    this.demoForm = this.fb.group({
      items:this.fb.array([
        this.fb.group({
          name: ['', Validators.required]  // Adjust validators as needed
        }),
        this.fb.group({
          name: ['', Validators.required]  // Adjust validators as needed
        })
    ])
    })
  }

  get items() {
    return this.demoForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.fb.group({ name: ['', Validators.required] }));
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  onSubmit() {
    console.log(this.demoForm.valid);
    console.log(this.demoForm.value);
  }
}

