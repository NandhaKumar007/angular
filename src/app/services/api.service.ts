import { Observable } from "rxjs"
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }
  UPLOAD_LOGO(x) 
  { 
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
  return this.http.post<any>(environment.ws_url+'/user/upload_logo', x, httpOptions);
  }

  SOCIAL_LOGIN(x) { 
    return this.http.post<any>(environment.ws_url+'/auth/user/social_login', x); 
  }
  ADD_MYCARD(x) 
  { 
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
  return this.http.post<any>(environment.ws_url+'/user/mycard', x, httpOptions);
  }
  UPDATE_MYCARD(x) 
  { 
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
  return this.http.put<any>(environment.ws_url+'/user/mycard', x, httpOptions);
  }
  CARDLIST() {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
    return this.http.get<any>(environment.ws_url+'/user/cardlist', httpOptions);
  }

  CONTACTLIST() {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
    return this.http.get<any>(environment.ws_url+'/user/contactlist', httpOptions);
  }
  CARD_DETAILS(x) 
  { 
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
  return this.http.post<any>(environment.ws_url+'/user/card_details', x, httpOptions);
  }
  ADD_CONTACT(x) 
  { 
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
  return this.http.post<any>(environment.ws_url+'/user/exchange_card', x, httpOptions);
  }
  ADD_CONTACT_IN_CODE(x) 
  { 
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
  return this.http.post<any>(environment.ws_url+'/user/add_contact_in_code', x, httpOptions);
  }
  // CONTACTLIST() {
  //   let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
  //   return this.http.get<any>(environment.ws_url+'/user/contactlist', httpOptions);
  // }
  CONTACT_DETAILS(x) 
  { 
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
  return this.http.post<any>(environment.ws_url+'/user/contact_details', x, httpOptions);
  }
  SEND_CARD_DETAILS(x) 
  { 
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
  return this.http.post<any>(environment.ws_url+'/user/send_card_details', x, httpOptions);
  }
  CARD_DELETE(x) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
    return this.http.post<any>(environment.ws_url+'/user/card_delete', x, httpOptions);
  }
  UPLOADIMAGE(x) 
  {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
    return this.http.post<any>(environment.ws_url+'/user/uploadimage', x, httpOptions);
  }
  MYCONTACT_DELETE(x) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
    return this.http.post<any>(environment.ws_url+'/user/mycontact_delete', x, httpOptions);
  }
  REGISTER(x) { return this.http.post<any>(environment.ws_url+'/auth/user/register', x); }
  LOGIN(x) { return this.http.post<any>(environment.ws_url+'/auth/user/login', x); }   
  FORGOT_REQUEST(x) { return this.http.post<any>(environment.ws_url+'/auth/user/forgot_request', x); }  
  VALIDATE_FORGOT_REQUEST(x) { return this.http.post<any>(environment.ws_url+'/auth/user/validate_forgot_request', x); }
  UPDATE_PWD(x) { return this.http.post<any>(environment.ws_url+'/auth/user/update_pwd', x); }
  EMAIL_VERIFY(x) { return this.http.post<any>(environment.ws_url+'/auth/user/email_verify', x); }
  MY_VALUE() 
  { 
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
  return this.http.post<any>(environment.ws_url+'/user/my_value',httpOptions);
  }
  ADD_PROFILE(x) 
  { 
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
  return this.http.post<any>(environment.ws_url+'/user/add_profile', x, httpOptions);
  }

  CHANGE_PWD(x) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
    return this.http.put<any>(environment.ws_url+'/user/change_pwd', x, httpOptions);
  }
  USER_DETAILS() {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
    return this.http.get<any>(environment.ws_url+'/user/customer', httpOptions);
  }
  USER_UPDATE(x) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
    return this.http.put<any>(environment.ws_url+'/user/customer', x, httpOptions);
  }

  // Address list
  ADD_ADDRESS(x) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
    return this.http.post<any>(environment.ws_url+'/user/address', x, httpOptions);
  }
  UPDATE_ADDRESS(x) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
    return this.http.put<any>(environment.ws_url+'/user/address', x, httpOptions);
  }
  DELETE_ADDRESS(x) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
    return this.http.patch<any>(environment.ws_url+'/user/address', x, httpOptions);
  }

  // Model
  ADD_MODEL(x) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
    return this.http.post<any>(environment.ws_url+'/user/model', x, httpOptions);
  }
  UPDATE_MODEL(x) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
    return this.http.put<any>(environment.ws_url+'/user/model', x, httpOptions);
  }
  DELETE_MODEL(x) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
    return this.http.patch<any>(environment.ws_url+'/user/model', x, httpOptions);
  }

  // feedback
  FEEDBACK(x) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
    return this.http.post<any>(environment.ws_url+'/user/feedback', x, httpOptions);
  }

  // gift card coupon
  BUY_COUPON(x) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
    return this.http.post<any>(environment.ws_url+'/user/buy_coupon', x, httpOptions);
  }
  COUPON_LIST() {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
    return this.http.get<any>(environment.ws_url+'/user/coupon', httpOptions);
  }
  COUPON_DETAILS(x) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
    return this.http.get<any>(environment.ws_url+'/user/coupon?coupon_id='+x, httpOptions);
  }

  // payment
  CREATE_ORDER_WO_PAYMENT(x) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
    return this.http.post<any>(environment.ws_url+'/user/order/create_wo_payment', x, httpOptions);
  }
  CREATE_ORDER(x) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
    return this.http.post<any>(environment.ws_url+'/user/order/create', x, httpOptions);
  }
  ORDER_LIST(x) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
    return this.http.get<any>(environment.ws_url+'/user/order/list?type='+x, httpOptions);
  }
  ORDER_DETAILS(x) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('customer_token') }) };
    return this.http.get<any>(environment.ws_url+'/user/order/details?order_id='+x, httpOptions);
  }

  // CCAvenue payment gateway for product purchase
  GET_ENCRYPTED_DATA_PRODUCT(orderPlacedDetails, orderData) {
    let order_number = orderPlacedDetails.order_number,
    currency = orderPlacedDetails.currency,
    amount = orderPlacedDetails.amount,

    billing_email = orderData.customer_email ? orderData.customer_email : '',

    billing_name = orderData.billing_address.name ? orderData.billing_address.name : '',
    billing_address = orderData.billing_address.address ? orderData.billing_address.address : '',
    billing_city = orderData.billing_address.city ? orderData.billing_address.city : '',
    billing_state = orderData.billing_address.state ? orderData.billing_address.state : '',
    billing_zip = orderData.billing_address.pincode ? orderData.billing_address.pincode : '',
    billing_country = orderData.billing_address.country ? orderData.billing_address.country : '',
    billing_tel = orderData.billing_address.mobile ? orderData.billing_address.mobile : '',
    
    delivery_name = orderData.shipping_address.name ? orderData.shipping_address.name : '',
    delivery_address = orderData.shipping_address.address ? orderData.shipping_address.address : '',
    delivery_city = orderData.shipping_address.city ? orderData.shipping_address.city : '',
    delivery_state = orderData.shipping_address.state ? orderData.shipping_address.state : '',
    delivery_zip = orderData.shipping_address.pincode ? orderData.shipping_address.pincode : '',
    delivery_country = orderData.shipping_address.country ? orderData.shipping_address.country : '',

    // redirect_url = environment.ws_url+"/store_details/product_ccavenue_payment/success/"+orderPlacedDetails.order_id,
    // cancel_url = environment.ws_url+"/store_details/product_ccavenue_payment/failure/"+orderPlacedDetails.order_id
    
    redirect_url = environment.ws_url+"/store_details/ccavenue_payment/success/product/"+environment.store_id+"/"+orderPlacedDetails.order_id,
    cancel_url = environment.ws_url+"/store_details/ccavenue_payment/failure/product/"+environment.store_id+"/"+orderPlacedDetails.order_id

    let parameters =
    `store_id=${environment.store_id}&order_id=${order_number}&currency=${currency}&amount=${amount}&billing_name=${billing_name}&billing_address=${billing_address}&billing_city=${billing_city}&billing_state=${billing_state}
    &billing_zip=${billing_zip}&billing_country=${billing_country}&billing_tel=${billing_tel}&billing_email=${billing_email}&delivery_name=${delivery_name}&delivery_address=${delivery_address}&delivery_city=${delivery_city}
    &delivery_state=${delivery_state}&delivery_zip=${delivery_zip}&delivery_country=${delivery_country}&redirect_url=${redirect_url}&cancel_url=${cancel_url}`;

    return this.http.get<any>(environment.ws_url+'/store_details/ccavenue_encryption?'+parameters);
  }

  // CCAvenue payment gateway for gift card
  GET_ENCRYPTED_DATA_GC(orderPlacedDetails) {
    let order_number = orderPlacedDetails.order_number,
    currency = orderPlacedDetails.currency,
    amount = orderPlacedDetails.amount,

    billing_email = '', billing_name = '', billing_address = '', billing_city = '', billing_state = '',
    billing_zip = '', billing_country = '', billing_tel = '', delivery_name = '', delivery_address = '',
    delivery_city = '', delivery_state = '', delivery_zip = '', delivery_country = '',

    // redirect_url = environment.ws_url+"/store_details/giftcard_ccavenue_payment/success/"+orderPlacedDetails.order_id,
    // cancel_url = environment.ws_url+"/store_details/giftcard_ccavenue_payment/failure/"+orderPlacedDetails.order_id

    redirect_url = environment.ws_url+"/store_details/ccavenue_payment/success/giftcard/"+environment.store_id+"/"+orderPlacedDetails.order_id,
    cancel_url = environment.ws_url+"/store_details/ccavenue_payment/failure/giftcard/"+environment.store_id+"/"+orderPlacedDetails.order_id

    let parameters =
    `store_id=${environment.store_id}&order_id=${order_number}&currency=${currency}&amount=${amount}&billing_name=${billing_name}&billing_address=${billing_address}&billing_city=${billing_city}&billing_state=${billing_state}
    &billing_zip=${billing_zip}&billing_country=${billing_country}&billing_tel=${billing_tel}&billing_email=${billing_email}&delivery_name=${delivery_name}&delivery_address=${delivery_address}&delivery_city=${delivery_city}
    &delivery_state=${delivery_state}&delivery_zip=${delivery_zip}&delivery_country=${delivery_country}&redirect_url=${redirect_url}&cancel_url=${cancel_url}`;

    return this.http.get<any>(environment.ws_url+'/store_details/ccavenue_encryption?'+parameters);
  }

}