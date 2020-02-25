import { Component, OnInit } from '@angular/core';
import { Cluster } from '@app/models';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-cluster',
  templateUrl: './add-cluster.component.html',
  styleUrls: ['./add-cluster.component.scss']
})
export class AddClusterComponent implements OnInit {
  nameFormControl: FormControl;
  ipAddressFormControl: FormControl;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddClusterComponent>) { }

  ngOnInit(): void {
    this.nameFormControl = this.fb.control('', Validators.required);
    this.ipAddressFormControl = this.fb.control('', Validators.required);
  }

  onCreate(): void {
    const cluster = new Cluster();
    cluster.name = this.nameFormControl.value;
    cluster.ipAddress = this.ipAddressFormControl.value;
    this.dialogRef.close(cluster);
  }
}
