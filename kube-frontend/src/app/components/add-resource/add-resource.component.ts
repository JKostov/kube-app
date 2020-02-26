import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Resource } from '@app/models';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {
  nameFormControl: FormControl;
  ipAddressFormControl: FormControl;
  cpusFormControl: FormControl;
  memoryFormControl: FormControl;
  storageMemoryFormControl: FormControl;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddResourceComponent>) { }

  ngOnInit(): void {
    this.nameFormControl = this.fb.control('', Validators.required);
    this.ipAddressFormControl = this.fb.control('', Validators.required);
    this.cpusFormControl = this.fb.control('', Validators.required);
    this.memoryFormControl = this.fb.control('', Validators.required);
    this.storageMemoryFormControl = this.fb.control('', Validators.required);
  }

  onCreate(): void {
    const resource = new Resource();
    resource.name = this.nameFormControl.value;
    resource.ipAddress = this.ipAddressFormControl.value;
    resource.cpus = this.cpusFormControl.value;
    resource.memory = this.memoryFormControl.value;
    resource.storageMemory = this.storageMemoryFormControl.value;
    this.dialogRef.close(resource);
  }
}
