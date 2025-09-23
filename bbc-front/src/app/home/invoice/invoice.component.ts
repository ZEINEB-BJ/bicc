import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { CustomerService } from 'src/app/services/customer.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  customerName: string = '';
  customerEmail: string = '';
  customerAddress: string = '';

  order: Order = {
    id: 0,
    orderDate: new Date().toISOString(),
    customerId: 0,
    subTotal: 0,
    discount: 0,
    tax: 0,
    gatewayFee: 0,
    shippingCharge: 0,
    orderTotal: 0,
    shippingStreet: '',
    shippingCity: '',
    shippingPostCode: '',
    shippingState: '',
    shippingCountry: '',
    status: '',
    paymentStatus: '',
    paymentMethod: '',
    cardNumber: '',
    cardCvv: '',
    cardHolderName: '',
    cardExpiryDate: '',
    orderDetails: [],
  };

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.customerName = this.customerService.getCustomer().name;
    this.customerEmail = this.customerService.getCustomer().email;
    this.customerAddress = this.customerService.getCustomer().address;

    let invoiceId = this.route.snapshot.params['id'];
    this.customerService.getOrder(invoiceId).subscribe((order) => {
      console.log(order);
      this.order = order;
    });
  }
}
