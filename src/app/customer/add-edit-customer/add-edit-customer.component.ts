import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerApiService } from 'src/app/customer-api.service';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.css']
})
export class AddEditCustomerComponent implements OnInit {

  customerList$!: Observable<any[]>;
  statusList$!: Observable<any[]>;
  customerTypesList$!: Observable<any[]>;

  constructor(private service:CustomerApiService) { }

  @Input() customer:any;
  id: number = 0;
  status: string = "";
  comments: string = "";
  firstName: string= "";
  lastName: string= "";
  tcNo: string= "";
  email: string= "";
  telNo: string= "";
  telNo2: string= "";
  city: string= "";
  genderId!: number;
  adress: string= "";
  adress2: string= "";
  ngOnInit(): void {
    this.id = this.customer.id;
    this.firstName = this.customer.firstName;
    this.lastName = this.customer.lastName;
    this.tcNo = this.customer.tcNo;
    this.email = this.customer.email;
    this.telNo = this.customer.telNo;
    this.telNo2 = this.customer.telNo2;
    this.city = this.customer.city;
    this.genderId = this.customer.genderId;
    this.adress = this.customer.adress;
    this.adress2 = this.customer.adress2;
    this.customerList$ = this.service.getCustomerList();
    this.customerTypesList$ = this.service.getCustomerTypesList();
  }

  addCustomer() {
    var customer = {
      id: this.id,
      firstName:this.firstName,
      lastName:this.lastName,
      tcNo:this.tcNo,
      email:this.email,
      telNo:this.telNo,
      telNo2:this.telNo2,
      city:this.city,
      genderId:this.genderId,
      adress:this.adress,
      adress2:this.adress2,
    }
    this.service.addCustomer(customer).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess) {
        showAddSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = "none"
        }
      }, 4000);
    })
  }

  updateCustomer() {
    var customer = {
      id: this.id,
      firstName:this.firstName,
      lastName:this.lastName,
      tcNo:this.tcNo,
      email:this.email,
      telNo:this.telNo,
      telNo2:this.telNo2,
      city:this.city,
      genderId:this.genderId,
      adress:this.adress,
      adress2:this.adress2,
    }
    var id:number = this.id;
    this.service.updateCustomer(id,customer).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = "none"
        }
      }, 4000);
    })

  }

}
