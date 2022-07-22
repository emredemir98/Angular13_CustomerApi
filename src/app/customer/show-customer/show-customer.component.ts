import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerApiService } from 'src/app/customer-api.service';

@Component({
  selector: 'app-show-customer',
  templateUrl: './show-customer.component.html',
  styleUrls: ['./show-customer.component.css']
})
export class ShowCustomerComponent implements OnInit {

  customerList$!:Observable<any[]>;
  customerTypesList$!:Observable<any[]>;
  customerTypesList:any=[];

  // Map to display data associate with foreign keys
  customerTypesMap:Map<number, string> = new Map()

  constructor(private service:CustomerApiService) { }

  ngOnInit(): void {
    this.customerList$ = this.service.getCustomerList();
    this.customerTypesList$ = this.service.getCustomerTypesList();
    this.refreshCustomerTypesMap();
  }

  // Variables (properties)
  modalTitle:string = '';
  activateAddEditCustomerComponent:boolean = false;
  customer:any;

  modalAdd() {
    this.customer = {
      id:0,
      firstName:null,
      lastName:null,
      tcNo:null,
      email:null,
      telNo:null,
      telNo2:null,
      city:null,
      genderId:null,
      adress:null,
      adress2:null,
      siradisi:null
    }
    this.modalTitle = "Add Customer";
    this.activateAddEditCustomerComponent = true;
  }

  modalEdit(item:any) {
    this.customer = item;
    this.modalTitle = "Edit Customer";
    this.activateAddEditCustomerComponent = true;
  }

  delete(item:any) {
    if(confirm(`Are you sure you want to delete customer ${item.id}`)) {
      this.service.deleteCustomer(item.id).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if(showDeleteSuccess) {
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "none"
        }
      }, 4000);
      this.customerList$ = this.service.getCustomerList();
      })
    }
  }

  modalClose() {
    this.activateAddEditCustomerComponent = false;
    this.customerList$ = this.service.getCustomerList();
  }

  refreshCustomerTypesMap() {
    this.service.getCustomerTypesList().subscribe(data => {
      this.customerTypesList = data;

      for(let i = 0; i < data.length; i++)
      {
        this.customerTypesMap.set(this.customerTypesList[i].id, this.customerTypesList[i].genOption);
      }
    })
  }

}
